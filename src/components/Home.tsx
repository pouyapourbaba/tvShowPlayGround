import * as React from "react";
import { Context } from "./../Store";
import styles from "../styles/Home.module.scss"

export interface HomeProps {}

const Home: React.SFC<HomeProps> = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);
  
  return (<div className={styles["dev-info"]}>
    <h1>Home</h1>
    <p>This is a project where the <a href="https://www.tvmaze.com/api">TVmaze API</a> is used to fetch the data from.</p>
    <h3>The tools used to build this project:</h3>
    <ul>
      <li>React</li>
      <li>Context API</li>
      <li>TypeScript</li>
      <li>CSS modules</li>
      <li>SCSS</li>
    </ul>
  </div>);
};

export default Home;
