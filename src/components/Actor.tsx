import * as React from "react";
import { Context } from "./../Store";
import { RouteComponentProps } from "react-router-dom";
import { CastInterface } from "./../types/interfaces";
import styles from "../styles/Actor.module.scss";

type TParams = { index: string };
// type TParams = { actor: CastInterface };
interface Props {
  actor: CastInterface;
  className: string;
}

const Actor = (props: RouteComponentProps<TParams>) => {
  // const Actor = (props: Props) => {
  const { state } = React.useContext(Context);
  const actor = state.selectedMovieCast[props.match.params.index];

  // actor localStorage
  // let cast: string | any = localStorage.getItem("selectedMovieCast");
  // cast = JSON.parse(cast);
  // const actor = cast[props.match.params.index];

  // actor from props
  // const actor = props.actor;

  return (
    <div className={styles["actor"]}>
      <h1>{actor.person.name}</h1>
      <div className={styles["image"]}>
        <img src={actor.person.image.original} alt="" />
      </div>
    </div>
  );
};

export default Actor;
