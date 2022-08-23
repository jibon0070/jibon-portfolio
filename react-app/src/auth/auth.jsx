import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from './login/login'
import PageNotFound from "../commons/page-not-found/page-not-found";

export default class Auth extends React.Component {
    render() {
        return (
            <div id="auth">
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path='/*' element={<PageNotFound />} />
                </Routes>
            </div>
        )
    }
}