import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LivePage from "./components/LivePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Search /> */}
    <App />
    {/* <LivePage /> */}
  </React.StrictMode>
);
