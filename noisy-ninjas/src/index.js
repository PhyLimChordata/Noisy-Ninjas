import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(    <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</React.StrictMode>);
