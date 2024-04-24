import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';


function Navbar(){

    const naviGate = useNavigate();
    
    function signinClickHandler(){
        naviGate('/signin')
    }
    function aboutusclickhandler(){
        naviGate('/aboutus')
    }
    function getStartedClickHandler(){
        naviGate('/signup')
    }
    return(

        <div className=" flex-col gap-2 md:flex-row shadow-lg shadow-black md:shadow-4xl bg-neutral-200  flex justify-between  px-32 items-center py-2">

            <div className="flex h-20 w-20  overflow-hidden rounded-md">
                <img  src="../logo.png" alt="" />
            </div>

            <div className=" flex-col gap-2 md:flex-row flex justify-between w-[35%]">
                
                <button onClick={signinClickHandler}>Sign in</button>
                <button onClick={aboutusclickhandler}>About Us</button>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-4 flex gap-2 py-2 rounded-lg " onClick={getStartedClickHandler}>Get Started { <p> <i className="fas fa-arrow-right"></i></p>}</button>
            </div>
        </div>
    )
}

export default Navbar;