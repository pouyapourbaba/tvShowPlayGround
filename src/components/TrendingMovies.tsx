import * as React from "react";
import styles from "../styles/TrendingMovies.module.scss";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Context } from "./../Store";
import { ScheduleInterface, MovieInterface } from "../types/interfaces";
import ScrollArea from "react-scrollbar";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Sidebar from "./Sidebar";

export interface TrendingMoviesProps {}
// type FormElem = React.FormEvent<HTMLFormElement>;
// type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
// type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

const TrendingMovies: React.SFC<TrendingMoviesProps> = () => {
  const { state, dispatch } = React.useContext(Context);

  const selectRef: React.RefObject<HTMLSelectElement> = React.createRef();

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

  const handleFetchTrendingMovies = async (countryCode: string) => {
    const date = moment().format("YYYY-MM-DD");
    const response = await axios.get(
      `https://api.tvmaze.com/schedule?country=${countryCode}&date=${date}`
    );
    const schedule: ScheduleInterface[] = response.data;

    // remove the duplicated movies
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

    dispatch({
      type: "FETCH_SCHEDULE",
      payload: uniqueShcedules
    });

    let country: string = "";
    if (countryCode === "US") country = "USA";
    if (countryCode === "GB") country = "United Kingdoms";
    if (countryCode === "JP") country = "Japan";
    if (countryCode === "RU") country = "Russia";
    if (countryCode === "KR") country = "Korea";
    dispatch({
      type: "SET_COUNTRY",
      payload: country
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
    const country = state.country ? state.country : "US";
    handleFetchTrendingMovies(country);
  }, []);

  const { schedule } = state;

  // if (!trendingMovies) return <div></div>

  const sixUniqueSchedules = schedule.slice(0, 8);

  const totalSlides = schedule.length > 8 ? 8 : schedule.length;
  const visibleSlides = totalSlides > 4 ? 4 : totalSlides;

  if (_.isEmpty(schedule)) return <div />;
  return (
    <div className={styles["content"]}>
      <div className={styles["header"]}>
        <h2>Today's shows in</h2>
        <select
          className={styles.select}
          ref={selectRef}
          onChange={handleSUbmit}
        >
          <option value="US">USA</option>
          {/* <option value="AU">Austrailia</option> */}
          <option value="JP">Japan</option>
          <option value="KR">Korea, Republic of</option>
          <option value="RU">Russia</option>
          <option value="GB">UK</option>
        </select>
      </div>

      <div className={styles.carouselProvider}>
        <CarouselProvider
          naturalSlideWidth={75}
          naturalSlideHeight={110}
          totalSlides={totalSlides}
          visibleSlides={visibleSlides}
          className={styles.carouselProvider}
        >
          <div className={styles.sliderContainer}>
            <Slider>
              {sixUniqueSchedules.map(
                (movie: ScheduleInterface, index: number) => (
                  <Slide key={index} className={styles.slide} index={index}>
                    <Image
                      tag={"div"}
                      className={styles.image}
                      src={movie.show.image.original}
                      hasMasterSpinner={true}
                    />
                  </Slide>
                )
              )}
            </Slider>
            <ButtonBack className={styles.buttonBack}>
              <i className="fa fa-angle-left" />
            </ButtonBack>
            <ButtonNext className={styles.buttonNext}>
              <i className="fa fa-angle-right" />
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>

      <div className={styles.details}>
        <div className={styles.detailsMovies}>
          {sixUniqueSchedules.map((movie: ScheduleInterface) => (
            <div key={movie.show.id} className={styles.movie}>
              <div className={styles.detailsImage}>
                <Link
                  onClick={() => setSelectedMovie(movie.show)}
                  to={`/movie/${String(movie.id)}`}
                >
                  <img src={movie.show.image.original} alt="" />
                </Link>
              </div>
              <div className={styles.movieMain}>
                <div className={styles.detailsUp}>
                  <ScrollArea
                    speed={0.3}
                    className={styles.scrollbar}
                    contentClassName="content"
                    horizontal={false}
                  >
                    <div className={styles.detailsInfo}>
                      <div className={styles.titleAndStars}>
                        <Link
                          className={styles.title}
                          onClick={() => setSelectedMovie(movie.show)}
                          to={`/movie/${String(movie.id)}`}
                        >
                          <h2>{movie.show.name}</h2>
                        </Link>
                        <div className={styles.stars}>
                          {movie.show.rating.average !== null && (
                            <span
                              style={{
                                width: `${movie.show.rating.average * 10}%`
                              }}
                              className={styles["stars-rating"]}
                            />
                          )}
                        </div>
                      </div>
                      <p>Episode: {movie.name}</p>
                      {movie.summary && (
                        <p>Summary: {ReactHtmlParser(movie.summary)}</p>
                      )}
                      <p>Date: {movie.airdate}</p>
                      <p>
                        Time: {movie.airtime} (
                        {movie.show.network
                          ? movie.show.network.country.timezone
                          : "N/A"}{" "}
                        Timezone)
                      </p>
                    </div>
                  </ScrollArea>
                </div>
                <div className={styles.detailsBelow}>
                  <div>Premiered: {movie.show.premiered}</div>
                  <div>
                    {movie.show.genres.map((genre: any, index: number) => (
                      <span key={index} className={styles.genres}>
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
