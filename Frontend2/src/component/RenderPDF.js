import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";

function RenderPDF() {
  const { fileurl } = useContext(APIcontext);
    console.log(fileurl)
  return (
    <div className="my-4 bg-gray-50 rounded shadow p-4">
      {fileurl ? (
        <iframe
          src={fileurl}
          title="PDF Viewer"
          className="w-full h-96 rounded border"
        ></iframe>
      ) : (
        <p className="text-gray-400 text-center">No PDF loaded. Upload a file to start.</p>
      )}
    </div>
  );
}

export default RenderPDF;
