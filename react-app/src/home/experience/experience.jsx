import React from "react";
import "./experience.scss";
export default class Experience extends React.Component {
    state = {
        experiences: null
    }
    render() {
        return (
            <>
                {this.props.experiences?.frontend?.length || this.props.experience?.backend?.length ? (<section id="experience">
                    <h5>The Skills I Have</h5>
                    <h2>My Experience</h2>
                    <div className="container">
                        {
                            this.props.experiences?.frontend?.length ?
                                (<div className="frontend">
                                    <h3>Frontend Development</h3>
                                    <div className="content">
                                        {this.props.experiences?.frontend?.map((experience, index) => {
                                            return (
                                                <article className="details" key={index}>
                                                    <i className="fa-solid fa-certificate"></i>
                                                    <div>
                                                        <h4>{experience.title}</h4>
                                                        <small className="text-light">{experience.experience}</small>
                                                    </div>
                                                </article>
                                            )
                                        })}
                                    </div>
                                </div>) :
                                null
                        }
                        {this.props.experiences?.backend?.length ?
                            (<div className="backend">
                                <h3>Backend Development</h3>
                                <div className="content">
                                    {this.props.experiences?.backend?.map((experience, index) => {
                                        return (
                                                <article className="details" key={index}>
                                                    <i className="fa-solid fa-certificate"></i>
                                                    <div>
                                                        <h4>{experience.title}</h4>
                                                        <small className="text-light">{experience.experience}</small>
                                                    </div>
                                                </article>
                                        )
                                    })}
                                </div>
                            </div>) :
                            null
                        }
                    </div>
                </section>) : null}
                {/* <app-loading></app-loading> */}
            </>

        )
    }
}