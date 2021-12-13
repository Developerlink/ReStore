import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { HistoryRouter } from "./app/custom/HistoryRouter";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
      </HistoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

//  If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
