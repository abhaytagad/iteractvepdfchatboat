import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom';

function PricingNav() {
  return (
    <nav className="bg-purple-600 text-white px-6 py-4 shadow flex items-center justify-between">
      <span className="font-bold text-xl">Pricing</span>
      <div className="flex space-x-6">
        <NavLink to="/" className="hover:text-purple-200 transition">Home</NavLink>
        <NavLink to="/dashboard" className="hover:text-purple-200 transition">Dashboard</NavLink>
      </div>
    </nav>
  );
}

export default PricingNav;
