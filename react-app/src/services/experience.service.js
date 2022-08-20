import Config from "../Config.js";
export default class ExperienceService {
    static url = Config.api + '/experience';
    static getExperienceData() {
        return fetch(this.url).then(response => response.json());
    }
}