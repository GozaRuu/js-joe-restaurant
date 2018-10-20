import React from "react";
import ReactDOM from "react-dom";
import "./custom.bootstrap.scss";
import "bootstrap-social/bootstrap-social.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
