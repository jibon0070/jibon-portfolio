import React from "react";
import Nav from "./nav/nav.jsx";
import ExperienceService from "../services/experience.service.js";
import HomeService from "../services/home.service.js";
import PortfolioService from "../services/portfolio.service.js";
import TestimonialsService from "../services/testimonials.service.js";
import About from "./about/about.jsx";
import Contact from "./contact/contact.jsx";
import Experience from "./experience/experience.jsx";
import Header from "./header/header.jsx";
import Portfolio from "./portfolio/portfolio.jsx";
import Testimonials from "./testimonials/testimonials.jsx";
export default class Home extends React.Component {
  state = {
    experiences: null,
    about_experience: null,
    about_clients: null,
    about_projects: null,
    portfolios: null,
    header_image: null,
    about_me_image: null,
    testimonials: null,
  }
  componentDidMount() {
    Promise.all([
      HomeService.getHomeData(),
      ExperienceService.getExperienceData(),
      PortfolioService.getPortfolioData(),
      TestimonialsService.getTestimonialData(),
    ]).then(([home_data, experience_data, portfolio_data, testimonial_data]) => {
      this.setState({
        experiences: experience_data,
        about_experience: home_data.experience,
        about_clients: home_data.clients,
        about_projects: home_data.projects,
        header_image: home_data.header_image,
        about_me_image: home_data.about_me_image,
        portfolios: portfolio_data,
        testimonials: testimonial_data,
      });
    })
  }
  render() {
    return (
      <div id="home">
        <Nav state={this.state} />
        <Header header_image={this.state.header_image} />
        <About experience={this.state.about_experience} clients={this.state.about_clients} projects={this.state.about_projects} about_me_image={this.state.about_me_image} />
        <Experience experiences={this.state.experiences} />
        <Portfolio portfolios={this.state.portfolios} />
        <Testimonials testimonials={this.state.testimonials} />
        {
          process.env.NODE_ENV === 'development' ?
            <Contact /> :
            null
        }
      </div>
    );
  }
}