import React from "react";
import './about.scss';
import Config from "../../Config";
export default class About extends React.Component {

    render() {
        return (
            <div id="about">
                <section id="about">
                    <h5>Get To Know</h5>
                    <h2>About Me</h2>
                    <div className="container">
                        <div className="me">
                            <div className="me-image">
                                <img src={this.props.about_me_image ? Config.api + this.props.about_me_image :'/assets/me2.png'} alt="Broken me 2" />
                            </div>
                        </div>
                        <div className="content">
                            <div className="cards">
                                {
                                    this.props.experience ?
                                        (<article className="card" /* *ngIf="experience" */>
                                            <i className="fa-solid fa-trophy"></i>
                                            <h5>Experience</h5>
                                            <small>{this.props.experience}+ Years Working</small>
                                        </article>) :
                                        null
                                }
                                {
                                    this.props.clients ?
                                        (<article className="card" /* *ngIf="clients" */>
                                            <i className="fa-solid fa-people-group"></i>
                                            <h5>Clients</h5>
                                            <small>{this.props.clients}+ Worldwide Clients</small>
                                        </article>) :
                                        null
                                }
                                {
                                    this.props.projects ?
                                        (<article className="card" /* *ngIf="projects" */>
                                            <i className="fa-solid fa-folder-open"></i>
                                            <h5>Projects</h5>
                                            <small>{this.props.projects}+ Completed Projects</small>
                                        </article>) :
                                        null
                                }
                            </div>
                            <a href="#contact" className="btn btn-primary">Let's Talk</a>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}