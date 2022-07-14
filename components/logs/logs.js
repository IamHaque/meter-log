import LogItem from "../logItem/logItem";

import styles from "./logs.module.scss";

const COLORS = ["blue", "purple", "violet", "orange", "pink", "red"];

export default function Logs({ logs, editHandler, deleteHandler }) {
  return (
    <div className={styles.logsContainer}>
      {logs.map((log, index) => (
        <LogItem
          id={log.id}
          key={log.id}
          reading={log.reading}
          color={getColorClass(index)}
          datetime={log.recordedAt}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          readingDelta={log.readingDelta}
        />
      ))}
    </div>
  );
}

const getColorClass = (index) => COLORS[index % COLORS.length];
