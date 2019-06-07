import React from "react";
import SearchShow from "./components/SearchShow";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles["App"]}>
      <header>
        <h1>Search for TV Shows</h1>
      </header>
      <main>
        <SearchShow />
      </main>
    </div>
  );
}

export default App;
