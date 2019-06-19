import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MovieInterface } from "../types/interfaces";
import styles from "../styles/Movies.module.scss";
import { Context } from "../Store";

export interface MovieCardProps {
  searchResult: MovieInterface[];
  favorites: MovieInterface[];
  toggleFavorite?: any;
  searchQuery: string;
}

const MovieCard: React.SFC<MovieCardProps> = ({
  searchResult,
  favorites,
  toggleFavorite,
  searchQuery
}): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);

  const setSelectedMovie = async (movie: MovieInterface) => {
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: movie
    });

    const url = `https://api.tvmaze.com/shows/${movie.id}/cast`;
    const response = await axios.get(url);
    const results = response.data;

    dispatch({
      type: "SET_SELECTED_MOVIE_CAST",
      payload: results
    });
  };

  console.log("search", searchResult);

  return (
    <div className={styles.content}>
      <h2 className={styles["search-result-number"]}>
        {state.movies.length} results found for "
        {state.searchQuery || searchQuery}":{" "}
      </h2>
      <div className={styles["movies"]}>
        {searchResult.map((movie: MovieInterface) => (
          <div key={movie.id} className={styles["movie"]}>
            {movie.image && (
              <div className={styles["image"]}>
                <Link
                  onClick={() => setSelectedMovie(movie)}
                  to={`/movie/${String(movie.id)}`}
                >
                  <img src={movie.image.original} alt="" />
                </Link>
                <div className={styles["info"]}>
                  <p>{movie.name}</p>
                  <p>Status: {movie.status}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
