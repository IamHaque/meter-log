import moment from "moment";

import styles from "./logCard.module.scss";

export default function LogCard({
  index,
  reading,
  datetime,
  readingDelta,
  ...props
}) {
  return (
    <div className={styles.logRow}>
      <div className={styles.index}>
        <span>{padIndex(index)}</span>
      </div>

      <div className={styles.main}>
        <p className={styles.reading}>
          <span>{reading}</span>
          <span>units</span>
        </p>

        <p className={styles.readingChange}>
          {Math.abs(readingDelta) > 0 ? (
            <span className={`${getDeltaClass(readingDelta)}`}>
              ({addSign(readingDelta)})
            </span>
          ) : (
            <></>
          )}
        </p>
      </div>

      <div className={styles.date}>
        <span>{getDate(datetime)}</span>
        <span>{getMonth(datetime)}</span>
      </div>
    </div>
  );
}

const getDate = (dt) => moment(dt).format("DD").toString();

const getMonth = (dt) => moment(dt).format("MMM").toString();

const padIndex = (index) => {
  return index < 10 ? "0" + index : index;
};

const addSign = (val) => (val <= 0 ? val : "+" + val);

const getDeltaClass = (val) => (val < 0 ? "negative" : "positive");
