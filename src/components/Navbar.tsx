import React from "react";
import styles from "../styles/Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";

const Navbar: React.SFC = (): JSX.Element => {
  const toggleRef: React.RefObject<HTMLInputElement> = React.createRef();

  const toggleNavbar = () => {
    if (toggleRef.current) {
      toggleRef.current.checked = false;
    }
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navUp}>
        <div className={styles.navUpBrand}>
          <Link className={styles.link} to="/">MoviEnd</Link>
        </div>
        <div className={styles.navUpSocialMediaIcons}>
          <a href="#">
            <i className="fa fa-github" />
          </a>
          <a href="#">
            <i className="fa fa-twitter" />
          </a>
          <a href="#">
            <i className="fa fa-linkedin" />
          </a>
        </div>
      </div>
      <div className={styles.navBelow}>
        <div className={styles.navBelowSearch}>
          <SearchForm className={styles["search"]} valueText={"Search for TV Shows and Movies.."} searchFor={"shows"}/>
        </div>
        <nav className={styles.navBelowLinks}>
          <ul>
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
      </div>

      {/* <div className={styles["nav-container"]}>
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
    </div> */}
    </div>
  );
};

export default Navbar;
