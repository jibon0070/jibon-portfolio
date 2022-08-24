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
        },
        /**
         * @return {Promise<{
         *     clients: string,
         *     experience:string,
         *     projects: string
         * }>}
         */
        index: () => {
            return Fetch.get(AdminService.#url + '/about-me')
        },
        /**
         * @param {{
         *     name:string,
         *     value: string
         * }} data
         * @return {Promise<{
         *     success: boolean
         * }>}
         */
        edit: (data) => {
            return Fetch.post(AdminService.#url + '/about-me', data)
        },
    };
    static experiences = {
        /**
         * @return {Promise<{
         *     id:string,
         *     title:string,
         *     experience:string,
         *     category:string
         * }[]>}
         */
        index: () => {
            return Fetch.get(AdminService.#url + '/experiences')
        },
        /**
         * @param {string} id
         * @return {Promise<{
         *     success:boolean
         * }>}
         */
        delete: (id) => {
            return Fetch.delete(AdminService.#url + '/experiences/index/' + id)
        },
        /**
         * @param {{[p: string]: string}} data
         * @return {Promise<{
         *     success: boolean
         * }>}
         */
        new: (data) => {
            return Fetch.post(AdminService.#url + '/experiences', data)
        },
    };
    static portfolios = {
        /**
         * @return {Promise<{
         *     id:string;
         *     title:string;
         *     github:string|null;
         *     live:string|null;
         *     image:string
         * }[]>}
         */
        index: () => {
            return Fetch.get(AdminService.#url + '/portfolios')
        },
        /**
         * @param {string} id
         * @return {Promise<{
         *     success: boolean
         * }>}
         */
        delete: (id) => {
            return Fetch.delete(AdminService.#url + '/portfolios/' + id)
        },
        /**
         * @param {FormData} data
         * @return {Promise<{
         *     success: boolean,
         *     error:string
         * }>}
         */
        new: (data) => {
            return Fetch.post(AdminService.#url + '/portfolios', data)
        },
    };
    static testimonials = {
        /**
         * @return {Promise<{
         *   id:string,
         *   name:string,
         *   description:string,
         *   image:string
         * }[]>}
         */
        index: () => {
            return Fetch.get(AdminService.#url + '/testimonials')
        },
        /**
         * @param {string} id
         * @return {Promise<{
         *     success:boolean
         * }>}
         */
        delete: (id) => {
            return Fetch.delete(AdminService.#url + '/testimonials/' + id)
        },
    };

}