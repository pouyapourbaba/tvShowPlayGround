import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Context } from "../Store";
import { MovieInterface } from "../types/interfaces";
import styles from "../styles/Favorites.module.scss";
import { AppActionInterface } from "../Store";

const Favorites = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);
  const toggleFavorite = (show: MovieInterface): AppActionInterface => {
    if (state.favorites.includes(show)) {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: state.favorites.filter((s: MovieInterface) => s.id !== show.id)
      });
    } else {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: [...state.favorites, show]
      });
    }
  };

  if (state.favorites.length === 0)
    return <h3 className={styles["no-favs"]}>There are no favorite movies.</h3>;

  return (
    <div className={styles["favorites"]}>
      {state.favorites.reverse().map((fav: MovieInterface) => (
        <div className={styles["favorite-movie"]}>
          <div className={styles["favorite-header"]}>
            <h3>{fav.name}</h3>
            <p>Premiered on:<br/>{fav.premiered}</p>
            <p>Status:<br/>{fav.status}</p>
          </div>
          {fav.image && (
            <div className={styles["image"]}>
              <img src={fav.image.original} alt="" />
              <button type="button" onClick={() => toggleFavorite(fav)}>
                <i className="fa fa-star" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Favorites;
