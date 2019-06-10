import React from "react";
import styles from "../styles/SearchForm.module.scss";

export interface SearchFormProps {
  className: string;
}

const SearchForm: React.SFC<SearchFormProps> = () => {
  return (
    <form className={styles["form"]}>
      <input type="text" placeholder="Search tv shows.." required />
      <button type="submit"><i className="fa fa-search"></i></button>
    </form>
  );
};

export default SearchForm;
