import { createContext, useEffect, useState } from "react";

export const APIcontext = createContext();

function SignupContext({ children }) {
    const [email, setEmail] = useState(null);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [fileurl, setFileUrl] = useState("");
    const [query, setQuery] = useState("");
    const [fileid, setFileid] = useState("");
    const [querie, setQuerie] = useState([]);
    const [array, setArray] = useState([null]);
    const [answer, setAnswer] = useState("");
    const [fileurl, setFileChange] = useState('');


    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail !== null && storedEmail !== "undefined") {
            setEmail(JSON.parse(storedEmail));
        }
    
        const storedFileUrl = localStorage.getItem("fileurl");
        if (storedFileUrl !== null && storedFileUrl !== "undefined") {
            setFileChange(JSON.parse(storedFileUrl));
        }
    
        const storedFileId = localStorage.getItem("fileid");
        if (storedFileId !== null && storedFileId !== "undefined") {
            setFileid(JSON.parse(storedFileId));
        }
    }, []);
    
    

    // State Update Handlers
    function changeEmail(val) {
        setEmail(val);
        localStorage.setItem("email", JSON.stringify(val));
    }

    function changeOtp(val) {
        setOtp(val);
    }

    function changePassword(val) {
        setPassword(val);
    }

    function changeFirstName(val) {
        setFirstName(val);
    }

    function changeLastName(val) {
        setLastName(val);
    }

    function changeConfirmPassword(val) {
        setConfirmPassword(val);
    }

    function fileChangeHandler(val) {
        setFileChange(val);
        localStorage.setItem("fileurl", JSON.stringify(val));
    }

    function queryChangeHandler(val) {
        setQuery(val);
    }

    function fileidChangeHandler(val) {
        setFileid(val);
        localStorage.setItem("fileid", JSON.stringify(val));
    }

    function queriesChangeHandler(val) {
        setQuerie((prev) => [...prev, val]); // Creates a new array for state update
    }

    function answerChangeHandler(val) {
        setAnswer(val);
    }

    function arrayChangeHandler(val) {
        setArray(val);
    }

    // Context Value
    const value = {
        email,
        otp,
        password,
        firstName,
        lastName,
        confirmPassword,
        fileurl,
        query,
        fileid,
        querie,
        array,
        answer,
        changePassword,
        changeOtp,
        changeEmail,
        changeFirstName,
        changeLastName,
        changeConfirmPassword,
        fileChangeHandler,
        queryChangeHandler,
        fileidChangeHandler,
        queriesChangeHandler,
        answerChangeHandler,
        arrayChangeHandler,
    };

    return <APIcontext.Provider value={value}>{children}</APIcontext.Provider>;
}

export default SignupContext;
