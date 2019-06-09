import React from "react";
import { RouteComponentProps } from "react-router-dom";

type TParams = { id: string };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  return <div>Movie {props.match.params.id}</div>;
};

export default MovieDetail;
