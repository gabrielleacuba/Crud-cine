import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/actions/movieActions";
import styles from "../styles/components/Card.module.css";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { FaRegTimesCircle } from "react-icons/fa";
import Link from "next/Link";

const Card = ({ title, description, watched, platform, note, id }) => {
  const dispatch = useDispatch();

  const watchedMovie = (watched) => {
    switch (watched) {
      case 0:
        return "/ticket.png";
      case 1:
        return "/ticket-black.png";
    }
  };
  const defineImages = (namePlatform) => {
    switch (namePlatform) {
      case "netflix":
        return "/netflix.svg";
      case "amazonPrime":
        return "/amazon-prime.svg";
      case "disneyPlus":
        return "/disney-plus.svg";
      case "youtube":
        return "/youtube.svg";
    }
  };

  const deleteCard = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer} style={{ background: "#000814" }}>
        <img src={defineImages(platform)} alt="Platform" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>
          <h3
            style={{
              color: "#f9f9f9",
              overflowWrap: "break-word",
              maxHeight: "5ch",
            }}
            data-testid={"title-card"}
          >
            {title}
          </h3>
        </div>
        <div className={styles.cardBody}>
          <p style={{ overflowWrap: "break-word", maxHeight: "5ch" }}>
            {description}
          </p>
        </div>
        <div className={styles.cardIcon}>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="read-only" value={note} readOnly size="small" />
          </Box>
          <img src={watchedMovie(watched)} alt="watched movie" />
        </div>
      </div>
      <button type="button" onClick={() => deleteCard(id)} data-testid={`btn-delete`}>
        <FaRegTimesCircle style={{ width: "25px" }} />
      </button>

      <ul className={styles.cardList}>
        <li>
          <Link href={`/movies/${id}`}>
            <h3>View More</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  watched: PropTypes.number.isRequired,
  platform: PropTypes.string.isRequired,
  note: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
export default Card;
