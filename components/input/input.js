import styles from "./input.module.scss";

export default function Input({ hint, label, value, changeHandler }) {
  const hintText = hint ? hint.message : "";
  const hintClass = hint ? hint.status : "none";

  const hintEl = hint ? <p className={styles.hint}>{hintText}</p> : <></>;

  return (
    <div className={`${styles.inputContainer} ${styles[hintClass]}`}>
      <label className={styles.label} htmlFor="reading">
        {label}
      </label>

      <input
        min="0"
        step="0.1"
        id="reading"
        type="number"
        value={value}
        autoComplete="off"
        className={styles.input}
        onChange={changeHandler}
        placeholder="Reading value..."
      />

      {hintEl}
    </div>
  );
}
