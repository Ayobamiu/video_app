import React from "react";
import ReactDOM from "react-dom";
import App from "./photoly/App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import "font-awesome/css/font-awesome.css";

// ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
