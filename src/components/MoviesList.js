import { useSelector } from "react-redux";
import styles from "../styles/components/List.module.css";
import Card from "./Card";

const MoviesList = () => {
  const { items } = useSelector((state) => state.postReducer);

  const movies = items.map((item) => {
    return (
      <Card
        key={item.id}
        title={item.title}
        description={item.description}
        watched={item.watched}
        platform={item.platform}
        note={item.note}
        id={item.id}
      />
    );
  });
  return (
    <div className={styles.container}>
      <>{movies}</>
    </div>
  );
};

export default MoviesList;
