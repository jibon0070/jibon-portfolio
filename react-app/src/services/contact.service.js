import Config from './../Config.js';

export default class ContactService {
    static #url = Config.api + '/contact';
    static sendMessage(data) {
        return fetch(this.#url + '/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
}