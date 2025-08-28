import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useContext, useState } from "react";
import { APIcontext } from "../context/SignupContext";
import { toast } from "react-toastify";

function PricingCom() {
  const { email } = useContext(APIcontext);
  const [loading, setLoading] = useState(false);

  // Dynamically load Razorpay checkout script
  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePayment(plan) {
    if (!email) {
      toast.error("Please login OR signup to proceed!");
      return;
    }
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Please check your connection.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required! Please login again.");
        setLoading(false);
        return;
      }

      // ✅ Authenticated request to create Razorpay order
      const response = await fetch("https://pdfchatbot-7oim.onrender.com/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send JWT token
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!data.id) throw new Error("Payment initialization failed");

      const options = {
        key: "rzp_live_pgdz9REB2rThH2",
        amount: plan.price * 100,
        currency: "INR",
        name: "Acme Corp",
        description: `Subscription for ${plan.name}`,
        image: "https://example.com/your_logo",
        order_id: data.id,
        handler: function (response) {
          // ✅ Send token along with validation request
          axios
            .post(
              "https://pdfchatbot-7oim.onrender.com/api/paymentvalidate",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                email,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then(() => toast.success("Payment Successful!"))
            .catch(() => toast.error("Payment Failed"));
        },
        prefill: { name: "Abhay Tagad", email, contact: "9021524609" },
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
    setLoading(false);
  }

  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      features: ["5 Pages per PDF", "4 MB size limit", "Mobile-friendly interface"],
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
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      {pricingPlans.map((plan) => (
        <div
          key={plan.name}
          className="border-2 rounded-xl p-8 bg-white shadow hover:shadow-lg transition relative"
        >
          <span
            className={`absolute top-4 right-4 text-xs font-bold ${
              plan.name === "Pro" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } px-3 py-1 rounded`}
          >
            {plan.name}
          </span>
          <h3 className="text-2xl font-bold mb-2">
            {plan.name === "Free" ? "For small side projects" : "For large projects with higher needs"}
          </h3>
          <p className="text-4xl font-extrabold mb-2 text-blue-600">
            ₹{plan.price}
            <span className="text-sm font-normal ml-2">/month</span>
          </p>
          <p className="mb-2 text-gray-500">10 PDFs/mon included</p>
          <ul className="mt-4 mb-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2 items-center text-green-700 mb-1">
                <i className="fas fa-check-circle text-green-500"></i> {feature}
              </li>
            ))}
            {plan.disabledFeatures?.map((feature, i) => (
              <li key={i} className="flex gap-2 items-center text-gray-400 line-through mb-1">
                <i className="fas fa-times-circle"></i> {feature}
              </li>
            ))}
          </ul>
          {plan.price !== 0 && (
            <button
              onClick={() => handlePayment(plan)}
              disabled={loading}
              className={`w-full mt-4 py-2 rounded text-white font-semibold shadow transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : `Upgrade to ${plan.name}`}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default PricingCom;
