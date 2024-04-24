
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext, useEffect } from 'react';
import { APIcontext } from '../context/SignupContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UploadingCom from './UploadingCom';

function DashboardCom(){

    const{email,array,fileChangeHandler,fileidChangeHandler,arrayChangeHandler} = useContext(APIcontext)
    
    const naviGate = useNavigate();
    
    useEffect(()=>{
        async function files(){
        await axios.post('https://iteractvepdfchatboat.onrender.com/api/allfiles',{
            email:email
        })
        .then((res)=>{
           
            console.log("retrived data",)
            arrayChangeHandler(res.data.array)
            console.log(array)
            
        })
        .catch((e)=>{
            console.log("could not retrive data")
            console.log(e)
        })
       }
       files();
       
    },[])

   
    function changeHandler(event){

        const file = event.target.files[0];
        
        const formData = new FormData();
       
        formData.append("file", file);
        formData.append("email",email)
       
        toast.success("Uploading file...")
        axios
        .post("https://iteractvepdfchatboat.onrender.com/api/uploadfile", formData)
        .then((response) => {
            toast.success("file uploaded succesfully")
            fileChangeHandler(response.data.response.url)
            fileidChangeHandler(response.data.fileResponse._id)
            naviGate('/chatting')
            console.log(response.data.answer);
        })
        .catch((error) => {
            toast.error("something went wrong ")
            console.log(error);
        });
    }


    return(
        <div className=" bg-gradient-to-r from-indigo-400 from-10% via-sky-400 via-30% to-emerald-400 to-90%  flex flex-col pt-10 items-center md:h-screen gap-8">
            <div className="flex flex-col md:flex-row items-center gap-2 justify-between  text-center w-[60%] border-b-2 py-10">
                <h1 className="font-bold text-3xl">My Files</h1>
                <input type='file' onChange={changeHandler}  className="bg-blue-800 text-white p-2 w-[30%] rounded-xl text-center" ></input> 
            </div>

          <div >
            {(array.length !== 0) ? 
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 shadow-2xl shadow-black p-4  ' >
                        {
                            array.map((obj)=>{
                                
                                return (<UploadingCom  fileurl={obj.fileUrl}  fileid={obj.fileid}/>)
                            })
                        }
                    </div>:   <div className='flex flex-col items-center gap-2'>
                    
                 <i className=" fa-solid fa-file-circle-question "></i>
                 <p className='font-bold text-lg'>Prety empty around here</p>
                 <p>Let's upload your first PDF. </p>
                </div>                     
             }
          </div> 
        </div>
    )
}

export default DashboardCom;