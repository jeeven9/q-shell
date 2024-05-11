import styles from './prompt.module.css';
import { useState } from 'react';

export default function Prompt(props) {
  const [input, setInput] = useState('');

  function handleKeyPress(event) {
    if(props.loading) return;

    if (event.key === 'Enter') {
      props.onSubmit(input);
      setInput('');
    } else {
      setInput(input => input + event.key);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Backspace') setInput(input => input.slice(0, -1));
  }

  return (
    <div
      className={styles.prompt}
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyDown}
      ref={props.childRef}
      tabIndex={0}
    >
      &gt;&nbsp;{input}{props.loading ? <div className={styles.loading}>...</div> : <span className={styles.cursor}>_</span>}
    </div>
  );
}