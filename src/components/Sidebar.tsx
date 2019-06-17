import * as React from "react";
import axios from "axios";
import styles from "../styles/Sidebar.module.scss";
import { Link } from "react-router-dom";
import { Context } from "./../Store";
import { ScheduleInterface, MovieInterface } from "../types/interfaces";
// import { __RouterContext } from "react-router";
import ScrollArea from "react-scrollbar";

export interface SidebarProps {}

const Sidebar: React.SFC<SidebarProps> = props => {
  type FormElem = React.FormEvent<HTMLFormElement>;
  type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

  const [searchInput, setSearchInput] = React.useState<string>("");
  const { state, dispatch } = React.useContext(Context);

  // hook to the router context
  // gives us access to the history, location, and match objects
  // const routerContext = React.useContext(__RouterContext);

  const setSelectedMovie = async (movie: MovieInterface) => {
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: movie
    });

    const url = `https://api.tvmaze.com/shows/${movie.id}/cast`;
    const response = await axios.get(url);
    const results = response.data;

    dispatch({
      type: "SET_SELECTED_MOVIE_CAST",
      payload: results
    });
  };

  const handleChange = (e: ChangeEvent): void => {
    setSearchInput(e.target.value);
  };

  const handleSearchMovies = async (e: FormElem) => {
    // e.preventDefault();
    // const url = `https://api.tvmaze.com/search/people?q=${searchInput}`;
    // const response = await axios.get(url);
    // const results = response.data;
    // const movies = results.map((result: ResponseInterface) => result.show);
    // setSearchInput("");
    // // if (_.isEmpty(movies)) {
    // //   console.log("<h3>No Movies Found...</h3>");
    // // }
    // // filter the movies without images
    // const filteredMovies = movies.filter(
    //   (movie: MovieInterface) => movie.image !== null
    // );
    // // local storage
    // // localStorage.setItem("movies", JSON.stringify(filteredMovies))
    // dispatch({
    //   type: "SEARCH_MOVIE",
    //   payload: filteredMovies
    // });
    // dispatch({
    //   type: "SET_SEARCH_QUERY",
    //   payload: searchInput
    // });
    // // redirect to the
    // routerContext.history.push(`/search/${searchInput}`);
  };

  // sort the shows based on the Network
  const { schedule, country } = state;
  const scheduleBasedOnNetwork: any = {};
  schedule.forEach((movie: ScheduleInterface) => {
    if (movie.show.network !== null) {
      const network = movie.show.network.name;
      if (scheduleBasedOnNetwork.hasOwnProperty(network))
        scheduleBasedOnNetwork[network] = [
          ...scheduleBasedOnNetwork[network],
          movie.show
        ];
      else scheduleBasedOnNetwork[network] = [movie.show];
    }
  });

  // the list of networks
  const networkList = Object.keys(scheduleBasedOnNetwork);

  return (
    <div className={styles.sidebar}>
      <div className={styles.searchPeople}>
        <h2>Quick Search</h2>
        <form onSubmit={handleSearchMovies} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search for People.."
            onChange={handleChange}
            value={searchInput}
            required
          />
          <button type="submit" className={styles.button}>
            <i className="fa fa-search" />
          </button>
        </form>
      </div>

      <section className={styles.scheduleBasedOnNetwork}>
        <h2>Scheduled for today in {country}</h2>
        <ScrollArea
          speed={0.3}
          className="area"
          contentClassName="content"
          horizontal={false}
        >
          {networkList.map(network => {
            return (
              <div className={styles.eachNetwork}>
                <div className={styles.netowrkTitle}>
                  <span>{network}</span>
                </div>
                {scheduleBasedOnNetwork[network].map(
                  (movie: MovieInterface) => (
                    <div key={movie.id} className={styles.networkDetails}>
                      <span className={styles.time}>{movie.schedule.time}</span>

                      <span className={styles.name}>
                        <Link
                          onClick={() => setSelectedMovie(movie)}
                          to={`/movie/${String(movie.id)}`}
                          className={styles.link}
                        >
                          {movie.name}
                        </Link>
                      </span>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </ScrollArea>
      </section>
    </div>
  );
};

export default Sidebar;
