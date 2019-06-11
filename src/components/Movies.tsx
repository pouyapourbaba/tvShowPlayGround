import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MovieInterface } from "../types/interfaces";
import styles from "../styles/Movies.module.scss";
import { Context } from "../Store";
import FavoritesSidebar from "./Favorites";

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
  const setSelectedMovie = async (movie: MovieInterface) => {
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: movie
    });

    const url = `http://api.tvmaze.com/shows/${movie.id}/cast`;
    const response = await axios.get(url);
    const results = response.data;
    console.log("results ", results);

    dispatch({
      type: "SET_SELECTED_MOVIE_CAST",
      payload: results
    });
  };

  return (
    <React.Fragment>
      <p className={styles["search-result-number"]}>
        {state.movies.length} results found for "{state.searchQuery}":{" "}
      </p>
      <div className={styles["movies"]}>
        {searchResult.map((movie: MovieInterface) => (
          <div key={movie.id} className={styles["movie"]}>
            {movie.image && (
              <div className={styles["image"]}>
                <Link
                  to={`/movies/${movie.externals.imdb}`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img src={movie.image.original} alt="" />
                </Link>
                <div className={styles["info"]}>
                  <p>{movie.name}</p>
                  <p>Status: {movie.status}</p>
                </div>
                <button
                  type="button"
                  title={
                    favorites.includes(movie)
                      ? "Remove from favories"
                      : "Add to favorites"
                  }
                  style={
                    favorites.includes(movie)
                      ? { backgroundColor: "rgb(240, 188, 17)", color: "#000" }
                      : { backgroundColor: "#3d3d3d", color: "#fff" }
                  }
                  onClick={() => toggleFavorite(movie)}
                >
                  <i className="fa fa-star" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default MovieCard;
