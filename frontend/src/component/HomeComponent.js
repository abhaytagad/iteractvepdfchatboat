import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink, useNavigate } from 'react-router-dom';

function HomeComponent(){
    const naviGate = useNavigate();

    function getStartedClickHandler(){
        naviGate('/signup')
    }

    return(
        <div className=' flex flex-col bg-gradient-to-r from-indigo-500  items-center pt-[40px] pb-11 gap-10'>

            <div className='flex flex-col items-center  gap-4'>
                <div className='flex flex-col items-center text-center w-[60%] gap-4'>
                    <h1 className='font-bold text-6xl'>Chat with your <span className='text-white'>document</span> in seconds.</h1>
                    <p>Interactive PDF Chatbot allows you to have conversation with any PDF document. Simply upload your file and start asking questions right away</p>
                    <button onClick={getStartedClickHandler} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  px-4 flex gap-2 py-2 rounded-lg ">Get Started { <p> <i className="fas fa-arrow-right"></i></p>}</button>
                </div>
                <div className='flex rounded-xl overflow-hidden shadow-neutral-800'>
                    <img src="../sample.png" alt="" />
                </div>
            </div>

            <div className='flex flex-col gap-8 w-[65%]'>
                <div className='text-center'>
                    <h1 className='font-bold text-2xl'>Start chating in minutes</h1>
                    <p>Chatting to your PDF files has never been esier than with Abhay.</p>
                </div>

                <div className='flex justify-between flex-col  md:flex-row items-center gap-4 '>

                    <div className='flex flex-col border-t-2 gap-2 pt-4'>
                        <p className='text-white'>Step 1</p>
                        <h1  className='text-xl font-bold'>Sign up for an account</h1>
                        <p>Either starting with free plan or choose our <NavLink to="/signin" className="text-white">plan</NavLink></p>
                    </div>

                    <div className='flex flex-col border-t-2 gap-2  pt-4'>
                        <p className='text-white'>Step 2</p>
                        <h1  className='text-xl font-bold'>Upload your PDF file</h1>
                        <p>we will process your file and make it ready for you to chat with </p>
                    </div>


                    <div className='flex flex-col border-t-2 gap-2  pt-4'>
                        <p className='text-white'>Step 3</p>
                        <h1 className='text-xl font-bold'>Start asking questions</h1>
                        <p>It is that simple try out today- it rally takes a less than minute.</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default HomeComponent;