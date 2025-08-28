import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";

function UploadingCom({ fileurl, fileid, removeFileHandler }) {
  const { fileChangeHandler, fileidChangeHandler } = useContext(APIcontext);
  const navigate = useNavigate();

  async function trashHandler() {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again.");
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        "https://pdfchatbot-7oim.onrender.com/api/deletefile",
        { fileid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("File deleted successfully");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/signin");
      } else {
        toast.error("Could not delete file.");
      }
      console.error(error);
    }
  }

  function messageHandler() {
    fileChangeHandler(fileurl);
    fileidChangeHandler(fileid);
    navigate("/chatting");
  }

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 mb-2 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <i className="far fa-file-pdf text-2xl text-red-500"></i>
        <span className="text-blue-700 font-semibold truncate">
          {fileurl ? fileurl.split("/").pop() : "Unknown file"}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={messageHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
        >
          <i className="fas fa-comment-dots"></i> Chat
        </button>
        <button
          onClick={trashHandler}
          className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded transition"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default UploadingCom;
