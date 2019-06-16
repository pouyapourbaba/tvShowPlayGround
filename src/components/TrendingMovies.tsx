import * as React from "react";
import styles from "../styles/TrendingMovies.module.scss";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { Context } from "./../Store";
import { ScheduleInterface } from "../types/interfaces";

export interface TrendingMoviesProps {}
type FormElem = React.FormEvent<HTMLFormElement>;
// type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

const TrendingMovies: React.SFC<TrendingMoviesProps> = () => {
  const { state, dispatch } = React.useContext(Context);

  const selectRef: React.RefObject<HTMLSelectElement> = React.createRef();

  const handleFetchTrendingMovies = async (countryCode: string) => {
    const date = moment().format("YYYY-MM-DD");
    const response = await axios.get(
      `http://api.tvmaze.com/schedule?country=${countryCode}&date=${date}`
    );
    const schedule: ScheduleInterface[] = response.data;
    dispatch({
      type: "FETCH_SCHEDULE",
      payload: schedule
    });
  };

  const handleSUbmit = async (e: ChangeEvent) => {
    e.preventDefault();
    if (selectRef.current) {
      handleFetchTrendingMovies(selectRef.current.value);
    }
  };

  React.useEffect(() => {
    // Default page shows schedule for USA
    handleFetchTrendingMovies("US");
  }, []);

  const { trendingMovies, schedule } = state;

  function removeDuplicated(arr: any, key = "id") {
    const map = new Map();
    arr.map((el: any) => {
      if (!map.has(el.show[key])) {
        map.set(el.show[key], el);
      }
    });
    return Array.from(map.values());
  }
  const uniqueShcedules = removeDuplicated(schedule);

  const sixUniqueSchedules = uniqueShcedules.slice(0, 6);

  if (_.isEmpty(schedule)) return <div />;
  return (
    <div className={styles["content"]}>
      <div className={styles["header"]}>
        Today's shows in
        <select ref={selectRef} onChange={handleSUbmit}>
          <option value="US">USA</option>
          <option value="AU">Austrailia</option>
          <option value="BE">Belgium</option>
          <option value="BR">Brazil</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="IN">India</option>
          <option value="JP">Japan</option>
          <option value="KR">Korea, Republic of</option>
          <option value="NL">Netherlands</option>
          <option value="RU">Russia</option>
          <option value="GB">UK</option>
          <option value="UA">Ukraine</option>
        </select>
        {/* <button onClick={handleSUbmit} type="button">
          <i className="fa fa-search" />
        </button> */}
      </div>
      <div className={styles["main"]}>
        {sixUniqueSchedules.map((movie: ScheduleInterface) => (
          <div key={movie.show.id} className={styles["movie"]}>
            <div
              className={`${styles["movieImageContainer"]} ${
                styles["img-hover-zoom--colorize"]
              }`}
            >
              <span className={styles["movieImageFrame"]}>
                {movie.show.image && (
                  <img src={movie.show.image.original} alt={movie.show.name} />
                )}
              </span>
            </div>
            <div className={styles["title"]}>{movie.show.name}</div>
          </div>
        ))}
      </div>
      <div className={styles["aside"]}>
        {sixUniqueSchedules.map(movie => (
          <div className={styles["episodeInfo"]}>
            <p>{movie.show.name}</p>
            <p>episode: {movie.name}</p>
            <p>date: {movie.airdate}</p>
            <p>
              time: {movie.airtime} (
              {movie.show.network ? movie.show.network.country.timezone : "N/A"}{" "}
              timezone)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
