import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import "./assets/scss/styles.scss";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
