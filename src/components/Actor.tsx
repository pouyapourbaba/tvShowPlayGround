import * as React from "react";
import { Context } from "./../Store";
import { RouteComponentProps } from "react-router-dom";

type TParams = { index: string };

const Actor = (props: RouteComponentProps<TParams>) => {
  const { state } = React.useContext(Context);
  const actor = state.selectedMovieCast[props.match.params.index];
  console.log("actor ", actor);
  console.log("index", props)

  return <div>
      <div>{actor.person.name}</div>
      <img src={actor.person.image.original} alt=""/>
  </div>;
};

export default Actor;
