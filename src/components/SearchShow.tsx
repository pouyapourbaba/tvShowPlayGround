import React, { useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { IShow } from "../interfaces/interfaces";
import styles from "../styles/SearchShow.module.css";

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const SearchShow = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e: FormElem) => {
    e.preventDefault();
    const url = `http://api.tvmaze.com/search/shows?q=${searchInput}`;
    const res = await axios.get(url);
    const shows = res.data;
    setSearchResult(shows);
    setSearchInput("");
  };
  console.log(searchResult);
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles["search-form"]}>
        <input
          type="text"
          onChange={handleChange}
          value={searchInput}
          placeholder="Search tv shows.."
          required
        />
        <button type="submit">Search</button>
      </form>
      <div className={styles["search-results"]}>
        {searchResult.map((res: IShow) => (
          <div key={res.show.id} className={styles["search-result"]}>
            <section className={styles["information"]}>
              <h3>{res.show.name}</h3>
              {/* <h4>Genres: </h4>{res.show.genres.map(genre => <span>{genre}</span>)} */}
              <h4>Rating: {res.show.rating.average}</h4>
              {/* <h4>Language: {res.show.language}</h4> */}
              {/* {ReactHtmlParser(res.show.summary)} */}
            </section>
            {res.show.image && (
              <div className="image">
                <img src={res.show.image.medium} alt="" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchShow;
