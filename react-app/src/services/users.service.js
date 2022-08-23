import Config from "../Config";
import Fetch from "../fetch";

export default class UsersService {
    /**
     * @type {string}
     */
    static #url = Config.api + '/users';
    /**
     * @type Function
     */
    static #is_logged_in_call_back;
    static get $is_logged_in(){
        return {
            emit: (data) => {
                this.#is_logged_in_call_back?.(data)
            },
            subscribe: (cb) => {
                this.#is_logged_in_call_back = cb;
            },
        }
    }

    /**
     * @return {string}
     */
    static get token() {
        return localStorage.getItem(Config.token_key)
    }

    /**
     * @return {boolean}
     */
    static get is_logged_in() {
        return !!this.token;
    }

    /**
     * @param {{[key:string]: any}} value
     * @return {Promise<{
     *     error: 'username' | 'password',
     *     token: string
     * }>}
     */
    static login(value) {
        return Fetch.post(this.#url + '/login', value);
    }

    /**
     * @param {string} token
     */
    static set_token(token) {
        localStorage.setItem(Config.token_key, token);
    }

    static logout() {
        localStorage.clear();
        sessionStorage.clear();
        this.$is_logged_in.emit(false);
    }
}