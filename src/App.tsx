import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styles from "./App.module.css";
import SearchShow from "./components/SearchShow";
import Favorites from "./components/Favorites";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className={styles["App"]}>
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route path="/favorites" component={Favorites} />
          <Route path="/movies/:id" component={MovieDetail} />
          <Route exact path="/" component={SearchShow} />
          <Redirect to="/not-found"/>
        </Switch>
      </main>
    </div>
  );
}

export default App;
