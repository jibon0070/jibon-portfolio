import Config from "../Config.js";

export default class TestimonialsService{
    static #url = Config.api + "/testimonial";
    static getTestimonialData(){
        return fetch(this.#url).then(response => response.json());
    }
}