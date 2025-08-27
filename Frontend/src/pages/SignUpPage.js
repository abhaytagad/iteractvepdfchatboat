import { useContext, useState } from "react";
import { APIcontext } from "../context/SignupContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpPage() {
    const {
        firstName, lastName, email, password, confirmPassword,
        changeConfirmPassword, changePassword, changeEmail,
        changeFirstName, changeLastName
    } = useContext(APIcontext);
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Form Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("All fields are required!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            await axios.post('https://pdfchatbot-7oim.onrender.com/api/generatotp', { email });
            toast.success("OTP sent successfully!");
            navigate('/signup/verifyotp');
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left Side - Image */}
            <div className="hidden md:flex w-1/2">
                <img src="../signup.jpg" alt="Signup" className="w-full h-full object-cover" />
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-blue-700 mb-6">Create an Account</h2>

                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="font-medium">First Name</label>
                        <input
                            type="text"
                            className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            value={firstName}
                            onChange={(e) => changeFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Last Name</label>
                        <input
                            type="text"
                            className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            value={lastName}
                            onChange={(e) => changeLastName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            value={email}
                            onChange={(e) => changeEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Password</label>
                        <input
                            type="password"
                            className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            value={password}
                            onChange={(e) => changePassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            value={confirmPassword}
                            onChange={(e) => changeConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg p-3 w-full font-semibold hover:bg-blue-700 transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
