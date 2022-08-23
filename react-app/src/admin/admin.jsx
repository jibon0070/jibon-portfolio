import React from "react";
import UsersService from "../services/users.service";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {Helpers} from "../Helpers";
import HeaderImage from "./header-image/header-image";
import PageNotFound from "../commons/page-not-found/page-not-found";
import AboutMe from "./about-me/about-me";

export default class Admin extends React.Component {
    state = {
        go_to_login: !UsersService.is_logged_in,
        routes: ['header-image', 'about-me', 'experiences', 'portfolios', 'testimonials', 'contacts']
    }


    render() {
        return (<div id="admin">
            {this.state.go_to_login ? <Navigate to="/auth/login"/> : null}
            <Routes>
                <Route path='/' element={<Component/>}/>
                <Route path='/header-image' element={<HeaderImage />} />
                <Route path={'/about-me'} element={<AboutMe />} />


                <Route path={'/*'} element={<PageNotFound />} />
            </Routes>
        </div>);
    }
}

class Component extends React.Component {
    state = {
        go_to_login: !UsersService.is_logged_in,
        routes: ['header-image', 'about-me', 'experiences', 'portfolios', 'testimonials', 'contacts']
    }

    logout() {
        UsersService.logout()
        UsersService.$is_logged_in.emit(false);
        this.setState({go_to_login: true});
    }

    render() {
        return (
            <div className="container">
                {this.state.go_to_login ? <Navigate to="/auth/login"/> : null}
                <div className="align-right mt-3">
                    <Link to='/'>Home</Link>
                    <button onClick={this.logout.bind(this)} className='btn btn-primary'>Logout</button>
                </div>
                <h2 className='align-center mt-3'>Admin Panel</h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2em'
                }}>
                    {this.state.routes.map((route, index) => {
                        return (
                            <div className="card" key={index} style={{width: 'calc((100% / 12 * 4) - (4em / 3))'}}>
                                <div className="card-header">{Helpers.title_case(route.replaceAll('-', ' '))}</div>
                                <div className="card-body align-right">
                                    <Link to={route} className={'btn btn-primary'}>View</Link>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}