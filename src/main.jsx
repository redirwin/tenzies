import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/scripts/App";
import "../src/global_styles/reset.scss";
import "../src/global_styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
