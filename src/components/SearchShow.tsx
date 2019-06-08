import React, { useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { IShow, IResponse } from "../interfaces/interfaces";
import styles from "../styles/SearchShow.module.css";

type FormElem = React.FormEvent<HTMLFormElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const SearchShow = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IShow[]>([]);
  const [favorites, setFavorite] = useState<IShow[]>([]);

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e: FormElem) => {
    e.preventDefault();
    const url = `http://api.tvmaze.com/search/shows?q=${searchInput}`;
    const res = await axios.get(url);
    const shows = res.data;
    const justShows = shows.map((show: IResponse) => show.show);
    setSearchResult(justShows);
    setSearchInput("");
  };

  const toggleFavorite = (show: IShow): void => {
    if(favorites.includes(show)) setFavorite(favorites.filter(s => s.id !== show.id))
    else setFavorite([...favorites, show])
    
  };

  console.log(searchResult);
  console.log(favorites)
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
        {searchResult.map((show: IShow) => (
          <div key={show.id} className={styles["search-result"]}>
            <section className={styles["information"]}>
              <div className={styles["title-favorite"]}>
                <h3>{show.name}</h3>
                <button type="button" style={favorites.includes(show) ? {backgroundColor: "rgb(122, 244, 66)"} : {backgroundColor: "white"}} onClick={() => toggleFavorite(show)}>
                  Favorite
                </button>
              </div>
              {show.rating.average ? (
                <h4>Rating: {show.rating.average}</h4>
              ) : (
                <h4>Status: {show.status}</h4>
              )}
            </section>
            {show.image && (
              <div className="image">
                <img src={show.image.medium} alt="" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchShow;
