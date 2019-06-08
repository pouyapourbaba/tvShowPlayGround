import React from "react";
import { IShow } from "../interfaces/interfaces";
import styles from "../styles/MovieCard.module.css";

export interface MovieCardProps {
  searchResult: IShow[];
  favorites: IShow[];
  toggleFavorite: any
}

const MovieCard: React.SFC<MovieCardProps> = ({
  searchResult,
  favorites,
  toggleFavorite
}): JSX.Element => {
  
  return (
    <div className={styles["movies"]}>
      {searchResult.map((show: IShow) => (
        <div key={show.id} className={styles["movie"]}>
          <section className={styles["information"]}>
            <div className={styles["title-favorite"]}>
              <h3>{show.name}</h3>
              <button
                type="button"
                style={
                  favorites.includes(show)
                    ? { backgroundColor: "rgb(122, 244, 66)" }
                    : { backgroundColor: "white" }
                }
                onClick={() => toggleFavorite(show)}
              >
                Favorite
              </button>
            </div>
            {show.rating.average ? (
              <h4>Rating: {show.rating.average}</h4>
            ) : (
              <h4>Status: {show.status}</h4>
            )}
          </section>
          {show.image && (
            <div className="image">
              <img src={show.image.medium} alt="" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
