import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "./App.module.scss";
import SearchShow from "./components/SearchShow";
import Home from "./components/Home";
import Favorites from "./components/FavoritesSidebar";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import { AppContextProvider, AppContextInterface, reducer } from "./Store";
import "font-awesome/css/font-awesome.css";

const initialState: AppContextInterface = {
  movies: [],
  favorites: [],
  selectedMovie: {},
  searchQuery: "",
  isSearchDone: false
};

function App(): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContextProvider value={{ state, dispatch }}>
      <div className={styles["App"]}>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/favorites" component={Favorites} />
            <Route path="/search/:query" component={SearchShow} />
            <Route path="/movies/:id" component={MovieDetail} />
            <Route exact path="/" component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <footer>
          <p>&copy; Pouya Pourbaba</p>
        </footer>
      </div>
    </AppContextProvider>
  );
}

export default App;
