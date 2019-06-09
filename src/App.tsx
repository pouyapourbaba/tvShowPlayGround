import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "./App.module.css";
import SearchShow from "./components/SearchShow";
import Favorites from "./components/Favorites";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import {
  Context,
  AppContextProvider,
  AppContextInterface,
  reducer
} from "./Store";

const initialState: AppContextInterface = {
  movies: [],
  favorites: []
};

function App(): JSX.Element {
  // const {state, dispatch} = React.useContext(Context);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state);
  return (
    <AppContextProvider value={{ state, dispatch }}>
      <div className={styles["App"]}>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/favorites" component={Favorites} />
            <Route path="/movies/:id" component={MovieDetail} />
            <Route exact path="/" component={SearchShow} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    </AppContextProvider>
  );
}

export default App;
