import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import logo from '../assets/logo.png'; // Ensure the correct path

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white py-4 px-6 md:px-16 shadow-md">
            <div className="flex justify-between items-center">
                
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src='../logo.png' alt="Logo" className="h-12 w-12 rounded-md" />
                    <h1 className="text-xl font-bold">ChatBot</h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6">
                    <button 
                        onClick={() => navigate('/signin')} 
                        className="hover:text-blue-400 transition duration-300"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => navigate('/aboutus')} 
                        className="hover:text-blue-400 transition duration-300"
                    >
                        About Us
                    </button>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                    >
                        Get Started <i className="fas fa-arrow-right"></i>
                    </button>
                </div>

                {/* Mobile Menu Icon */}
                <button 
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="flex flex-col mt-4 space-y-3 md:hidden">
                    <button onClick={() => navigate('/signin')} className="hover:text-blue-400">Sign In</button>
                    <button onClick={() => navigate('/aboutus')} className="hover:text-blue-400">About Us</button>
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                    >
                        Get Started <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
