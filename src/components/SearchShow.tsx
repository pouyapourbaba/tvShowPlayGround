import React, { useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { IShow, IResponse } from "../interfaces/interfaces";
import styles from "../styles/SearchShow.module.css";
import MovieCard from "./MovieCard";
import { Context, AppActionInterface } from "./../Store";

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const SearchShow = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { state, dispatch } = React.useContext(Context);

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value);
  };

  const toggleFavorite = (show: IShow): AppActionInterface => {
    if (state.favorites.includes(show)) {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: state.favorites.filter((s: IShow) => s.id !== show.id)
      });
    } else {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: [...state.favorites, show]
      });
    }
  };

  const handleSearchMovies = async (e: FormElem) => {
    e.preventDefault();

    const url = `http://api.tvmaze.com/search/shows?q=${searchInput}`;
    const response = await axios.get(url);
    const results = response.data;
    const movies = results.map((result: IResponse) => result.show);

    return dispatch({
      type: "SEARCH_MOVIE",
      payload: movies
    });
  };

  return (
    <div>
      <form onSubmit={handleSearchMovies} className={styles["search-form"]}>
        <input
          type="text"
          onChange={handleChange}
          value={searchInput}
          placeholder="Search tv shows.."
          required
        />
        <button type="submit">Search</button>
      </form>
      <MovieCard
        searchResult={state.movies}
        favorites={state.favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default SearchShow;
