import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "./App.module.scss";
import SearchShow from "./components/SearchShow";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import { AppContextProvider, AppContextInterface, reducer } from "./Store";
import "font-awesome/css/font-awesome.css";
import Actor from "./components/Actor";

const initialState: AppContextInterface = {
  movies: [],
  favorites: [],
  selectedMovie: {},
  selectedMovieCast: [],
  searchQuery: "",
  schedule: []
};

function App(): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // console.log("state ", state);

  return (
    <AppContextProvider value={{ state, dispatch }}>
      <div className={styles["App"]}>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/favorites" component={Favorites} />
            <Route path="/actor/:index" component={Actor} />
            <Route path="/search/:query" component={SearchShow} />
            <Route path="/movies" component={MovieDetail} />
            <Route exact path="/" component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <footer>
          <p>&copy; Pouya Pourbaba</p>
          <p>
            This website is powered by data from{" "}
            <a href="https://www.tvmaze.com/api">TVmaze API</a>.
          </p>
        </footer>
      </div>
    </AppContextProvider>
  );
}

export default App;
