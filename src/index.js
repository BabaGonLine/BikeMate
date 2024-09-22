import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { routeList } from "./routes/routList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { initLocalStorage } from "./tools/commonHelpers";
import { Languge as langHebDictionary } from "./tools/translation/IL.js";

const router = createBrowserRouter(routeList);

initLocalStorage(langHebDictionary);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
