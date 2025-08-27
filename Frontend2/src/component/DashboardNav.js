import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

function DashboardNav() {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow flex items-center justify-between">
      <span
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        PDFChatBot Dashboard
      </span>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/aboutus")}
          className="hover:text-blue-200 transition"
        >
          About Us
        </button>
        <button
          onClick={() => navigate("/pricing")}
          className="hover:text-blue-200 transition"
        >
          Pricing
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-200 shadow transition"
        >
          Home
        </button>
      </div>
    </nav>
  );
}

export default DashboardNav;
