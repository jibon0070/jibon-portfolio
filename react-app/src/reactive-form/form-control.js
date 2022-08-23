export default class FormControl {
    /**
     * @type {string}
     */
    value;
    /**
     * @type {{[key:string] : any}}
     */
    errors = {};
    /**
     * @type {Function[]}
     */
    #validators = [];
    /**
     * @type {boolean}
     */
    dirty = false;
    /**
     * @type {boolean}
     */
    touched = false;
    /**
     * @type {boolean}
     */
    valid = false;
    /**
     * @type {Object | null}
     */
    #ref = null;
    /**
     * @type {Function | null}
     */
    #setState = null;

    /**
     * @param {string} value
     * @param {Function[]} validators
     */
    constructor(value = '', validators = []) {
        this.value = value;
        this.#validators = validators;
        this.#validate(validators, value);
    }

    /**
     * @return void
     */
    #validate() {
        let errors = {}
        for (let validator of this.#validators) {
            const error = validator(this.value)
            if (error) errors = {...errors, ...error}
        }
        this.errors = errors;
        this.valid = !Object.keys(errors).length;
        this.#setState?.({valid: this.valid, errors});
    }

    /**
     * @param {Event} e
     */
    on_change = (e) => {
        this.dirty = true;
        this.value = e.target.value;
        this.#validate();
        this.#setState?.({dirty: true});
    }

    /**
     * @return void
     */
    on_blur = () => {
        this.touched = true;
        this.#setState?.({touched: true})
    };

    /**
     * @param {Object | null} ref
     * @param {Function} setState
     */
    set_ref_and_state(ref, setState) {
        this.#ref = ref;
        this.#setState = setState;
    }

    /**
     * @param {string} value
     */
    set_value(value) {
        this.value = value;
        if (this.#ref) {
            this.#ref.current.value = value;
        }
    }

    /**
     * @param {{[key:string]:string}} error
     */
    set_error(error) {
        this.errors = {...this.errors, ...error};
        this.valid = false;
        this.#setState({errors: this.errors, valid: this.valid});
    }

}