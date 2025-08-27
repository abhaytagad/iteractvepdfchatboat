import { useContext } from "react"
import { APIcontext } from "../context/SignupContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function VerifyotpPage(){

    const{email,password,otp,changeOtp} = useContext(APIcontext)
    const naviGate = useNavigate();

    function changeHandler(event){
        changeOtp(event.target.value)
    }

    async function clickHandler(){
        
        await axios.get('https://pdfchatbot-7oim.onrender.com/api/signin',{
            params:{
                otp:otp,
                email:email,
                password:password
            }
           
        })
        .then((response)=>{
            naviGate('/dashboard')
            toast.success("Login succesfully")
        })
        .catch((error)=>{
            toast.error("Something went wrong??")
            console.log(error)
        })
    }



    return(
        <div className="bg-slate-100 flex flex-col items-center justify-center gap-4 h-screen">
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

export default VerifyotpPage;