import React from "react";
import { MovieInterface } from "./types/interfaces";

export interface AppContextInterface {
    movies: MovieInterface[] | [];
    favorites: [];
    selectedMovie: any;
    searchQuery: string;
    selectedMovieCast: [];
}

export interface AppActionInterface {
    type: string;
    payload: any;
}

const initialState: AppContextInterface = {
    movies: [],
    favorites: [],
    selectedMovie: {},
    selectedMovieCast: [],
    searchQuery: ""
}

export const Context = React.createContext<AppContextInterface | any>(initialState);

export const AppContextProvider = Context.Provider;
export const AppContextConsumer = Context.Consumer;

export const reducer = (state: AppContextInterface, action: AppActionInterface): AppContextInterface => {
    switch (action.type) {
        case "SEARCH_MOVIE":
            return { ...state, movies: action.payload }
        case "TOGGLE_FAVORITE":
            return { ...state, favorites: action.payload }
        case "SET_SELECTED_MOVIE":
            return { ...state, selectedMovie: action.payload }
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload }
        case "SET_SELECTED_MOVIE_CAST":
            return { ...state, selectedMovieCast: action.payload }
        default:
            return state;
    }
}