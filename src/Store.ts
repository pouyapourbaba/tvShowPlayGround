import React from "react";

export interface AppContextInterface {
    movies: [];
    favorites: [];
}

export interface AppActionInterface {
    type: string;
    payload: any;
}

const sampleAppContext: AppContextInterface = {
    movies: [],
    favorites: []
};

export const Context = React.createContext<AppContextInterface | any>(sampleAppContext);

export const AppContextProvider = Context.Provider;
export const AppContextConsumer = Context.Consumer;

export const reducer = (state: AppContextInterface, action: AppActionInterface): AppContextInterface => {
    switch (action.type) {
        case "SEARCH_MOVIE":
            return { ...state, movies: action.payload }
        case "TOGGLE_FAVORITE":
            return { ...state, favorites: action.payload }
        default: 
            return state;
    }
}