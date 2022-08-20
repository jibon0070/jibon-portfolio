import React from "react";
import "./header.scss";
export default class Header extends React.Component {
    state = {
        name: 'A.R. Jibon'
    }
    render() {
        return (
            <div id="header">
                <header>
                    <div className="container">
                        <h5>Hello I'm</h5>
                        <h1>{this.state.name}</h1>
                        <h5 className="text-light">Full Stack Developer</h5>
                        <div className="cta">
                            <a href={process.env.PUBLIC_URL + '/assets/cv.pdf'} download className="btn">Download CV</a>
                            <a href="#contact" className="btn btn-primary">Let's Talk</a>
                        </div>
                        <div className="me">
                            <img src={this.props.header_image ?? '/assets/me.png'} alt="broken me" />
                        </div>
                        <a style={{cursor: 'pointer'}} href="#contact" className="scroll_down">Scroll Down</a>
                        <div className="social">
                            <a href="https://github.com/jibon0070/" target="_blank">
                                <img src="/assets/github.svg" alt="github" />
                            </a>
                            <a href="https://www.facebook.com/atiurrahaman.jibon/" target="_blank">
                                <img src="/assets/facebook.svg" alt="facebook" />
                            </a>
                        </div>
                    </div>
                </header>

            </div>
        )
    }
}