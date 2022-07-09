import moment from "moment";

import LinkButton from "../components/button";

import styles from "../styles/viewMeterLogs.module.scss";

export default function ViewMeterLogs({ logs }) {
  logs = [];

  const localDate = (dt) => {
    const formattedDate = moment(dt).format("DD MMM, YY hh:MM a");
    return formattedDate.toString();
  };

  const padIndex = (index) => {
    return index < 10 ? "0" + index : index;
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>View Meter Logs</p>

      <div className={styles.logContainer}>
        {logs.length > 0 ? (
          logs.map((log, index) => {
            return (
              <p className={styles.logRow} key={log.id}>
                <span>{padIndex(index + 1)}</span>
                <span>{log.reading} units</span>
                <span>{localDate(log.recordedAt)}</span>
              </p>
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
  console.log(dev, hostname);

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

  const logs = data.data.map((log) => {
    return {
      reading: log.reading,
      recordedAt: log.createdAt,
    };
  });

  return {
    props: {
      logs,
    },
  };
}
