import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/App";
require('dotenv').config();

ReactDOM.render(
  <App />
  ,
  document.getElementById("root")
);
