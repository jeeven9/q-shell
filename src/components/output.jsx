import styles from './output.module.css';

export default function Output(props) {
  return <div className={styles.output}>{props.children}</div>;
}