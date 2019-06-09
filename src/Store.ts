import React from "react";

export interface AppContextInterface {
    name: string,
    author: string,
    url: string
}

const sampleAppContext: AppContextInterface = {
    name: '',
    author: '',
    url: ''
};

export const Context = React.createContext<AppContextInterface>(sampleAppContext);

export const AppContextProvider = Context.Provider;
export const AppContextConsumer = Context.Consumer;
