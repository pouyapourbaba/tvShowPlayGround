import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MovieInterface } from "../types/interfaces";
import styles from "../styles/Movies.module.scss";
import { Context } from "../Store";

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
  
  const getMovieDetailByImdbId = async (id: string) => {
    let config = {
      headers: {
        "X-RapidAPI-Host": "movie-database-imdb-alternative.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`
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
  
  return (
    <React.Fragment>
      <p className={styles["search-result-number"]}>{state.movies.length} results found for "{state.searchQuery}": </p>
      <div className={styles["movies"]}>
        {searchResult.map((movie: MovieInterface) => (
          <div key={movie.imdbID} className={styles["movie"]}>
            {movie.Poster && (
              <div className={styles["image"]}>
                <Link
                  to={`/movies/${movie.imdbID}`}
                  onClick={() => getMovieDetailByImdbId(movie.imdbID)}
                >
                  <img src={movie.Poster} alt="" />
                </Link>
                <div className={styles["info"]}>
                  <p>{movie.Title}</p>
                  <p>Type: {movie.Type}</p>
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
        {/* <div
          className={styles["favorites-sidebar"]}
          style={favorites.length === 0 ? { display: "none" } : {}}
        >
          <FavoritesSidebar />
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default MovieCard;

{
  /* <section className={styles["information"]}>
            <div className={styles["title-favorite"]}>
              <h3>
                <Link
                  to={`/movies/${movie.id}`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  {movie.name}
                </Link>
              </h3>
              <button
                type="button"
                title={favorites.includes(movie) ? "Remove from favories" : "Add to favorites"}
                style={
                  favorites.includes(movie)
                    ? { backgroundColor: "#3d3d3d", color: "#fff" }
                    : { backgroundColor: "white" }
                }
                onClick={() => toggleFavorite(movie)}
              >
                <i className="fa fa-star" />
              </button>
            </div>
            {movie.rating.average ? (
              <h4>Rating: {movie.rating.average}</h4>
            ) : (
              <h4>Status: {movie.status}</h4>
            )}
          </section> */
}
