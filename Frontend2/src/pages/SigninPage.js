import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Sign in to continue
        </h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => changeEmail(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full mb-4 transition"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => changePassword(e.target.value)}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full mb-4 transition"
            disabled={loading}
          />
        </div>
        <button
          className={`w-full py-2 rounded bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
          onClick={clickHandler}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="mt-4 text-center text-gray-700">
          No account?{" "}
          <NavLink to="/signup" className="text-blue-500 underline">
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SigninPage);
