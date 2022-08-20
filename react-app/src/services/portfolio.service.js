import Config from "../Config.js";

export default class PortfolioService {
    static #url = Config.api + "/portfolio";
    static getPortfolioData() {
        return fetch(this.#url).then(res => res.json());
    }
}