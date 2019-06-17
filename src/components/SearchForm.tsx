import React from "react";
import axios from "axios";
import styles from "../styles/SearchForm.module.scss";
import { Context } from "./../Store";
import { MovieInterface, ResponseInterface } from "../types/interfaces";
import { __RouterContext } from "react-router";

export interface SearchFormProps {
  className: string;
  searchFor: string;
  valueText: string;
}

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const SearchForm: React.SFC<SearchFormProps> = props => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const { dispatch } = React.useContext(Context);

  // hook to the router context
  // gives us access to the history, location, and match objects
  const routerContext = React.useContext(__RouterContext);

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value);
  };

  const handleSearchMovies = async (e: FormElem) => {
    e.preventDefault();

    const url = `https://api.tvmaze.com/search/${props.searchFor}?q=${searchInput}`;
    const response = await axios.get(url);
    const results = response.data;
    const movies = results.map((result: ResponseInterface) => result.show);
    setSearchInput("");

    // if (_.isEmpty(movies)) {
    //   console.log("<h3>No Movies Found...</h3>");
    // }

    // filter the movies without images
    const filteredMovies = movies.filter(
      (movie: MovieInterface) => movie.image !== null
    );
    // local storage
    // localStorage.setItem("movies", JSON.stringify(filteredMovies))

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
    <form onSubmit={handleSearchMovies} className={styles.form}>
      {/* <select className={styles.select}>
        <option value="shows">Movies</option>
        <option value="people">People</option>
      </select> */}
        <input
          className={styles.input}
          type="text"
          placeholder={props.valueText}
          onChange={handleChange}
          value={searchInput}
          required
        />
        <button type="submit" className={styles.button}>
          <i className="fa fa-search" />
        </button>
    </form>
  );
};

export default SearchForm;
