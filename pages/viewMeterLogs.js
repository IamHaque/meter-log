import LogCard from "../components/logCard";
import LinkButton from "../components/button";

import styles from "../styles/viewMeterLogs.module.scss";

export default function ViewMeterLogs({ logs }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>View Meter Logs</p>

      <div className={styles.logContainer}>
        {logs.length > 0 ? (
          logs.map((log, index) => {
            return (
              <LogCard
                key={log.id}
                index={index + 1}
                reading={log.reading}
                datetime={log.recordedAt}
                readingDelta={log.readingDelta}
              />
            );
          })
        ) : (
          <div className={styles.noLogData}>
            <span>No data to display.</span>
          </div>
        )}
      </div>

      <LinkButton value={"Home"} href={"/"} className={"pink"} />
    </div>
  );
}

export async function getServerSideProps() {
  const dev = process.env.NODE_ENV !== "production";
  const hostname = dev
    ? "http://localhost:3000"
    : "https://meter-log.herokuapp.com";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(hostname + "/api/viewLogs", requestOptions);
  const data = await response.json();

  if (!data.data) {
    return {
      props: {
        logs: [],
      },
    };
  }

  const logs = [];
  for (let i = data.data.length - 1; i >= 0; i--) {
    const log = data.data[i];

    let prevLog;
    if (i !== data.data.length - 1) {
      prevLog = data.data[i + 1];
    }

    const readingDelta = prevLog
      ? (log.reading - prevLog.reading).toFixed(1)
      : 0;
    logs.push({
      readingDelta,
      reading: log.reading,
      recordedAt: log.createdAt,
    });
  }

  return {
    props: {
      logs,
    },
  };
}

const addLog = async (url) => {
  // hostname + "/api/createLog"

  for (let i = 0; i < 20; i++) {
    let randomOffset = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    randomOffset = Math.random() < 0.5 ? randomOffset : randomOffset * -1;
    const reading = i * 50 + randomOffset;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ reading }),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, requestOptions);
    await response.json();
  }
};
