import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom';
// import logo from '../assets/logo.png'; // Ensure the correct path

function PricingNav() {
    return (
        <div className="flex justify-between flex-col md:flex-row bg-slate-300 px-8 md:px-32 items-center py-2 shadow-xl md:shadow-4xl">
            {/* Logo */}
            <div className="h-20 w-20 overflow-hidden rounded-md">
                <img src='logo.png' alt="Company Logo" className="w-full h-full object-contain" />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
                <NavLink to="/dashboard" className="text-lg font-medium text-gray-700 hover:text-black transition">
                    Dashboard
                </NavLink>
                <i className="fa-solid fa-user text-lg text-gray-700"></i>
            </div>
        </div>
    );
}

export default PricingNav;
