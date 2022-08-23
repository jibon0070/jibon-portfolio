import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './home/home.jsx'
import './styles.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./admin/admin";
import Auth from "./auth/auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/admin/*' element={<Admin/>}/>
                <Route path='/auth/*' element={<Auth/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);