import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Input from "../components/input/input";
import Button from "../components/button/button";

import styles from "../styles/addMeterLog.module.scss";

export default function AddMeterLog({ id, existingLog }) {
  const router = useRouter();

  const [reading, setReading] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [response, setResponse] = useState(undefined);

  useEffect(() => {
    if (!id) return;

    setReading(existingLog.reading);
  }, []);

  const handleInputReading = (event) => {
    if (isBusy) return;

    setReading(event.target.value);
  };

  const handleSubmit = async () => {
    if (isBusy) return;

    setIsBusy(true);

    let response;
    if (id) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ id, reading }),
        headers: { "Content-Type": "application/json" },
      };

      response = await fetch("/api/updateLog", requestOptions);
    } else {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ reading }),
        headers: { "Content-Type": "application/json" },
      };

      response = await fetch("/api/createLog", requestOptions);
    }

    const data = await response.json();
    setResponse(data);

    if (data && data.status === "success") {
      setTimeout(() => {
        setReading("");
        setResponse(undefined);
        setIsBusy(false);

        router.push("/");
      }, 1000);
    }

    setIsBusy(false);
  };

  const handleBackPress = () => {
    router.replace("/");
  };

  return (
    <>
      <p className={styles.subtext}>{id ? "Update log" : "Add log"}</p>

      <div className={styles.workingArea}>
        <Input
          value={reading}
          hint={response}
          changeHandler={handleInputReading}
          label={"Enter the meter reading below"}
        />

        <div className={styles.buttonsContainer}>
          <Button
            disabled={isBusy}
            clickHandler={handleSubmit}
            value={id ? "Update Reading" : "Add Reading"}
          />

          <Button
            value={"Home"}
            disabled={isBusy}
            clickHandler={handleBackPress}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  if (!id) {
    return {
      props: {},
    };
  }

  const dev = process.env.NODE_ENV !== "production";
  const hostname = dev
    ? "http://localhost:3000"
    : "https://meter-log.herokuapp.com";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(hostname + "/api/getLog/" + id, requestOptions);
  const data = await response.json();

  if (!data.data) {
    return {
      props: {},
    };
  }

  return {
    props: { id, existingLog: data.data },
  };
}
