import * as React from "react";
import Navbar from "./Navbar";
// import styles from "../styles/Header.module.css"

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
  return (
    <header>
      <Navbar />
    </header>
  );
};

export default Header;
