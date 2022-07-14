import { useState } from "react";

import { useRouter } from "next/router";

import Fab from "../components/fab/fab";
import Logs from "../components/logs/logs";
import NoLogs from "../components/noLogs/noLogs";

import styles from "../styles/index.module.scss";

export default function Home({ logs }) {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  const editLog = (id) => {
    if (isBusy) return;
    setIsBusy(true);

    router.push({
      pathname: "/addMeterLog",
      query: { id },
    });

    setIsBusy(false);
  };

  const deleteLog = async (id) => {
    if (isBusy) return;

    setIsBusy(true);

    const confirmBox = await window.confirm(
      "Do you really want to delete this meter reading?"
    );

    if (confirmBox === true) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch("/api/deleteLog", requestOptions);
      const data = await response.json();

      if (data && data.status === "success") {
        router.push("/");
      }
    }

    setIsBusy(false);
  };

  return (
    <>
      <p className={styles.subtext}>All logs</p>

      <div className={styles.workingArea}>
        {logs && logs.length > 0 ? (
          <Logs logs={logs} editHandler={editLog} deleteHandler={deleteLog} />
        ) : (
          <NoLogs />
        )}
      </div>

      <Fab href={"/addMeterLog"} />
    </>
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
      id: log.id,
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
