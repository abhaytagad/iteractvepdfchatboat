import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useReducer } from 'react';
import { APIcontext } from '../context/SignupContext';
import { toast } from 'react-toastify';
import Question from './Question.js';
import React from 'react';
import { useMutation } from 'react-query';

function Message() {
  const { fileid, email, query, queryChangeHandler, querie, queriesChangeHandler, answer, answerChangeHandler } = useContext(APIcontext);
  const [value, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {}, [value]);

  function changeHandler(event) {
    queryChangeHandler(event.target.value);
  }

  const playQuerySound = () => {
    const audio = new Audio('../button.mp3');
    audio.play();
  };

  const { mutate } = useMutation(async (data) => {
    const res = await fetch('https://pdfchatbot-7oim.onrender.com/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Something went wrong");
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let partialData = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      let chunk = decoder.decode(value, { stream: true })
        .replace(/<\/s>/g, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ');
      partialData += chunk;
      answerChangeHandler(partialData);
      forceUpdate();
    }
  });

  async function clickHandler() {
    playQuerySound();
    queriesChangeHandler(answer);
    answerChangeHandler('');
    queriesChangeHandler(query);
    forceUpdate();
    const data = { email, query, fileid };
    mutate(data);
  }

  const playClickSound = () => {
    const audio = new Audio('../sound.wav');
    audio.play();
  };

  async function startListening() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      playClickSound();
    };
    recognition.start();
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const speechResult = event.results[last].transcript;
      if (speechResult) {
        queryChangeHandler(speechResult);
        clickHandler();
      }
    };
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-xl">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={changeHandler}
          placeholder="Type your question here..."
          className="border-gray-300 rounded px-4 py-2 flex-1 shadow"
        />
        <button
          onClick={clickHandler}
          className="bg-blue-600 px-4 py-2 rounded text-white flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faLocationArrow} /> Send
        </button>
        <button
          onClick={startListening}
          className="bg-green-400 px-4 py-2 ml-2 rounded text-white hover:bg-green-500 transition"
        >
          <i className="fas fa-microphone-alt"></i> Voice
        </button>
      </div>
      <div className="mt-6">
        <Question />
        <div className="text-gray-700 mt-2">{answer}</div>
      </div>
    </div>
  );
}

export default React.memo(Message);
