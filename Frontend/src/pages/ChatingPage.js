import Message from "../component/Message";
import RenderPDF from "../component/RenderPDF";

function ChattingPage() {
    return (
        <div className="flex flex-col md:flex-row gap-4 min-h-screen w-full p-4">
            <RenderPDF />
            <Message />
        </div>
    );
}

export default ChattingPage;
