import React from 'react';
import './nav.scss';
import {Link} from "react-router-dom";
import UsersService from "../../services/users.service";

export default class Nav extends React.Component {

    state = {
        is_logged_in: UsersService.is_logged_in
    }

    componentDidMount() {
        UsersService.$is_logged_in.subscribe(data => {
            this.setState({is_logged_in: data});
        });
    }

    render() {
        return (
            <div id="nav">
                <nav>
                    <a title='Home' href="#home"><i className="fa-solid fa-house"></i></a>
                    <a href="#about" title='About Me'><i className="fa-solid fa-circle-info"></i></a>
                    {
                        this.props.state.experiences?.frontend?.length || this.props.state.experiences?.backend?.length ?
                            (<a href="#experience" title='My Experience'><i className="fa-solid fa-graduation-cap"></i></a>) :
                            null
                    }
                    {
                        this.props.state.portfolios?.length ?
                            (
                                <a href="#portfolio" title='Works I have done'><i className="fa-solid fa-briefcase"></i></a>) :
                            null
                    }
                    {
                        this.props.state.testimonials?.length ?
                            <a href="#testimonials" title='Words about me'><i
                                className="fa-solid fa-quote-left"></i></a> :
                            null
                    }
                    <a href="#contact" title='Need to talk'><i className="fa-solid fa-message"></i></a>
                    {this.state.is_logged_in ?
                        <Link to='/admin'><i className="fa-solid fa-lock-open"></i></Link> : null}
                    {this.state.is_logged_in ? <a onClick={this.logout.bind(this)} href="#"><i
                        className="fa-solid fa-arrow-right-from-bracket"></i></a> : null}
                </nav>

            </div>
        );
    }

    logout() {
        UsersService.logout()
    }
}