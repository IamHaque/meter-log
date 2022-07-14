import styles from "./noLogs.module.scss";

export default function NoLogs() {
  return (
    <div className={styles.noLogs}>
      <p className={styles.title}>No Logs</p>
      <p className={styles.subtitle}>
        There are no logs to show.
        <br />
        Click the + button to log a new meter reading.
      </p>
    </div>
  );
}
