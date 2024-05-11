import styles from './input.module.css';

export default function Input(props) {
  return <div className={styles.input}>&gt;&nbsp;{props.children}</div>;
}