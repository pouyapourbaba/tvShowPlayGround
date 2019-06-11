import * as React from "react";
import { Context } from "./../Store";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Context);
  
//   (state.movies.length)
  return (<h1>Home</h1>);
};

export default Home;
