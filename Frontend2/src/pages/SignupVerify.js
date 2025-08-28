import React, { useContext } from "react";
import { APIcontext } from "../context/SignupContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupVerify() {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    changeOtp,
    changeToken, // ✅ added
  } = useContext(APIcontext);

  const naviGate = useNavigate();

  async function clickHandler() {
    try {
      const res = await axios.post("https://pdfchatbot-7oim.onrender.com/api/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      // ✅ Backend should now send token in response
      if (res.data?.token) {
        changeToken(res.data.token); // Save token in context + localStorage
      }

      toast.success("Sign up successful");
      naviGate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Verify OTP
        </h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => changeOtp(e.target.value)}
          className="border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 w-full mb-4 transition"
        />
        <button
          onClick={clickHandler}
          className="w-full py-2 rounded bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default React.memo(SignupVerify);
