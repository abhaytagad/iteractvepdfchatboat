import React, { useContext, useState } from "react";
import { APIcontext } from "../context/SignupContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";


function SignUpPage() {
  const {
    firstName, lastName, email, password, confirmPassword,
    changeConfirmPassword, changePassword, changeEmail, changeFirstName, changeLastName,
  } = useContext(APIcontext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Sign Up
        </h2>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => changeFirstName(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full transition"
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => changeLastName(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full transition"
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => changeEmail(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full transition"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => changePassword(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full transition"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => changeConfirmPassword(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full transition"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition mt-6 ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Sign Up"}
        </button>
        <div className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <NavLink to="/signin" className="text-blue-500 underline">
            Sign In
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default React.memo(SignUpPage);
