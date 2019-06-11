import React from "react";
import ReactHtmlParser from "react-html-parser";
import { RouteComponentProps, Link } from "react-router-dom";
import { Context } from "./../Store";
import styles from "../styles/MovieDetail.module.scss";
import { CastInterface, MovieInterface } from "./../types/interfaces";
import axios from "axios"

type TParams = { id: any };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  const { state } = React.useContext(Context);
  const movie = state.selectedMovie;
  const cast = state.selectedMovieCast;
  const relatedMovies = state.movies.filter((m: MovieInterface) => m !== movie)
  console.log("cast ", cast);

  return (
    <div className={styles["content"]}>
      <h1>{movie.name}</h1>
      <img src={movie.image.original} alt="" />
      <div className={styles["summary"]}>
        {ReactHtmlParser(movie.summary)}
        <h3>Cast</h3>
        {cast.map((cast: CastInterface, index: number) => (
          <Link
            className={styles["cast-link"]}
            key={cast.person.id}
            to={`/actor/${index}`}
          >
            {cast.person.name},{" "}
          </Link>
        ))}
      </div>
      Realated searches:
      <ul>
      {relatedMovies.map((movie: MovieInterface) => <li>{movie.name}</li>)}
      </ul>
    </div>
  );
};

export default MovieDetail;
