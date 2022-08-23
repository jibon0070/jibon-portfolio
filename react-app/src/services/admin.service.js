import Config from "../Config";
import Fetch from "../fetch";

export default class AdminService {
    static #url = Config.api + '/admin'
    static headerImage = {
        /**
         * @return {Promise<{
         *     url:string|null
         * }>}
         */
        index: () => {
            return Fetch.get(AdminService.#url + '/header-image')
        },
        /**
         * @return {Promise<{
         *     success: boolean
         * }>}
         */
        delete: () => {
            return Fetch.delete(AdminService.#url + '/header-image')
        },
        /**
         *
         * @param {FormData} data
         * @return {Promise<{
         *     success: boolean,
         *     url: string,
         *     error:string
         * }>}
         */
        upload: (data) => {
            return Fetch.post(AdminService.#url + '/header-image', data);
        },
    }
    static aboutMe = {
        /**
         * @return {Promise<{
         *     url:string
         * }>}
         */
        image: () => {
            return Fetch.get(AdminService.#url + '/about-me/image')
        },
        /**
         * @param {FormData} data
         * @return {Promise<{
         *     success: boolean,
         *     error:string,
         *     url:string
         * }>}
         */
        image_upload: (data) => {
            return Fetch.post(AdminService.#url + '/about-me/image', data);
        },
        /**
         * @return {Promise<{
         *     success: boolean
         * }>}
         */
        image_delete: () => {
            return Fetch.delete(AdminService.#url + '/about-me/image');
        }
    };
}