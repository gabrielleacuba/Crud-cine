import styles from "../styles/components/Nav.module.css";
import Link from "next/Link";
import React from "react";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <ul>
          <li>
            <img src="/popcorn.png" alt="PopCorn" />
          </li>
          <li>
            <h3>Crud cine</h3>
          </li>
        </ul>
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/movieForm">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
