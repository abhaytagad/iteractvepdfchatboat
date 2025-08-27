import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { APIcontext } from "../context/SignupContext";
import { toast } from "react-toastify";

function SigninPage() {
    const { changeEmail, changePassword, email, password } = useContext(APIcontext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function clickHandler() {
        if (!email || !password) {
            toast.error("Please enter both email and password!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get("https://pdfchatbot-7oim.onrender.com/api/signin", {
                params: { email, password },
            });
            toast.success("Login successful!");
            navigate("/dashboard");
            console.log(response);
        } catch (error) {
            toast.error("Invalid credentials or something went wrong!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left Side - Image */}
            <div className="hidden md:flex w-1/2">
                <img src="../login.jpg" alt="Login" className="w-full h-full object-cover opacity-80" />
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Interactive PDF Chatbot</h1>
                <h2 className="text-xl font-semibold mb-4">Welcome Back!</h2>
                <p className="text-gray-600 mb-6">Sign in to continue</p>

                <div className="w-full max-w-sm space-y-4">
                    <div className="flex flex-col">
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            onChange={(e) => changeEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium">Password</label>
                        <input
                            type="password"
                            className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            onChange={(e) => changePassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button
                        className="bg-blue-600 text-white rounded-lg p-3 w-full font-semibold hover:bg-blue-700 transition-all duration-300"
                        onClick={clickHandler}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Continue"}
                    </button>
                </div>

                <p className="mt-4 text-gray-600">
                    No account?{" "}
                    <NavLink to="/signup" className="text-blue-600 font-semibold">
                        Create one
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default SigninPage;
