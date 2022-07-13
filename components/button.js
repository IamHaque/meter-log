import styles from "./button.module.scss";

export default function Button({ disabled, value, clickHandler }) {
  return (
    <button
      disabled={disabled}
      className={styles.button}
      onClick={clickHandler}
    >
      {disabled ? "..." : value}
    </button>
  );
}
