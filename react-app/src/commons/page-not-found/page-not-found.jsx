import React from 'react';
import './page-not-found.scss';
import {Link} from "react-router-dom";

export default class PageNotFound extends React.Component{
    render() {
        return (
            <div id="page-not-found">
                <h1>404 Page Not Found</h1>
                <p>The page you are trying to get is not in our database. If you think this is a mistake from us, please make contact to
                    our server administrator.</p>
                <Link to='/' className='btn'>Home</Link>
            </div>
        );
    }
}