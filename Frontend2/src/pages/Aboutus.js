import React from "react";

const aboutData = {
  name: "Abhay Tagad",
  project: "Interactive PDF Chatbot",
  mission: "To create user-friendly and interactive solutions that simplify complex tasks, such as accessing information within PDF documents.",
  vision: "A future where accessing and interacting with content in PDFs is effortless and intuitive, thanks to advancements in technology.",
  email: "omshiv09.ani@gmail.com",
  phone: "9021524609",
};

function Aboutus() {
  return (
    <section className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg text-gray-800 font-sans">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
        About Us
      </h1>
      <div className="flex flex-col items-center">
        <img
          src="https://ui-avatars.com/api/?name=Abhay+Tagad&background=0D8ABC&color=fff"
          alt="Abhay Tagad"
          className="w-24 h-24 rounded-full mb-4 shadow-md"
        />
        <h2 className="text-xl font-semibold mb-2">
          {aboutData.project}
        </h2>
        <p className="mb-2 text-center italic">
          Developer: {aboutData.name}
        </p>
        <p className="mb-2">{aboutData.mission}</p>
        <p className="mb-4 font-light">{aboutData.vision}</p>
        <div className="flex space-x-6 justify-center font-mono text-sm">
          <div>
            <span className="font-medium">Email:</span>{" "}
            <a
              href={`mailto:${aboutData.email}`}
              className="text-blue-600 underline"
            >
              {aboutData.email}
            </a>
          </div>
          <div>
            <span className="font-medium">Contact:</span>{" "}
            <a href={`tel:${aboutData.phone}`} className="text-blue-600 underline">
              {aboutData.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Aboutus);
