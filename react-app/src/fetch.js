import UsersService from "./services/users.service";

export default class Fetch {
    /**
     * @return {string}
     */
    static get #base_url() {
        return document.querySelector("base")?.base_url;
    }

    /**
     * @param {string} url
     * @return {Promise}
     */
    static get(url) {
        const headers = this.#get_headers;
        let result = fetch(url, {
            method: 'GET',
            headers
        })

        result = this.#process_result(result);
        return result
    }

    /**
     * @return {Headers}
     */
    static get #get_headers() {
        const headers = new Headers({})
        if (UsersService.is_logged_in) {
            headers.append('Authorization', `Barer ${UsersService.token}`);
        }
        return headers;
    }

    /**
     * @param {string} url
     * @param {{[key:string]: any} | FormData} body
     */
    static post(url, body) {
        const headers = this.#get_headers
        let result = fetch(url, {
            headers,
            method: 'POST',
            body: body instanceof FormData ? body : JSON.stringify(body)
        })
        return this.#process_result(result);
    }

    /**
     * @param {Promise} result
     * @return Promise
     */
    static #process_result(result) {
        return result.then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                if (UsersService.is_logged_in) {
                    UsersService.logout();
                }
                window.location = this.#base_url ?? '/';
            } else {
                return result;
            }
        });
    }

    /**
     * @param {string} url
     * @return {Promise}
     */
    static delete(url) {
        const headers = this.#get_headers
        let result = fetch(url, {
            headers,
            method: 'DELETE'
        })
        return this.#process_result(result);
    }
}