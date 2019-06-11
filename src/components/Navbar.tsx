import React from "react";
import styles from "../styles/Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import image from "../images/the-theatre.png";

export interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className={styles["nav-container"]}>
        <h1>
          <Link className={styles["brand"]} to="/">
            MoviEnd
          </Link>
        </h1>
        <input
          type="checkbox"
          id="nav-toggle"
          className={styles["nav-toggle"]}
        />
        <nav>
          <ul>
            <li>
              <SearchForm className={styles["search"]} />
            </li>
            <li>
              <NavLink
                className={styles["nav-item"]}
                activeClassName="active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
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
      {/* <div className={styles["image-header"]}>
        <img src={image} alt="" />
      </div> */}
    </React.Fragment>
  );
};

export default Navbar;
