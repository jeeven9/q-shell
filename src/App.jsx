import Input from './components/input.jsx';
import Output from './components/output.jsx';
import Prompt from './components/prompt.jsx';
import styles from './App.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const url = import.meta.env.VITE_URL;

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const prompt = useRef(null);
  const bottom = useRef(null);

  useEffect(() => {
    prompt.current?.focus();
  }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  async function submitHandler(query) {
    setLoading(true);

    let answer = '';
    try {
      const response = await axios.post(url, {'query': query});
      answer = response.data.answer;
    } catch(error) {
      console.error(error);
      answer = 'Error - Could not connect to server!';
    }
    
    setLoading(false);
    setHistory(history => [...history, [query, answer]]);
  }

  function clickHandler() {
    prompt.current?.focus();
  }

  return (
    <div className={styles.terminal} onClick={clickHandler}>
      <Output>Q shell</Output>
      {history.map((result, ix) => (
        <div key={ix}>
          <Input>{result[0]}</Input>
          <Output>{result[1]}</Output>
        </div>
      ))}
      <Prompt onSubmit={submitHandler} loading={loading} childRef={prompt} />
      <div ref={bottom}></div>
    </div>
  );
}