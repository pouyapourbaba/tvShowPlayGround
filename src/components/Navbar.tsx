import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
export interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = (): JSX.Element => {
  return (
    <nav className={styles["main-nav"]}>
      <h1><Link className={styles["brand"]} to ="/">MoviEnd</Link></h1>
      <div>
        <NavLink className={styles["nav-item"]} activeClassName="active" to="/">Home</NavLink>
        <NavLink className={styles["nav-item"]} activeClassName="active" to="/favorites">Favorites</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
