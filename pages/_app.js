import { useEffect } from "react";

import Head from "next/head";

import "../styles/globals.scss";

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

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
