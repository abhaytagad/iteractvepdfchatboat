import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContext, useEffect, useState } from "react";
import { APIcontext } from "../context/SignupContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UploadingCom from "./UploadingCom";

function DashboardCom() {
    const { email, array, fileChangeHandler, fileidChangeHandler, arrayChangeHandler } = useContext(APIcontext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        async function fetchFiles() {
            try {
                const res = await axios.post("https://pdfchatbot-7oim.onrender.com/api/allfiles", { email });
                if (res.data.array.length > 0) {
                    // console.log(res.data.array)
                    arrayChangeHandler(res.data.array);
                }
            } catch (error) {
                console.error("Could not retrieve data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchFiles();
    }, [email, arrayChangeHandler]);

    async function changeHandler(event) {
        const file = event.target.files[0];
        if (!file) {
            toast.error("No file selected!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("email", email);

        toast.info("Uploading file...");
        try {
            const response = await axios.post("https://pdfchatbot-7oim.onrender.com/api/uploadfile", formData);
            toast.success("File uploaded successfully!");
            fileChangeHandler(response.data.response.url);
            fileidChangeHandler(response.data.fileResponse._id);
            navigate("/chatting");
        } catch (error) {
            toast.error("Something went wrong while uploading.");
            console.error(error);
        }
    }

    return (
        <div className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 flex flex-col pt-10 items-center min-h-screen gap-8">
            <div className="flex flex-col md:flex-row items-center justify-between w-[80%] md:w-[60%] border-b-2 py-6 text-center">
                <h1 className="font-bold text-3xl">My Files</h1>
                <input type="file" onChange={changeHandler} className="bg-blue-800 text-white p-2 rounded-xl w-full md:w-[30%] text-center cursor-pointer hover:bg-blue-700 transition-all" />
            </div>

            {loading ? (
                <p className="text-lg text-gray-700">Loading files...</p>
            ) :  array[0] != null ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 shadow-xl bg-white rounded-lg">
                    {array.map((obj) => {
                        
                        return  <UploadingCom key={obj.fileid} fileurl={obj.fileUrl} fileid={obj.fileid} />;
                    })}
                </div>
            ): (
                <div className="flex flex-col items-center gap-2 text-center">
                    <i className="fa-solid fa-file-circle-question text-4xl text-gray-500"></i>
                    <p className="font-bold text-lg">Pretty empty around here</p>
                    <p>Let's upload your first PDF.</p>
                </div>
            )}
        </div>
    );
}

export default DashboardCom;
