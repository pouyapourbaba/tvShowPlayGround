import React from "react";
import styles from "../styles/Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";

export interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = (): JSX.Element => {
  const toggleRef: React.RefObject<HTMLInputElement> = React.createRef();

  const toggleNavbar = () => {
    if (toggleRef.current) {
      toggleRef.current.checked = false;
    }
  };

  return (
    <div className={styles["nav-container"]}>
      <h1>
        <Link className={styles["brand"]} to="/">
          MoviEnd
        </Link>
      </h1>
      <input
        ref={toggleRef}
        type="checkbox"
        id="nav-toggle"
        className={styles["nav-toggle"]}
      />
      <nav>
        <ul>
          <li>
            <SearchForm className={styles["search"]} />
          </li>
          <li onClick={toggleNavbar}>
            <NavLink
              className={styles["nav-item"]}
              activeClassName="active"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li onClick={toggleNavbar}>
            <NavLink
              className={styles["nav-item"]}
              activeClassName="active"
              to="/favorites"
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className={styles["nav-toggle-label"]}>
        <span />
      </label>
    </div>
  );
};

export default Navbar;
