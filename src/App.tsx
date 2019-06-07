import React from "react";
import axios from "axios";
import SearchShow from "./components/SearchShow";

function App() {
  const url = " http://api.tvmaze.com/search/shows?q=peaky";

  const fetchShows = async () => {
    const res = await axios.get(url);
    const shows = res.data
    // shows.map(show => console.log("shows ", show.show.name))
    
  };

  fetchShows()
  return (
    <div className="App">
      <h1>Shows</h1>
      <SearchShow></SearchShow>
    </div>
  );
}

export default App;
