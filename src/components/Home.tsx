import * as React from "react";
import { Context } from "./../Store";
import styles from "../styles/Home.module.scss";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);

  return (
    <React.Fragment>
      <div className={styles["dev-info"]}>
        <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>
        <h1>Home</h1>
        <p>
          This is a project where the{" "}
          <a href="https://rapidapi.com/imdb/api/movie-database-imdb-alternative">
            Movie Database (IMDB Alternative) API{" "}
          </a>{" "}
          is used to fetch the data from.
        </p>
        <h3>The tools used to build this project:</h3>
        <ul>
          <li>React</li>
          <li>Context API</li>
          <li>TypeScript</li>
          <li>CSS modules</li>
          <li>SCSS</li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
