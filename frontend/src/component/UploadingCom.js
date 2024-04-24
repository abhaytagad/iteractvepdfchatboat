import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';

function UploadingCom(props){
    const { fileChangeHandler,fileidChangeHandler} = useContext(APIcontext)
    const naviGate = useNavigate();

    function trashHandler(){
        axios
        .post("http://localhost:4000/api/deletefile", {
            fileid:props.fileid
        })
        .then((response) => {
            toast.success("file deleted succesfully")
            console.log(props.fileid)
        })
        .catch((error) => {
            toast.error("something went wrong ")
            console.log(error);
        });
    }

    function messageHandler(){
        fileChangeHandler(props.fileurl)
        fileidChangeHandler(props.fileid)
        naviGate('/chatting')
    }
    
    return(
        <div className="relative group">
             <iframe src={props.fileurl}  ></iframe>
             <div className="absolute bottom-[0%] gap-10 inset-0 backdrop-filter backdrop-blur-lg h-[100%]  opacity-0   w-[100%] flex items-center  justify-center hover:opacity-100">
                <i onClick={trashHandler} className="fa-solid fa-trash  text-3xl "></i>
                <i  onClick={messageHandler} className="fa-regular fa-message text-3xl "></i>
             </div>
        </div>   
    )
}

export default UploadingCom;