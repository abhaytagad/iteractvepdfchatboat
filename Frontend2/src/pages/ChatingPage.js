import React from "react";
import Message from "../component/Message";
import RenderPDF from "../component/RenderPDF";

function ChattingPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 p-4 text-white text-xl font-bold text-center shadow">
        PDF Chat Bot
      </header>
      <main className="flex flex-col flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <RenderPDF />
        <div className="chat-container flex-1 overflow-y-auto mt-4">
          <Message />
        </div>
      </main>
    </div>
  );
}

export default React.memo(ChattingPage);
