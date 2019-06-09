import React from "react";

export interface AppContextInterface {
    movies: [];
    favorites: [];
}

interface AppActionInterface {
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


// Reducer
export function reducer(state: AppContextInterface, action: AppActionInterface) {
    switch (action.type) {
        case "SEARCH_MOVIES":
            return { ...state, movies: action.payload }
        default:
            return state
    }
}
