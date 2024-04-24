import { useContext } from "react";
import  { APIcontext } from "../context/SignupContext";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function SignUpPage(){

    const{firstName,lastName,email,password,confirmPassword,
        changeconfirmPassword,
        changePassword, changeEmail,changefirstName,changelastName} = useContext(APIcontext)
    
    const naviGate = useNavigate();

    function firstnameHandler(event){
        changefirstName(event.target.value)
    }

    function lastnameHandler(event){
        changelastName(event.target.value)
    }
    function emailHandler(event){
        changeEmail(event.target.value)
    }

    function passwordHandler(event){
        changePassword(event.target.value)
    }
    function conpasswordHandler(event){
        changeconfirmPassword(event.target.value)
    }

    function clickHandler(){

        axios.post('https://iteractvepdfchatboat.onrender.com/api/generatotp',{
            email:email,
        })
        .then((res)=> {
            toast.success("OTP send succesfully")
            naviGate('/signup/verifyotp')
        })
        .catch((err)=>{
            toast.error("something went wrong")
            console.log(err)
        })
    }


    return(
       <div className=" flex flex-col md:flex-row justify-between ">
            <img src="../signup.jpg" alt="" className="h-screen md:w-[50%]" />
            <div className="bg-slate-100 flex flex-col items-center justify-center md:w-[50%] shadow-xl shadow-black md:shadow-4xl h-screen gap-2"> 
            <div className="flex flex-col gap-2" >
                <label htmlFor="firstname">First Name</label>
                <input value={firstName} onChange={firstnameHandler} className="border-2 border-blue-600 rounded-md p-2" type="text" id="firstname"/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="lastname">Last Name</label>
                <input value={lastName} onChange={lastnameHandler} className="border-2 border-blue-600 rounded-md p-2" type="text" id="lastname"/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input value={email} onChange={emailHandler} className="border-2 border-blue-600 rounded-md p-2" type="email" id="email"/>
            </div >
            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={passwordHandler}  className="border-2 border-blue-600 rounded-md p-2" type="password" id="password"/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input value={confirmPassword} onChange={conpasswordHandler} className="border-2 border-blue-600 rounded-md p-2" type="password" id="confirmpassword"/>
            </div>
            <div>
                <button onClick={clickHandler} className="bg-blue-600 rounded-md p-2 w-[200px]">Sign Up</button>
            </div>
            </div>
       </div>
    )
}

export default SignUpPage;