import { createContext, useEffect, useState } from "react";

export const APIcontext = createContext();

function SignupContext({ children }) {
    const [email, setEmail] = useState(null);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [query, setQuery] = useState("");
    const [fileid, setFileid] = useState("");
    const [querie, setQuerie] = useState([]);
    const [array, setArray] = useState([null]);
    const [answer, setAnswer] = useState("");
    const [fileurl, setFileChange] = useState("");

    // 🔑 New: JWT token
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail && storedEmail !== "undefined") {
            setEmail(JSON.parse(storedEmail));
        }

        const storedFileUrl = localStorage.getItem("fileurl");
        if (storedFileUrl && storedFileUrl !== "undefined") {
            setFileChange(JSON.parse(storedFileUrl));
        }

        const storedFileId = localStorage.getItem("fileid");
        if (storedFileId && storedFileId !== "undefined") {
            setFileid(JSON.parse(storedFileId));
        }

        // 🔑 Load token if exists
        const storedToken = localStorage.getItem("token");
        if (storedToken && storedToken !== "undefined") {
            setToken(JSON.parse(storedToken));
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
        setQuerie((prev) => [...prev, val]);
    }

    function answerChangeHandler(val) {
        setAnswer(val);
    }

    function arrayChangeHandler(val) {
        setArray(val);
    }

    // 🔑 New: Token handler
    function changeToken(val) {
        setToken(val);
        localStorage.setItem("token", JSON.stringify(val));
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
        token,
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
        changeToken, // 🔑 Exposed to components
    };

    return <APIcontext.Provider value={value}>{children}</APIcontext.Provider>;
}

export default SignupContext;
