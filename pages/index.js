import LinkButton from "../components/button";

import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <p className={styles.title}>Meter Log</p>

      <div className={styles.buttonContainer}>
        <LinkButton
          value={"Add meter value"}
          href={"/addMeterLog"}
          className={"blue"}
        />

        <LinkButton
          value={"View meter log"}
          href={"/viewMeterLogs"}
          className={"green"}
        />
      </div>
    </div>
  );
}
