import styles from "../styles/components/layout.module.css";
import "antd/dist/antd.css";

import Nav from "./Nav";
export default function Layout(props) {
  return (
    <>
      <div className={styles.navContainer}>
        <Nav />
      </div>
      <div className={styles.containerChildren}>
        <main className={styles.main}>{props.children}</main>
      </div>
    </>
  );
}
