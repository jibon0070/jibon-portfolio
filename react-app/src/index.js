import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './home/home.jsx'
import './styles.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./admin/admin";
import Auth from "./auth/auth";
import PageNotFound from "./commons/page-not-found/page-not-found";

/**
 * @type {HTMLElement}
 */
const temp = document.getElementById('root')
const root = ReactDOM.createRoot(temp);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Home/>}/>
                <Route path='admin/*' element={<Admin/>}/>
                <Route path='auth/*' element={<Auth/>}/>

                <Route path={'*'} element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);