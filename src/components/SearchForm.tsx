import React from "react";
import styles from "../styles/SearchShow.module.css";

export interface SearchFormProps {}

const SearchForm: React.SFC<SearchFormProps> = () => {
  return (
    <form className={styles["search-form"]}>
      <input
        type="text"
        placeholder="Search tv shows.."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
