import { useContext } from "react";
import { APIcontext } from "../context/SignupContext";

function RenderPDF() {
    const { fileurl } = useContext(APIcontext);

    return (
        <div className="flex w-screen md:w-[50%] min-h-screen">
            {fileurl ? (
                <iframe src={fileurl} className="w-full min-h-screen rounded-lg" />
            ) : (
                <div className="flex items-center justify-center w-full min-h-screen text-gray-500">
                    No PDF Selected
                </div>
            )}
        </div>
    );
}

export default RenderPDF;
