import React from "react";
import _ from "lodash";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { RouteComponentProps } from "react-router-dom";
import { Context } from "./../Store";
import styles from "../styles/MovieDetail.module.css";

type TParams = { id: any };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  const { state } = React.useContext(Context);
  const movie = state.selectedMovie;

  const getMovieDetailByImdbId = async (id: string) => {
    const url = `http://api.tvmaze.com/lookup/shows?imdb=${id}`;
    const response = await axios.get(url);
    const results = response.data;
  };

  getMovieDetailByImdbId(props.match.params.id)

  return (
    <div className={styles["content"]}>
      <h1>{movie.name}</h1>
      <img src={movie.image.original} alt="" />
      <div className={styles["summary"]}>
        <h3>Summary:</h3>
        {ReactHtmlParser(movie.summary)}
      </div>
    </div>
  );
};

export default MovieDetail;
