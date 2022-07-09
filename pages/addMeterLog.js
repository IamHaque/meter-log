import { useState } from "react";

import LinkButton from "../components/button";

import styles from "../styles/addMeterLog.module.scss";

export default function AddMeterLog() {
  const [reading, setReading] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [response, setResponse] = useState(undefined);

  const handleInputReading = (event) => {
    if (isBusy) return;

    setReading(event.target.value);
  };

  const handleSubmit = async () => {
    if (isBusy) return;

    setIsBusy(true);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ reading }),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch("/api/createLog", requestOptions);
    const data = await response.json();
    setResponse(data);

    if (data && data.status === "success") {
      setTimeout(() => {
        setReading("");
        setResponse(undefined);
        setIsBusy(false);
      }, 2000);
    }

    setIsBusy(false);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Add Meter Log</p>

      <div className={styles.inputWrapper}>
        <label htmlFor="reading">Enter meter reading</label>

        <input
          min="0"
          step="0.1"
          id="reading"
          type="number"
          value={reading}
          autoComplete="off"
          onChange={handleInputReading}
        />

        {response ? (
          response.status === "failed" ? (
            <small className={styles.error}>{response.message}</small>
          ) : (
            <small className={styles.success}>{response.message}</small>
          )
        ) : (
          <></>
        )}

        <button onClick={handleSubmit} disabled={isBusy}>
          {isBusy ? "..." : "Add to Log"}
        </button>

        <LinkButton value={"Home"} href={"/"} className={"pink"} />
      </div>
    </div>
  );
}
