export default class ReactiveForm {
    /**
     * @type {{[key:string]:FormControl}}
     */
    #fields = [];

    get valid() {
        const valids = [];
        for (let field in this.#fields){
            valids.push(this.#fields[field].valid);
        }
        return !valids.includes(false);
    }

    /**
     * @param {{[key:string]: FormControl}} form_group
     */
    constructor(form_group) {
        this.#fields = form_group;
    }

    /**
     * @return {{[key:string]:string}}
     */
    get value() {
        /**
         * @type {{[key:string]:string}}
         */
        const value = {};
        for (let field in this.#fields) {
            value[field] = this.#fields[field].value;
        }
        return value
    }

    /**
     * @param {string} name
     * @returns {FormControl}
     */
    get(name) {
        return this.#fields[name];
    }

}