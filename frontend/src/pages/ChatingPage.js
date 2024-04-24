import Message from "../component/Message";
import RenderPDF from "../component/RenderPDF";


function ChattingPage(){

    return(
        <div className="flex flex-col md:flex-row  overflow-y-scroll gap-4 w-screen h-screen ">     
            <RenderPDF/>            
            <Message/>  
        </div>
    )
}

export default ChattingPage;