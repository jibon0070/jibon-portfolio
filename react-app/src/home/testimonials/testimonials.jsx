import React from "react";
import './testimonials.scss';
import Config from "../../Config.js";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default class Testimonials extends React.Component {
    render() {
        if (this.props.testimonials?.length) {
            return (
                <section id="testimonials">
                    <h5>Review From Clients</h5>
                    <h2>Testimonials</h2>
                    <div className="container">
                        <Swiper modules={[Navigation]} navigation>
                            {/* <SwiperSlide>1</SwiperSlide>
                            <SwiperSlide>2</SwiperSlide>
                            <SwiperSlide>3</SwiperSlide> */}
                            {this.props.testimonials?.map((testimonial, index) => {
                                return (
                                    <SwiperSlide key={index} className="testimonial">
                                        <div className="avatar">
                                            <img src={Config.api + testimonial.image_link} alt="broken client avatar" />
                                        </div>
                                        <h5 className="name">{testimonial.name}</h5>
                                        <small className="review">
                                            {testimonial.description}
                                        </small>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </section>

            )
        }
        return <></>
    }
}