

function Aboutus(){


    return(
        <div className="flex gap-4 items-center justify-between  py-8  px-[10%] h-screen">
            <div className=" flex items-center  h-full ">
                <div className=" absolute rounded-full  bg-yellow-800">
                    <img src="../pic.jpg" alt="" className=" relative top-20 right-[25%] rounded-full " />
                </div>
            </div>
            <div className=" w-[40%] flex flex-col gap-6 ">
                <h1 className="font-bold text-xl">About Me</h1>
                <p>
                Welcome to the "Interactive PDF Chatbot" , My name is Abhay Tagad, and I'm the developer behind the Interactive PDF Chatbot project. 
                My mission is to create user-friendly and interactive solutions that simplify complex tasks, such as accessing information within PDF documents.
                I envision a future where accessing and interacting with content in PDFs is effortless and intuitive, thanks to advancements in technology.
                </p>
                <h1 className="font-bold text-xl">Get in Touch</h1>
                <p>Email : omshiv09.ani@gmail.com</p>
                <p>Contact no. : 9021524609</p>
            </div>
        </div>
    )
}

export default Aboutus