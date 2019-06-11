import React from "react";
import axios from "axios";
import _ from "lodash";
import styles from "../styles/SearchForm.module.scss";
import { Context, AppActionInterface } from "./../Store";
import { MovieInterface, ResponseInterface } from "../types/interfaces";
import { __RouterContext } from "react-router";

export interface SearchFormProps {
  className: string;
}

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const SearchForm: React.SFC<SearchFormProps> = props => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const { state, dispatch } = React.useContext(Context);

  // hook to the router context
  // gives us access to the history, location, and match objects
  const routerContext = React.useContext(__RouterContext);

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value);
  };

  let config = {
    headers: {
      "X-RapidAPI-Host": `movie-database-imdb-alternative.p.rapidapi.com`,
      "X-RapidAPI-Key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`
    }
  };

  const handleSearchMovies = async (e: FormElem) => {
    e.preventDefault();

    // prepare the search query according to the API docs
    const query = searchInput.trim().split(" ");
    const queryString = query.reduce((a, b) => `${a}+${b}`);

    const url = `https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=${queryString}`;
    const response = await axios.get(url, config);
    const results = response.data;
    const movies = results.Search;
    setSearchInput("");

    // filter the movies without images
    const filteredMovies = movies.filter(
      (movie: MovieInterface) => movie.Poster !== "N/A"
    );

    dispatch({
      type: "SEARCH_MOVIE",
      payload: filteredMovies
    });

    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: searchInput
    });

    // redirect to the
    routerContext.history.push(`/search/${searchInput}`);
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
