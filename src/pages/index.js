import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../redux/actions/movieActions";
import MoviesList from "../components/MoviesList";
import Head from "next/head";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(dispatch(fetchMovies()));
  }, []);

  return (
    <>
      <Head>
        <title> |   Crud Cine</title>
      </Head>
      <MoviesList />;
    </>
  );
}
