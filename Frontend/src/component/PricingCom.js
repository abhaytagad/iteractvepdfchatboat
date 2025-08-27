import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";
import { toast } from "react-toastify";

function PricingCom() {
    const { email } = useContext(APIcontext);

    async function handlePayment(plan) {
        if (!email) {
            toast.error("Please login OR signup to proceed!");
            return;
        }

        try {
            const response = await fetch("https://pdfchatbot-7oim.onrender.com/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!data.id) throw new Error("Payment initialization failed");

            const options = {
                key: "rzp_live_pgdz9REB2rThH2",
                amount: plan.amount * 100, // Razorpay expects amount in paise
                currency: "INR",
                name: "Acme Corp",
                description: `Subscription for ${plan.name}`,
                image: "https://example.com/your_logo",
                order_id: data.id,
                handler: function (response) {
                    axios.post("https://pdfchatbot-7oim.onrender.com/api/paymentvalidate", {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        email,
                    })
                    .then(() => toast.success("Payment Successful!"))
                    .catch(() => toast.error("Payment Failed"));
                },
                prefill: {
                    name: "Abhay Tagad",
                    email: email,
                    contact: "9021524609",
                },
                theme: { color: "#3399cc" },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", (response) => {
                toast.error("Payment Failed! Try Again.");
                console.error(response);
            });
            rzp1.open();
        } catch (error) {
            toast.error("Something went wrong! Try again.");
            console.error(error);
        }
    }

    const pricingPlans = [
        {
            name: "Free",
            price: 0,
            features: [
                "5 Pages per PDF",
                "4 MB size limit",
                "Mobile-friendly interface",
            ],
            disabledFeatures: ["High quality performance", "Priority support"],
        },
        {
            name: "Pro",
            price: 50,
            features: [
                "25 Pages per PDF",
                "16 MB size limit",
                "Mobile-friendly interface",
                "High quality performance",
                "Priority support",
            ],
        },
    ];

    return (
        <div className="flex flex-col items-center gap-16 py-6">
            {/* Header Section */}
            <div className="text-center w-4/5 md:w-1/3">
                <h1 className="font-bold text-6xl">Pricing</h1>
                <p className="mt-3">
                    Whether you are just trying out our service or need more, we have got you covered.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="flex flex-col md:flex-row gap-8">
                {pricingPlans.map((plan, index) => (
                    <div
                        key={index}
                        className={`flex flex-col gap-6 p-6 shadow-2xl rounded-xl border-2 ${
                            plan.name === "Pro" ? "border-blue-500" : ""
                        }`}
                    >
                        {/* Plan Title & Price */}
                        <div className="text-center">
                            <h1 className="font-bold text-xl">{plan.name}</h1>
                            <p className="text-gray-600">
                                {plan.name === "Free"
                                    ? "For small side projects"
                                    : "For large projects with higher needs"}
                            </p>
                            <p className="font-bold text-2xl mt-2">
                                <i className="fa-solid fa-indian-rupee-sign" /> {plan.price}
                            </p>
                            <p>Per month</p>
                        </div>

                        {/* Features */}
                        <div className="border-y-2 py-4">
                            <p>10 PDFs/mon included</p>
                        </div>
                        <div className="border-b-2 py-6">
                            {plan.features.map((feature, i) => (
                                <p key={i} className="text-green-500 flex items-center">
                                    <i className="fas fa-check mr-2" /> {feature}
                                </p>
                            ))}
                            {plan.disabledFeatures?.map((feature, i) => (
                                <p key={i} className="opacity-40 flex items-center">
                                    <i className="fas fa-check mr-2" /> {feature}
                                </p>
                            ))}
                        </div>

                        {/* Upgrade Button */}
                        <button
                            onClick={() => handlePayment(plan)}
                            className={`w-full py-2 rounded-lg ${
                                plan.name === "Pro"
                                    ? "bg-blue-500 text-white"
                                    : "bg-blue-100 text-black"
                            }`}
                        >
                            Upgrade Now <i className="fas fa-arrow-right ml-2" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingCom;
