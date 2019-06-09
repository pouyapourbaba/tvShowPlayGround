import React from "react";
import { Link } from "react-router-dom";
import { MovieInterface } from "../types/interfaces";
import styles from "../styles/MovieCard.module.css";
import { Context } from "./../Store";
import FavoritesSidebar from "./FavoritesSidebar";

export interface MovieCardProps {
  searchResult: MovieInterface[];
  favorites: MovieInterface[];
  toggleFavorite: any;
}

const MovieCard: React.SFC<MovieCardProps> = ({
  searchResult,
  favorites,
  toggleFavorite
}): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);
  const setSelectedMovie = (show: MovieInterface) => {
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: show
    });
  };

  return (
    <div className={styles["content"]}>
      <div className={styles["movies"]}>
        {searchResult.map((show: MovieInterface) => (
          <div key={show.id} className={styles["movie"]}>
            <section className={styles["information"]}>
              <div className={styles["title-favorite"]}>
                <h3>
                  <Link
                    to={`/movies/${show.id}`}
                    onClick={() => setSelectedMovie(show)}
                  >
                    {show.name}
                  </Link>
                </h3>
                <button
                  type="button"
                  style={
                    favorites.includes(show)
                      ? { backgroundColor: "#3d3d3d", color: "#fff" }
                      : { backgroundColor: "white" }
                  }
                  onClick={() => toggleFavorite(show)}
                >
                  <i className="fa fa-star" />
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
                <Link
                  to={`/movies/${show.id}`}
                  onClick={() => setSelectedMovie(show)}
                >
                  <img src={show.image.medium} alt="" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={styles["favorites-sidebar"]}
        style={favorites.length === 0 ? { display: "none" } : { } }
      >
        <FavoritesSidebar />
      </div>
    </div>
  );
};

export default MovieCard;
