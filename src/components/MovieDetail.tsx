import React from "react";
import _ from "lodash";
import moment from "moment";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { RouteComponentProps, Link } from "react-router-dom";
import { Context, AppActionInterface } from "./../Store";
import styles from "../styles/MovieDetail.module.scss";
import { CastInterface, MovieInterface } from "./../types/interfaces";
// import axios from "axios";

type TParams = { id: string };

const MovieDetail = (props: RouteComponentProps<TParams>) => {
  const { state, dispatch } = React.useContext(Context);

  const toggleFavorite = (movie: MovieInterface): AppActionInterface => {
    console.log(movie);
    if (state.favorites.includes(movie)) {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: state.favorites.filter(
          (s: MovieInterface) => s.id !== movie.id
        )
      });
    } else {
      return dispatch({
        type: "TOGGLE_FAVORITE",
        payload: [...state.favorites, movie]
      });
    }
  };

  const setSelectedMovie = async () => {
    const { id } = props.match.params;
    // fetch the movie
    const urlMovie = `https://api.tvmaze.com/shows/${id}`;
    const responseMovie = await axios.get(urlMovie);
    const resultsMovie = responseMovie.data;
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: resultsMovie
    });

    // fetch the cast
    const urlCast = `https://api.tvmaze.com/shows/${resultsMovie.id}/cast`;
    const responseCast = await axios.get(urlCast);
    const resultsCast: CastInterface = responseCast.data;

    // remove the duplicated casts
    function removeDuplicated(arr: any, key = "id") {
      const map = new Map();
      arr.map((el: any) => {
        if (!map.has(el.person[key])) {
          map.set(el.person[key], el);
        }
      });
      return Array.from(map.values());
    }
    const uniqueCasts = removeDuplicated(resultsCast);
 console.log("uniqueCasts ", uniqueCasts);

    dispatch({
      type: "SET_SELECTED_MOVIE_CAST",
      payload: uniqueCasts
    });
  };

  // fetch the movie and the cast when the page is reloaded
  if (_.isEmpty(state.selectedMovie)) {
    setSelectedMovie();
    return <div />;
  }

  const { selectedMovie: movie, selectedMovieCast: casts, favorites } = state;
  const cast = casts.length > 10 ? casts.slice(0, 10) : casts;
  // parse the premier year of the movie
  let year = moment(movie.premiered, "YYYY-MM-DD").year();

  // const relatedMovies = state.movies.filter((m: MovieInterface) => m !== movie);

  if (_.isEmpty(movie)) return <div>Loading data</div>;
  console.log("not initial cast",cast.map((cast: CastInterface) => cast.person));

  return (
    <div className={styles.content}>
      <div className={styles.movieImage}>
        <img src={movie.image.original} alt="" />
      </div>
      <div className={styles.movieInfo}>
        <div className={styles.movieTitle}>
          <span className={styles.title}>{movie.name}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <div className={styles.favorite}>
          <button
            type="button"
            title={
              favorites.includes(movie)
                ? "Remove from favories"
                : "Add to favorites"
            }
            style={
              favorites.includes(movie)
                ? {
                    color: "rgb(240, 188, 17)",
                    borderColor: "rgb(240, 188, 17)"
                  }
                : { color: "#fff" }
            }
            onClick={() => toggleFavorite(movie)}
          >
            <i className="fa fa-heart" />
          </button>
          <span className={styles.favoriteButtonText}>
            {favorites.includes(movie)
              ? "Remove from the favorites"
              : "Add to the favorites"}
          </span>
        </div>

        <div className={styles.summary}>{ReactHtmlParser(movie.summary)}</div>
        <div className={styles.cast}>
          <span className={styles.castHeading}>Cast</span>
          {_.isEmpty(cast) ? <div>Cast Information not available</div> : cast.map((cast: CastInterface) => (
            <div className={styles.castCard}>
              <div className={styles.castImage}>
                <img src={cast.person.image ? cast.person.image.original : "https://via.placeholder.com/150.jpg"} alt="" />
              </div>
              <div className={styles.castInfo}>
                <div>
                  <span className={styles.personName}>{cast.person.name}</span>{" "}
                  as{" "}
                  <span className={styles.characterName}>
                    {cast.character.name}
                  </span>
                </div>
                <div>
                  Birthday:{" "}
                  <span className={styles.birthday}>
                    {cast.person.birthday}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    //   <div className={styles["content"]}>
    //   <h1>{movie.name ? movie.name : "N/A"}</h1>
    //   <div className={styles["image-container"]}>
    //     <img src={movie.image.original} alt="" />
    //     <div className={styles["image-network"]}>
    //       {movie.network &&
    //         `${movie.network.name} - ${movie.network.country.name}`}
    //     </div>
    //   </div>
    //   <div className={styles["summary"]}>{ReactHtmlParser(movie.summary)}</div>
    //   <div>
    //     <h1 className={styles["cast-heading"]}>Cast</h1>
    //     {cast.map((cast: CastInterface, index: number) => (
    //       <div key={cast.person.id} className={styles["casts"]}>
    //         <div className={styles["cast-info-container"]}>
    //           <Link
    //             key={cast.person.id}
    //             to={`/actor/${index}`}
    //             className={styles["cast-info-title"]}
    //           >
    //             <p>{cast.person.name}</p>
    //           </Link>
    //           <div>
    //             <p>
    //               Character:{" "}
    //               <span className={styles["cast-info-bullet"]}>
    //                 {cast.character.name}
    //               </span>
    //             </p>
    //             <p>
    //               From:{" "}
    //               <span className={styles["cast-info-bullet"]}>
    //                 {cast.person.country && cast.person.country.name}
    //               </span>
    //             </p>
    //           </div>
    //         </div>
    //         <div className={styles["cast-image-container"]}>
    //           <Link
    //             key={cast.person.id}
    //             to={`/actor/${index}`}
    //             className={styles["cast-info-title"]}
    //           >
    //             <img
    //               src={cast.person.image && cast.person.image.original}
    //               alt=""
    //             />
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default MovieDetail;
