import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";
import { toast } from "react-toastify";



function SigninPage(){

    const {changeEmail,changePassword} = useContext(APIcontext);
    
    const{email,password,otp} = useContext(APIcontext)
    const naviGate = useNavigate();

    async function clickHandler(){
        
        await axios.get('https://iteractvepdfchatboat.onrender.com/api/signin',{
            params:{
                otp:otp,
                email:email,
                password:password
            }
           
        })
        .then((response)=>{
            naviGate('/dashboard')
            toast.success("Login succesfully")
            console.log(response)
        })
        .catch((error)=>{
            toast.error("Something went wrong??")
            console.log(error)
        })
    }
    

    function emailChangeHandler(event){
      changeEmail(event.target.value)
    }

    function passwordChangeHandler(event){
      changePassword(event.target.value)
    }

    return(
        <div className="bg-slate-100 flex flex-col relative overflow-hidden justify-center h-screen items-center gap-10">
            
            <img src="../login.jpg" alt="" className=" opacity-50"/>
      
            <div className="absolute  ">
            <h1 className="font-bold text-3xl">Interactive PDF Chatboat</h1>
            <div className="flex flex-col  gap-6">
                <h1 className="font-bold text-lg">Wellcome Back!</h1>
                <p>Sign in to continue</p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="px-2">Email</label>
                    <input type="email" id="email" onChange={emailChangeHandler} value={email} className="border-2 border-blue-500 h-10  rounded-xl p-2" />
                    <br/>
                    <label htmlFor="password" className="px-2">Password</label>
                    <input type="text" id="password" onChange={passwordChangeHandler} value={password} className="border-2 border-blue-500 h-10  rounded-xl p-2" />
                    <br/>
                    <div className="flex items-center  justify-center">
                    <button className="bg-blue-500 text-white text-lg py-2 px-4 rounded-xl " onClick={clickHandler} >Continue</button>
                    </div>
                </div>
                
            </div>
            <p>No account? {<NavLink to = "/signup" className="text-blue-600">Create one</NavLink>}</p>
            </div>
        </div>
    )
}

export default SigninPage;