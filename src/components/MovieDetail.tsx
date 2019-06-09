import React from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import { RouteComponentProps } from "react-router-dom";
import { Context } from "./../Store";
import styles from "../styles/MovieDetail.module.css";

type TParams = { id: string };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  const { state, dispatch } = React.useContext(Context);
  const movie = state.selectedMovie;

  // If no movieis selected
  if (_.isEmpty(movie)) {
    props.history.replace("/");
    return <div />;
  }

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
