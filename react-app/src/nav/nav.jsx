import React from 'react';
import './nav.scss';
export default class Nav extends React.Component {
    render() {
        return (
            <div id="nav">
                <nav>
                    <a title='Home' href="#"><i className="fa-solid fa-house"></i></a>
                    <a href="#about" title='About Me'><i className="fa-solid fa-circle-info"></i></a>
                    <a href="#experience" title='My Experience'><i className="fa-solid fa-graduation-cap"></i></a>
                    <a href="#portfolio" title='Works I have done'><i className="fa-solid fa-briefcase"></i></a>
                    <a href="#testimonials" title='Words about me'><i className="fa-solid fa-quote-left"></i></a>
                    <a href="#contact" title='Need to talk'><i className="fa-solid fa-message"></i></a>
                </nav>

            </div>
        );
    }
}