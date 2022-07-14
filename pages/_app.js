import { useEffect } from "react";

import Head from "next/head";

import Header from "../components/header/header";

import "../styles/globals.scss";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const vh = window.innerHeight - 1;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      const vh = window.innerHeight - 1;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Meter Log</title>
        <meta
          name="description"
          content="Log periodic meter value for electricity consumption."
        />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.main}>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
