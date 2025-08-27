import { useContext } from "react"
import { APIcontext } from "../context/SignupContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function SignupVerify(){

    const{firstName,lastName,email,password,confirmPassword,otp,changeOtp} = useContext(APIcontext)
    const naviGate = useNavigate();

    function changeHandler(event){
        changeOtp(event.target.value)
    }

    async function clickHandler(){
        
        axios.post('https://pdfchatbot-7oim.onrender.com/api/signup',{
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            confirmPassword:confirmPassword,
            otp:otp
        })
        .then((res)=> {
            toast.success("Sign up succesfully")
            naviGate('/dashboard')
        })
        .catch((error)=>{
            toast.error("something went wrong")
            console.log(error)
        })
    }



    return(
        <div className=" bg-slate-100 flex flex-col items-center justify-center gap-4 h-screen">
            <div className="flex flex-col gap-2" >
                <label htmlFor="otp">Enter OTP</label>
               
                <input type="text" value={otp} onChange={changeHandler} className="border-2 rounded-lg px-2 border-blue-500" id="otp" placeholder="OTP"/>
            </div>
            <div >
                <button className="bg-blue-500 w-[200px] p-2 rounded-xl " onClick={clickHandler}>Verify OTP</button>
            </div>
            
        </div>
    )
}

export default SignupVerify;