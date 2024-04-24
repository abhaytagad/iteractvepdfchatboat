import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useReducer } from 'react';
import { APIcontext } from '../context/SignupContext';
import { toast } from 'react-toastify';
import Question from './Question.js';
import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';


function Message(){
    
    const{fileid,email,query,queryChangeHandler, querie,queriesChangeHandler,answer,answerChangeHandler } = useContext(APIcontext)

    const [value,forceUpdate] = useReducer( x=> x+1,0)
    
    useEffect(()=>{
        
    },[value])

    function changeHandler(event){
        queryChangeHandler(event.target.value)
    }

    const playQuerySound = () => {
        const audio = new Audio('../button.mp3');
        audio.play();
      };

    const{mutate} = useMutation(async (data)=>{
        
        const res = await fetch('https://iteractvepdfchatboat.onrender.com/api/query',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!res.ok){
            toast.error("something went wrong")
        }
       
        
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let partialData = '';

        while (true) {
        
        const { done, value } = await reader.read();
        
        if (done) {
            break;
        }
        
        partialData += decoder.decode(value, { stream: true });
        
        answerChangeHandler(partialData)
        forceUpdate();

       }
       axios.post('http://localhost:4000/api/createquery',{
        email:email,
        fileid:fileid,
        query:query,
        answer:answer
       })
    })

   async  function clickHandler(){
        
        playQuerySound();
        queriesChangeHandler(answer)
        answerChangeHandler('')
        console.log(query)
        queriesChangeHandler(query)
        forceUpdate()
        const data = {email:email,
            query:query,
            fileid:fileid}
        mutate(data) 
        
    }

    const playClickSound = () => {
        const audio = new Audio('../sound.wav');
        audio.play();
      };


   

    

    return(
        <div className='flex flex-col w-screen md:w-[50%] shadow-2xl shadow-black justify-between px-4 gap-4 py-6 relative overflow-hidden'>
            <div className='flex flex-col justify-end hover:justify-start overflow-y-scroll pb-8  gap-4  h-screen'>
         
               <div className='flex flex-col gap-4  '>
               {
                    querie.map((que)=>{
                       if (que){
                        return <Question question = {que}/>
                       }
                    })
                }

               </div>
               <div>
                {
                 answer?  <Question question = {answer}/>: <div></div>
                }
               </div>
            </div>
            <div className='flex justify-between items-center  h-10 px-8 gap-2  absolute bottom-2 w-full'>
                <input onKeyDown={(e)=>{if (e.key === "Enter"){clickHandler(); e.target.value = ''}}}  placeholder='Enter your query here ...' onChange={changeHandler} className="border-2 border-blue-400 h-full w-[90%] rounded-md px-1" type="text" />
                <FontAwesomeIcon  onClick={clickHandler} className='h-[70%] bg-blue-800 rounded-md p-1 text-white' icon={faLocationArrow} />
            </div>
        </div>
    )
}

export default Message;


 

 
