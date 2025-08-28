import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContext, useEffect, useState } from "react";
import { APIcontext } from "../context/SignupContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UploadingCom from "./UploadingCom";

function DashboardCom() {
  const { email, array, fileChangeHandler, fileidChangeHandler, arrayChangeHandler } =
    useContext(APIcontext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 🔑 Token
  const token = localStorage.getItem("token");

  // ✅ If no token → kick out immediately
  useEffect(() => {
    if (!token) {
      toast.error("Session expired, please login again.");
      navigate("/signin");
    }
  }, [token, navigate]);

  // 🔒 Auth headers
  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 📂 Fetch user files
  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await axios.post(
          "https://pdfchatbot-7oim.onrender.com/api/allfiles",
          { email },
          authHeaders
        );
        if (res.data?.array?.length > 0) {
          const cleanArr = res.data.array.filter(Boolean);
          arrayChangeHandler(cleanArr);
        } else {
          arrayChangeHandler([]);
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error("Unauthorized! Please login again.");
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          toast.error("Could not retrieve files.");
        }
        console.error("Error fetching files", error);
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchFiles();
  }, [email, token,array, navigate]);

  // 📤 Upload file
  async function changeHandler(event) {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected!");
      return;
    }
    if (!token) {
      toast.error("Session expired, please login again.");
      navigate("/signin");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    toast.info("Uploading file...");
    try {
      const response = await axios.post(
        "https://pdfchatbot-7oim.onrender.com/api/uploadfile",
        formData,
        authHeaders
      );
      toast.success("File uploaded successfully!");
      fileChangeHandler(response.data.response?.url);
      fileidChangeHandler(response.data.fileResponse?._id);
      navigate("/chatting");
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Unauthorized! Please login again.");
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        toast.error("Upload failed.");
      }
      console.error("Error uploading file", error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Your PDFs
      </h2>

      <div className="flex justify-end mb-6">
        <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition">
          <input
            type="file"
            className="hidden"
            onChange={changeHandler}
            accept=".pdf"
          />
          Upload PDF
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-blue-600 font-semibold">
            Loading files...
          </span>
        </div>
      ) : array && array.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {array
            .filter((obj) => obj && obj.fileUrl && obj.fileid)
            .map((obj) => (
              <UploadingCom
                key={obj.fileid}
                fileurl={obj.fileUrl}
                fileid={obj.fileid}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-20 bg-white rounded-md shadow-md">
          <p className="text-gray-500 mb-4">Pretty empty around here</p>
          <label className="cursor-pointer bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition mb-2">
            <input
              type="file"
              className="hidden"
              onChange={changeHandler}
              accept=".pdf"
            />
            Upload your first PDF
          </label>
          <span className="text-sm text-gray-400">
            Drag & drop or browse files
          </span>
        </div>
      )}
    </div>
  );
}

export default DashboardCom;
