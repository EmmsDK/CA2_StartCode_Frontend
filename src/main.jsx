import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/index.css";
import App from "./App";
import apiFacade from "./apiFacade";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <App apiFacade={apiFacade} />
        </Router>
    </React.StrictMode>
);