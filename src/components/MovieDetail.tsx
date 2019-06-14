import React from "react";
import ReactHtmlParser from "react-html-parser";
import { RouteComponentProps, Link } from "react-router-dom";
import { Context } from "./../Store";
import styles from "../styles/MovieDetail.module.scss";
import { CastInterface, MovieInterface } from "./../types/interfaces";
import axios from "axios";
import Actor from "./Actor";

type TParams = { id: any };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  const { state, dispatch } = React.useContext(Context);

  const movie = state.selectedMovie;
  const cast = state.selectedMovieCast;
  const relatedMovies = state.movies.filter((m: MovieInterface) => m !== movie)
  const [currentSlide, setCurrentSlide] = React.useState({
    movie: relatedMovies[0],
    index: 0
  });

  // localstorage
  // let movies: string | any = localStorage.getItem("movies");
  // movies = JSON.parse(movies);
  // let movie: string | any = localStorage.getItem("selectedMovie");
  // movie = JSON.parse(movie);
  // console.log("movie ", movie);
  // let cast: string | any = localStorage.getItem("selectedMovieCast");
  // cast = JSON.parse(cast);
  // console.log("cast ", cast);
  // let relatedMovies = movies.filter((m: MovieInterface) => m !== movie);
  // relatedMovies = relatedMovies.slice(0, 3);
  // console.log("relatedMovies ", relatedMovies);
  // const [currentSlide, setCurrentSlide] = React.useState({
  //   movie: relatedMovies[0],
  //   index: 0
  // });
  // console.log("currentSlide ", currentSlide);

  const handleNextSlide = () => {
    if (currentSlide.index >= state.movies.length - 1) return null;
    const nextIndex = currentSlide.index + 1;
    const nextSlide = {
      movie: state.movies[nextIndex],
      index: nextIndex
    };
    setCurrentSlide(nextSlide);
  };

  const handlePreviousSlide = () => {
    if (currentSlide.index <= 0) return null;
    const previousIndex = currentSlide.index - 1;
    const previousSlide = {
      movie: state.movies[previousIndex],
      index: previousIndex
    };
    setCurrentSlide(previousSlide);
  };

  const setSelectedMovie = async (movie: MovieInterface) => {
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: movie
    });

    // localStorage.setItem("selectedMovie", JSON.stringify(movie))

    const url = `http://api.tvmaze.com/shows/${movie.id}/cast`;
    const response = await axios.get(url);
    const results = response.data;
    console.log("results ", results);

    dispatch({
      type: "SET_SELECTED_MOVIE_CAST",
      payload: results
    });

    // localStorage.setItem("selectedMovieCast", JSON.stringify(results))

  };

  return (
    <div className={styles["content"]}>
      <h1>{movie.name ? movie.name : "N/A"}</h1>
      <div className={styles["image-container"]}>
        <img src={movie.image.original} alt="" />
        <div className={styles["image-network"]}>
          {movie.network  && `${movie.network.name} - ${movie.network.country.name}`}
          
        </div>
      </div>
      <div className={styles["summary"]}>{ReactHtmlParser(movie.summary)}</div>
      <div>
        <h1 className={styles["cast-heading"]}>Cast</h1>
        {cast.map((cast: CastInterface, index: number) => (
          <div key={cast.person.id} className={styles["casts"]}>
            <div className={styles["cast-info-container"]}>
              <Link
                key={cast.person.id}
                to={`/actor/${index}`}
                className={styles["cast-info-title"]}
              >
                <p>{cast.person.name}</p>
              </Link>
              <div>
                <p>
                  Character:{" "}
                  <span className={styles["cast-info-bullet"]}>
                    {cast.character.name}
                  </span>
                </p>
                <p>
                  From:{" "}
                  <span className={styles["cast-info-bullet"]}>
                    {cast.person.country && cast.person.country.name}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles["cast-image-container"]}>
            <Link
                key={cast.person.id}
                to={`/actor/${index}`}
                className={styles["cast-info-title"]}
              >
              <img src={cast.person.image && cast.person.image.original} alt="" />
            </Link>
            </div>
          </div>
        ))}
      {/* </div>
        <h1>Realated movies</h1>
      <div className={styles["related-movies"]}>
        {relatedMovies.map((movie: MovieInterface) => {
          return movie.image && (
            <div className={styles["related-movie"]}>
              <Link
                to={`/movies/${movie.externals.imdb}`}
                onClick={() => setSelectedMovie(movie)}
              >
                <img src={movie.image.original} alt="" />
              </Link>
              <div className={styles["info"]}>
                <p>{movie.name}</p>
              </div>
            </div>
          );
        })} */}
        {/* <img src={currentSlide.movie.image.medium} alt="" /> */}
        {/* <button onClick={() => handlePreviousSlide()}>previos</button>
        <button onClick={() => handleNextSlide()}>next</button> */}
      </div>
    </div>
  );
};

export default MovieDetail;
