import styles from "../../styles/components/MovieForm.module.css";
import UpdateForm from "../../components/UpdateForm";
import Head from "next/head";

const MovieItemUpdate = ({ movie }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title> | Update Movie</title>
      </Head>
      <UpdateForm movie={movie} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:3000/api/movies/${context.params.id}`
  );
  const json = await res.json();

  return {
    props: {
      movie: json.info,
    },
  };
}
export default MovieItemUpdate;
