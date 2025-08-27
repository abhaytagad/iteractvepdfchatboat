import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
// import logo from "../logo.png"; // Import the logo properly

function DashboardNav() {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 flex flex-col md:flex-row justify-between px-10 md:px-32 shadow-2xl shadow-black items-center py-3 gap-4">
            {/* Logo Section */}
            <div className="h-20 w-20 overflow-hidden rounded-md">
                <img src='../logo.png' alt="Logo" className="w-full h-full object-cover" />
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row gap-8 md:w-[25%]">
                {["Pricing"].map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(`/${item.toLowerCase()}`)}
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DashboardNav;
