import { createContext, useEffect, useState } from "react";
export const APIcontext = createContext();

function SignupContext({children}){

    const [email,setEmail] = useState(null);
    const [otp,setOtp] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');
    const [fileurl,setFileChange] = useState('');
    const [query,setQuery] = useState('');
    const [fileid,setFileid] = useState('');
    const [querie,setQuerie] = useState([]);
    const [array,setarray] = useState([{}]);
    const [answer,setAnswer] = useState('');
    
    useEffect(() => {

        const Email = JSON.parse(localStorage.getItem('email'));
        if (Email) {
            console.log(Email)
            changeEmail(Email)  
        }
        const fileUrl = JSON.parse(localStorage.getItem('fileurl'));
        if (fileUrl) {
            console.log(fileUrl)
            fileChangeHandler(fileUrl)
        }
        const fileId = JSON.parse(localStorage.getItem('fileid'));
        if (fileId) {
            console.log(fileId)  
            fileidChangeHandler(fileId)
        }
      
      }, []);


    function changeEmail(val){
        setEmail(val);
        localStorage.setItem('email', JSON.stringify(val));
    }

    function changeOtp(val){
        setOtp(val);
    }
    function changePassword(val){
        setPassword(val);
    }

    function changefirstName(val){
        setfirstName(val);
    }
    function changelastName(val){
        setlastName(val);
    }

    function changeconfirmPassword(val){
        setconfirmPassword(val);
    }

    function fileChangeHandler(val){
        setFileChange(val);
        localStorage.setItem('fileurl', JSON.stringify(val));
    }

    function queryChangeHandler(val){
        setQuery(val);
    }
    function fileidChangeHandler(val){
        setFileid(val);
        localStorage.setItem('fileid', JSON.stringify(val));
    }
    function queriesChangeHandler(val){
        const arr = querie;
        arr.push(val)
        setQuerie(arr);
    }

    function answerChangeHandler(val){
        
        setAnswer(val)
    }

    function arrayChangeHandler(val){
        setarray(val);
    }


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
        answer ,
        changePassword,
        changeOtp,
        changeEmail,
        changefirstName,
        changelastName,
        changeconfirmPassword, 
        fileChangeHandler,
        queryChangeHandler,
        fileidChangeHandler,
        queriesChangeHandler,
        setQuerie,
        answerChangeHandler,
        arrayChangeHandler 
    }

    
    return <APIcontext.Provider value={value}>
        {children}
    </APIcontext.Provider>
    
}

export default SignupContext;