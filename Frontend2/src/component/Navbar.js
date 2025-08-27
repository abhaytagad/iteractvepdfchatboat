import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
      <span className="text-2xl font-extrabold text-blue-700 cursor-pointer" onClick={() => navigate("/")}>
        ChatBot
      </span>
      <div className="hidden md:flex space-x-6">
        <button onClick={() => navigate('/signin')} className="hover:text-blue-400 transition duration-300 font-semibold">
          Sign In
        </button>
        <button onClick={() => navigate('/aboutus')} className="hover:text-blue-400 transition duration-300 font-semibold">
          About Us
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 font-bold text-white"
        >
          Get Started
        </button>
      </div>
      <button
        className="md:hidden text-lg"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute right-0 top-16 bg-white shadow rounded-lg z-50 p-4 flex flex-col space-y-4 w-40">
          <button onClick={() => { setMenuOpen(false); navigate('/signin'); }} className="hover:text-blue-400">Sign In</button>
          <button onClick={() => { setMenuOpen(false); navigate('/aboutus'); }} className="hover:text-blue-400">About Us</button>
          <button
            onClick={() => { setMenuOpen(false); navigate('/signup'); }}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 font-bold text-white"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
