import styles from "../styles/components/MovieForm.module.css";
import AddForm from "../components/AddForm";
import Head from "next/head";

const MovieForm = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title> | Add Movie</title>
      </Head>
      <AddForm />
    </div>
  );
};

export default MovieForm;
