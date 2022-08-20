import Config from "../Config.js";

export default class HomeService {
    static url = Config.api + '/home';
    static getHomeData() {
        return fetch(this.url).then(response => response.json());
    }
}