import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";

function UploadingCom({ fileurl, fileid, removeFileHandler }) {
    const { fileChangeHandler, fileidChangeHandler } = useContext(APIcontext);
    const navigate = useNavigate();

    // 🗑️ Delete File Handler
    async function trashHandler() {
        const confirmDelete = window.confirm("Are you sure you want to delete this file?");
        if (!confirmDelete) return;

        try {
            await axios.post("https://pdfchatbot-7oim.onrender.com/api/deletefile", { fileid });
            toast.success("File deleted successfully");
            removeFileHandler(fileid); // ✅ Update UI after deletion
        } catch (error) {
            toast.error("Something went wrong while deleting the file.");
            console.error(error);
        }
    }

    // 💬 Open Chat Handler
    function messageHandler() {
        fileChangeHandler(fileurl);
        fileidChangeHandler(fileid);
        navigate("/chatting");
    }

    return (
        <div className="relative group w-full max-w-[300px] border rounded-lg overflow-hidden shadow-lg">
            {/* 📄 PDF Viewer */}
            <iframe
                src={fileurl}
                title="PDF Preview"
                className="w-full h-[400px] border-none"
            ></iframe>

            {/* 🛠️ Action Buttons */}
            <div className="absolute bottom-0 inset-0 backdrop-blur-md bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <i
                    onClick={trashHandler}
                    className="fa-solid fa-trash text-white text-3xl cursor-pointer hover:text-red-500 transition-colors duration-300 mx-4"
                ></i>
                <i
                    onClick={messageHandler}
                    className="fa-regular fa-message text-white text-3xl cursor-pointer hover:text-green-400 transition-colors duration-300 mx-4"
                ></i>
            </div>
        </div>
    );
}

export default UploadingCom;
