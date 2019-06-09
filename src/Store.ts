import React from "react";

export interface AppContextInterface {
    movies: [];
    favorites: [];
    selectedMovie: any;
}

export interface AppActionInterface {
    type: string;
    payload: any;
}

const initialState = {
    movies: [],
    favorites: [],
    selectedMovie: {}
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
        default:
            return state;
    }
}