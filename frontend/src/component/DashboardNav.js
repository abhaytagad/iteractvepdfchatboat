import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';



function DashboardNav(){

    const naviGate = useNavigate();

    function pricingClickHandler(){
        naviGate('/pricing')
    }
    function homeClickHandler(){
        naviGate('/')
    }
   
   
    return(

        <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  flex justify-between flex-col gap-2 md:flex-row px-32 shadow-2xl shadow-black items-center py-2">

            <div className="flex h-20 w-20    overflow-hidden rounded-md">
                <img  src="../logo.png" alt="" />
            </div>

            <div className=" flex flex-col gap-2 md:flex-row justify-between md:w-[25%]">
                <button onClick={pricingClickHandler} className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2 rounded-md' >Pricing</button>
                <button onClick={homeClickHandler} className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2 rounded-md'>Home</button>
               
            </div>
        </div>
    )
}

export default DashboardNav;