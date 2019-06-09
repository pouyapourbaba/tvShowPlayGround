import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {AppContextProvider, AppContextInterface} from "./Store"

const sampleAppContext: AppContextInterface = {
  name: 'Using React Context in a Typescript App',
  author: 'thehappybug',
  url: 'http://www.example.com'
};

ReactDOM.render(
  <BrowserRouter>
    <AppContextProvider value={sampleAppContext}>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
