import React from "react";
import { Context } from "../Store";
import { Link } from "react-router-dom";
import axios from "axios";
import { MovieInterface } from "../types/interfaces";
import styles from "../styles/Favorites.module.scss";
import { AppActionInterface } from "../Store";

const Favorites = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);
  const toggleFavorite = (show: MovieInterface): AppActionInterface => {
    if (state.favorites.includes(show)) {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: state.favorites.filter(
          (s: MovieInterface) => s.imdbID !== show.imdbID
        )
      });
    } else {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: [...state.favorites, show]
      });
    }
  };

  const getMovieDetailByImdbId = async (id: string) => {
    let config = {
      headers: {
        "X-RapidAPI-Host": "movie-database-imdb-alternative.p.rapidapi.com",
        "X-RapidAPI-Key": "395d6fd90bmsh3d8f2123d3444dbp1b8d60jsn1aad3b30c0ff"
      }
    };

    const url = `https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}&r=json`;
    const response = await axios.get(url, config);
    const movie = await response.data;

    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: movie
    });
  };

  if (state.favorites.length === 0)
    return <h3 className={styles["no-favs"]}>There are no favorite movies.</h3>;

  return (
    <div className={styles["favorites"]}>
      {state.favorites.reverse().map((fav: MovieInterface) => (
        <div className={styles["favorite-movie"]} key={fav.imdbID}>
          <div className={styles["favorite-header"]}>
          <Link
                to={`/movies/${fav.imdbID}`}
                onClick={() => getMovieDetailByImdbId(fav.imdbID)}
              >
            <h3>{fav.Title}</h3>
            </Link>
            <h3>Type:</h3>
            <p>{fav.Type}</p>
          </div>
          {fav.Poster && (
            <div className={styles["image"]}>
              <Link
                to={`/movies/${fav.imdbID}`}
                onClick={() => getMovieDetailByImdbId(fav.imdbID)}
              >
                <img src={fav.Poster} alt="" />
              </Link>
              <button type="button" onClick={() => toggleFavorite(fav)}>
                <i className="fa fa-star" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Favorites;
