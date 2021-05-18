import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMovie } from "../redux/actions/movieActions";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../styles/components/Form.module.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const UpdateForm = ({ movie }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [watched, setWatched] = useState(-1);
  const [platform, setPlatform] = useState("netflix");
  const [note, setNote] = useState(1);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    getParams();
  }, []);

  const getParams = () => {
    setTitle(movie.title);
    setDescription(movie.description);
    setWatched(movie.watched);
    setPlatform(movie.platform);
    setNote(movie.note);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const movieUpdate = {
      title: title,
      description: description,
      watched: watched,
      platform: platform,
      note: note,
      id: movie.id,
    };

    if (title !== "" && description !== "" && watched !== -1) {
      dispatch(updateMovie(movieUpdate));

      setOpen(true);

      setTitle("");
      setDescription("");
      setPlatform("netflix");
      setNote(0);
      setWatched(-1);
    } else {
      setOpenWarning(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenWarning(false);
  };
  return (
    <>
      <div className={styles.containerForm}>
        <h1> Update Movie </h1>
        <p>* Required fields</p>
        <form data-testid="form">
          <div className={styles.inputText}>
            <div>
              <span>
                <label htmlFor="movieName"> * Movie Name</label>
              </span>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                data-testid={"inputMovieName"}
                type="text"
                name="movieName"
                id="movieName"
              />
            </div>
            <div>
              <span>
                <label htmlFor="description"> * Sinopse</label>
              </span>
              <textarea
                data-testid={"inputDescription"}
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <span>
              <label htmlFor="watched"> * Already watched?</label>
            </span>

            <label>
              <input
                checked={watched === 0}
                type="radio"
                data-testid={"inputWatched"}
                name="watched"
                id="watched"
                onChange={(e) => {
                  setWatched(parseInt(e.target.value));
                }}
                value={0}
              />{" "}
              Sim
            </label>
            <label>
              <input
                checked={watched === 1}
                data-testid={"inputNoWatched"}
                type="radio"
                name="watched"
                id="noWatched"
                onChange={(e) => {
                  setWatched(parseInt(e.target.value));
                }}
                value={1}
              />{" "}
              Não
            </label>
          </div>

          <div>
            <span>
              <label htmlFor="platform"> * Platform</label>
            </span>
            <select
              data-testid="platform"
              id="platform"
              onChange={(e) => {
                setPlatform(e.target.value);
              }}
              value={platform}
            >
              <option data-testid="platform-option" value="netflix">
                Netflix
              </option>
              <option data-testid="platform-option" value="disneyPlus">
                Disney Plus
              </option>
              <option data-testid="platform-option" value="amazonPrime">
                Amazon Prime
              </option>
              <option data-testid="platform-option" value="youtube">
                Youtube
              </option>
            </select>
          </div>
          <div>
            <span>
              <label htmlFor="note"> * Note</label>
            </span>
            <select
              data-testid="note"
              id=" note"
              onChange={(e) => {
                setNote(parseInt(e.target.value));
              }}
              value={note}
            >
              <option data-testid="note-option" value={1}>
                1
              </option>
              <option data-testid="note-option" value={2}>
                2
              </option>
              <option data-testid="note-option" value={3}>
                3
              </option>
              <option data-testid="note-option" value={4}>
                4
              </option>
              <option data-testid="note-option" value={5}>
                5
              </option>
            </select>
          </div>
          <button data-testid="button" onClick={onSubmit} type="button">
            Save
          </button>
        </form>
      </div>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Movie successfully changed !
          </Alert>
        </Snackbar>
        <Snackbar
          open={openWarning}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="warning">
            Please fill in all required fields!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default UpdateForm;
