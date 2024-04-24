import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";


function RenderPDF(){
    
    const{fileurl} = useContext(APIcontext);

    return(
        <div className=" flex h-screen w-screen md:w-[50%]   "> 
            <iframe src={fileurl}   className=" w-full h-screen rounded-lg"></iframe>
        </div>
    )
}
export default RenderPDF;