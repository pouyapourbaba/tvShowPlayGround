import React from "react";

export interface AppContextInterface {
    movies: [];
    favorites: [];
    selectedMovie: any;
    searchQuery: string;
}

export interface AppActionInterface {
    type: string;
    payload: any;
}

const initialState: AppContextInterface = {
    movies: [],
    favorites: [],
    selectedMovie: {},
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
        default:
            return state;
    }
}