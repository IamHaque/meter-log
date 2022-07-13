import Image from "next/image";

import moment from "moment";

import styles from "./logItem.module.scss";

export default function LogItem({
  id,
  color,
  reading,
  datetime,
  editHandler,
  readingDelta,
  deleteHandler,
}) {
  return (
    <div className={styles.logItem}>
      <div className={`${styles.dateContainer} ${color}`}>
        <span className={styles.date}>{getDate(datetime)}</span>
        <span className={styles.month}>{getMonth(datetime)}</span>
      </div>

      <div className={styles.readingContainer}>
        <span className={styles.reading}>{reading}</span>
        <span className={styles.unit}>units</span>

        {Math.abs(readingDelta) > 0 ? (
          <span
            className={`${styles.readingDelta} ${
              styles[getDeltaClass(readingDelta)]
            }`}
          >
            {addSign(readingDelta)}
          </span>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.changeContainer}>
        <button
          className={styles.edit}
          onClick={() => {
            editHandler(id);
          }}
        >
          <Image width="18" height="18" alt="edit log" src="/edit.svg" />
        </button>

        <button
          className={styles.delete}
          onClick={() => {
            deleteHandler(id);
          }}
        >
          <Image width="18" height="18" alt="delete log" src="/delete.svg" />
        </button>
      </div>
    </div>
  );
}

const getDate = (dt) => moment(dt).format("DD").toString();

const getMonth = (dt) => moment(dt).format("MMM").toString();

const addSign = (val) => (val <= 0 ? val : "+" + val);

const getDeltaClass = (val) => (val < 0 ? "decrement" : "increment");
