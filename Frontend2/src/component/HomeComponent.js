import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink, useNavigate } from 'react-router-dom';

function HomeComponent() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        Interactive PDF Chatbot
      </h1>
      <p className="mb-4 text-gray-700 text-lg">
        Have a conversation with any PDF document. Upload your file and start asking questions instantly!
      </p>
      <p className="mb-4 text-blue-500 italic">Chatting with your PDFs has never been easier than with Abhay.</p>
      <div className="flex flex-col gap-3 my-4 items-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
          onClick={() => navigate('/pricing')}
        >
          View Plans
        </button>
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white py-2 px-6 rounded-lg font-bold transition-all duration-300"
          onClick={() => navigate('/signup')}
        >
          Get Started
        </button>
      </div>
      <p className="text-gray-500 mt-6">It’s that simple! Try it today—it really takes less than a minute.</p>
    </div>
  );
}

export default HomeComponent;
