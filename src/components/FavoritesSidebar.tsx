import React from "react";
import { Context } from "../Store";
import { MovieInterface } from "../types/interfaces";
import styles from "../styles/FavoritesSidebar.module.css";
import { AppActionInterface } from './../Store';

console.log(styles)

const FavoritesSidebar = (): JSX.Element => {
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

  return (
    <div className={styles["sidebar-favorites"]}>
      {state.favorites.reverse().map((fav: MovieInterface) => (
        <div className={styles["sidebar-favorite-movie"]}>
          <div className={styles["sidebar-favorite-header"]}>
            <p>{fav.name}</p>
            <button type="button" onClick={() => toggleFavorite(fav)}><i className="fa fa-star"></i></button>
          </div>
          {fav.image && (
            <div className={styles["sidebar-moviecard-image"]}>
              <img src={fav.image.medium} alt="" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FavoritesSidebar;
