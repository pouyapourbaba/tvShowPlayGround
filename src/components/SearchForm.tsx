import React from "react";
import { RouteComponentProps } from "react-router-dom";
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

const SearchForm: React.SFC<SearchFormProps> = props => {
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
    // setSearchInput("");

    if (_.isEmpty(movies)) {
      console.log("<h3>No Movies Found...</h3>");
    }

    // filter the movies without images
    const filteredMovies = movies.filter(
      (movie: MovieInterface) => movie.image !== null
    );

    dispatch({
      type: "SEARCH_MOVIE",
      payload: filteredMovies
    });

    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: searchInput
    });

    // window.location.href = "/searched";
    // props.history.push("")
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
