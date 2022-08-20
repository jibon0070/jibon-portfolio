import React from "react";
import './portfolio.scss';
import Config from "../../Config.js";
export default class Portfolio extends React.Component {
    render() {
        if (this.props.portfolios?.length)
            return (
                <div id="portfolio">
                    <section id="portfolio">
                        <h5>My Recent Work</h5>
                        <h2>Portfolio</h2>
                        <div className="container">
                            {this.props.portfolios?.map((portfolio, index) => {
                                return (
                                    <article key={index} className="item" >
                                        <div className="item-image">
                                            <img src={Config.api + portfolio.image_link} alt="Broken {{portfolio.title}} image" />
                                        </div>
                                        <h3>{portfolio?.title}</h3>
                                        <div className="cta">
                                            {
                                                portfolio?.github_link ?
                                                    (<a href={portfolio?.github_link} target="_blank" className="btn">Github</a>) :
                                                    null
                                            }
                                            {
                                                portfolio?.live_link ?
                                                    (<a href={portfolio.live_link} target="_blank" className="btn btn-primary">Live</a>) :
                                                    null
                                            }
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </section>
                </div>
            )
        return (<></>)
    }
}