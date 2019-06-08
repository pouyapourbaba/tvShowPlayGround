import React from "react";
import SearchShow from "./components/SearchShow";
import Favorites from "./components/Favorites";
import styles from "./App.module.css";
import { Switch, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";


function App() {
  return (
    <div className={styles["App"]}>
      <header>
        <h1>Search for TV Shows</h1>
      </header>
      <main>
        <Switch>
          <Route path="/favorites" component={Favorites} />
          <Route path="/movie" component={MovieDetail} />
          <Route exact path="/" component={SearchShow}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;
