import * as React from "react";
import styles from "../styles/Home.module.scss";
import TrendingMovies from "./TrendingMovies";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = (): JSX.Element => {
  return (
    <div className={styles["dev-info"]}>
      <TrendingMovies />
    </div>
  );
};

export default Home;
