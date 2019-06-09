import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Context } from "./../Store";
import { IShow } from "../interfaces/interfaces";

type TParams = { id: string };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  const { state, dispatch } = React.useContext(Context);
  const id = parseInt(props.match.params.id);
  const movie = state.movies.find((movie: IShow) => movie.id == id)
 console.log("movie ", movie);
  return <div>Movie {movie.name}</div>;
};

export default MovieDetail;
