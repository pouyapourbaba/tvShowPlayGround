import React from "react";
import _ from "lodash";
import { MovieInterface, ResponseInterface } from "../types/interfaces";
import Movies from "./Movies";
import { Context, AppActionInterface } from "./../Store";


const SearchShow = (): JSX.Element => {
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
      <Movies
        searchResult={state.movies}
        favorites={state.favorites}
        toggleFavorite={toggleFavorite}
      />
  );
};

export default SearchShow;
