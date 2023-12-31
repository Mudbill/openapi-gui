import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("app-mount")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
