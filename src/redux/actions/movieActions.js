import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  NEW_MOVIES,
  DELETE_MOVIES,
  UPDATE_MOVIES,
} from "./types";

import axios from "axios";

function fetchMoviesPending() {
  return {
    type: FETCH_MOVIES_PENDING,
  };
}

function fetchMoviesSuccess(data) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: data,
  };
}

function fetchMoviesError(error) {
  return {
    type: FETCH_MOVIES_ERROR,
    error: error,
  };
}
export const fetchMovies = () => (dispatch) => {
  dispatch(fetchMoviesPending());

  return axios
    .get("http://localhost:5000/movies")
    .then((res) => {
      dispatch(fetchMoviesSuccess(res.data));
    })
    .catch((error) => {
      dispatch(fetchMoviesError(error));
    });
};

export const createMovie = (movie) => (dispatch) => {
  return axios
    .post("http://localhost:5000/movies", {
      title: movie.title,
      description: movie.description,
      platform: movie.platform,
      note: movie.note,
      watched: movie.watched,
    })
    .then((res) =>
      dispatch({
        type: NEW_MOVIES,
        payload: movie,
      })
    )
    .catch((error) => {
      dispatch(fetchMoviesError(error));
    });
};

export const deleteMovie = (idMovie) => (dispatch) => {
  return axios
    .delete(`http://localhost:5000/movies/${idMovie}`)
    .then((data) => {
      dispatch({
        type: DELETE_MOVIES,
        payload: idMovie,
      });
    })
    .catch((error) => {
      dispatch(fetchMoviesError(error));
    });
};

export const updateMovie = (movie) => (dispatch) => {
  return axios
    .put(`http://localhost:5000/movies/${movie.id}`, {
      title: movie.title,
      description: movie.description,
      platform: movie.platform,
      note: movie.note,
      watched: movie.watched,
      id: movie.id,
    })
    .then((res) =>
      dispatch({
        type: UPDATE_MOVIES,
        payload: movie,
      })
    )
    .catch((error) => {
      dispatch(fetchMoviesError(error));
    });
};
