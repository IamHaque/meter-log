import Link from "next/link";

import styles from "./fab.module.scss";

export default function Fab({ href, ...props }) {
  return (
    <div className={styles.fab}>
      <Link href={href}>+</Link>
    </div>
  );
}
