import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
// import sampleImage from '../assets/sample.png'; // Ensure correct path

function HomeComponent() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] items-center py-12 px-6 md:px-16 text-gray-100">
            
            {/* Header Section */}
            <div className="flex flex-col items-center gap-8 text-center max-w-4xl">
                <h1 className="font-extrabold text-4xl md:text-6xl leading-tight">
                    Chat with your <span className="text-white">documents</span> instantly.
                </h1>
                <p className="text-lg text-gray-200 max-w-xl">
                    Our interactive PDF chatbot allows you to have a conversation with any PDF document.
                    Simply upload your file and start asking questions right away.
                </p>
                <button 
                    onClick={() => navigate('/signup')} 
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 hover:from-pink-500 hover:to-yellow-500 transition-transform duration-300 ease-in-out px-6 py-3 rounded-lg text-white text-lg flex items-center gap-3 shadow-lg"
                >
                    Get Started <i className="fas fa-arrow-right text-xl"></i>
                </button>
                <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-xl">
                    <img src='../sample.png' alt="Chatbot preview" className="w-full object-cover" />
                </div>
            </div>

            {/* Steps Section */}
            <div className="flex flex-col gap-12 w-full max-w-4xl mt-16">
                <div className="text-center">
                    <h2 className="font-bold text-3xl">Start chatting in minutes</h2>
                    <p className="text-lg text-gray-200 mt-2">Chatting with your PDF files has never been easier than with Abhay.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center p-6 border border-gray-300 rounded-xl bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 transition-all">
                        <span className="text-3xl font-bold text-green-300">1</span>
                        <h3 className="text-xl font-bold mt-3">Sign up for an account</h3>
                        <p className="text-gray-300 mt-2">
                            Start with a free plan or choose one of our 
                            <NavLink to="/signin" className="text-white font-semibold ml-1">premium plans</NavLink>.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center p-6 border border-gray-300 rounded-xl bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 transition-all">
                        <span className="text-3xl font-bold text-blue-300">2</span>
                        <h3 className="text-xl font-bold mt-3">Upload your PDF file</h3>
                        <p className="text-gray-300 mt-2">We will process your file and make it ready for you to chat with.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center p-6 border border-gray-300 rounded-xl bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 transition-all">
                        <span className="text-3xl font-bold text-yellow-300">3</span>
                        <h3 className="text-xl font-bold mt-3">Start asking questions</h3>
                        <p className="text-gray-300 mt-2">It’s that simple! Try it today—it really takes less than a minute.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HomeComponent;
