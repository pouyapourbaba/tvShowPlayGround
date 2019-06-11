import React from "react";
import _ from "lodash";
import { RouteComponentProps, Link } from "react-router-dom";
import { Context } from "./../Store";
import styles from "../styles/MovieDetail.module.css";
import { MovieDetailInterface } from "./../types/interfaces";

type TParams = { id: any };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  const { state, dispatch } = React.useContext(Context);

  const movie: MovieDetailInterface = state.selectedMovie;
  const cast = movie.Actors;
  let castArray: string[] = [];
  if (cast !== undefined) {
    castArray = cast.split(", ");
    castArray = castArray.map(cast => cast.replace(" ", "-"))
  }
  

  // http://www.tvmaze.com/people/24483/jennifer-aniston
  return (
    <div className={styles["content"]}>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt="" />
      <div className={styles["summary"]}>
        <h3>Summary:</h3>
        <p>{movie.Plot}</p>
        <h3>Cast:</h3>
        {castArray.map((cast, index) => <Link key={index} to={`http://www.tvmaze.com/people/24483/${cast}`}>{cast}</Link>)}
        <h3>IMDb rating:</h3>
        <p>{movie.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
