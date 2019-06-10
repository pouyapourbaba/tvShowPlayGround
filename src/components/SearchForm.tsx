import React from "react";
import axios from "axios";
import _ from "lodash";
import styles from "../styles/SearchForm.module.scss";
import { Context, AppActionInterface } from "./../Store";
import { MovieInterface, ResponseInterface } from "../types/interfaces";

export interface SearchFormProps {
  className: string;
}

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const SearchForm: React.SFC<SearchFormProps> = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const { state, dispatch } = React.useContext(Context);

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value);
  };

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

  const handleSearchMovies = async (e: FormElem) => {
    e.preventDefault();

    const url = `http://api.tvmaze.com/search/shows?q=${searchInput}`;
    const response = await axios.get(url);
    const results = response.data;
    const movies = results.map((result: ResponseInterface) => result.show);
    setSearchInput("");

    if (_.isEmpty(movies)) {
      console.log("<h3>No Movies Found...</h3>");
    }

    return dispatch({
      type: "SEARCH_MOVIE",
      payload: movies
    });
  };

  return (
    <form onSubmit={handleSearchMovies} className={styles["form"]}>
      <input
        type="text"
        placeholder="Search tv shows.."
        onChange={handleChange}
        value={searchInput}
        required
      />
      <button type="submit">
        <i className="fa fa-search" />
      </button>
    </form>
  );
};

export default SearchForm;
