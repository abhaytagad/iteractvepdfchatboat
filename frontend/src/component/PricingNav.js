import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom';

function PricingNav(){

    return (
    
        <div className="flex justify-between flex-col gap-2 md:flex-row bg-slate-300 px-32 items-center py-2  shadow-xl shadow-black md:shadow-4xl ">

            <div className="flex h-20 w-20  overflow-hidden rounded-md">
                <img  src="../logo.png" alt="" />
            </div>
            <div className=" flex justify-between flex-col gap-2 md:flex-row items-center w-[15%]">
                <button ><NavLink to={'/dashboard'} >Dashbord</NavLink></button>
                <i className="fa-solid fa-user  "></i>
            </div>
        </div>
    )
}

export default PricingNav;