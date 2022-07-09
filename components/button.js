import Link from "next/link";

import styles from "./button.module.scss";

export default function LinkButton({ value, href, className, ...props }) {
  return (
    <div className={`${styles.button} ${styles[className]}`}>
      <Link href={href}>{value}</Link>
    </div>
  );
}
