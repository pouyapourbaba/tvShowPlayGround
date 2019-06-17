import * as React from "react";
import styles from "../styles/Sidebar.module.scss";
import { Context } from "./../Store";
import { ScheduleInterface, MovieInterface } from "../types/interfaces";
// import { __RouterContext } from "react-router";

export interface SidebarProps {}

const Sidebar: React.SFC<SidebarProps> = props => {
  type FormElem = React.FormEvent<HTMLFormElement>;
  type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

  const [searchInput, setSearchInput] = React.useState<string>("");
  const { state } = React.useContext(Context);

  // hook to the router context
  // gives us access to the history, location, and match objects
  // const routerContext = React.useContext(__RouterContext);

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
        {networkList.map(network => {
          return (
            <div className={styles.eachNetwork}>
              <div className={styles.netowrkTitle}>
                <p>{network}</p>
              </div>
              {scheduleBasedOnNetwork[network].map((movie: MovieInterface) => (
                <div key={movie.id} className={styles.networkDetails}>
                  <p className={styles.time}>{movie.schedule.time}</p>
                  <p className={styles.name}>{movie.name}</p>
                </div>
              ))}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Sidebar;
