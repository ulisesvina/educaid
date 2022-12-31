import styles from "../styles/Spiner.module.css";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Spinner;
