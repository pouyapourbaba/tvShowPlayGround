import React from "react";
import _ from "lodash";
import axios from "axios";
import Movies from "./Movies";
import { Context, AppActionInterface } from "./../Store";
import { MovieInterface, ResponseInterface } from "../types/interfaces";
import { RouteComponentProps } from "react-router-dom";

type TParams = { query: string };

const SearchShow = (props: RouteComponentProps<TParams>): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);
  //  console.log("state ", state);

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

  const searchMovie = async (query: string) => {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;
    const response = await axios.get(url);
    const results = response.data;
    const movies = results.map((result: ResponseInterface) => result.show);

    // filter the movies without images
    const filteredMovies = movies.filter(
      (movie: MovieInterface) => movie.image !== null
    );

    dispatch({
      type: "SEARCH_MOVIE",
      payload: filteredMovies
    });
  };

  // when the pages reloads fetch the search results again
  if (_.isEmpty(state.movies)) searchMovie(props.match.params.query);

  return (
    <Movies
      searchResult={state.movies}
      favorites={state.favorites}
      toggleFavorite={toggleFavorite}
      searchQuery={props.match.params.query}
    />
  );
};

export default SearchShow;
