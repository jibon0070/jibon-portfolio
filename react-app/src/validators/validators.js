export default class Validators {
    /**
     * 
     * @param {string} value 
     * @returns {{[key:string]:any} | null}
     */
    static required(value) {
        value = value.toString().trim();
        if (value) return null;
        return {
            required: true
        }
    }
    /**
     * 
     * @param {string} value 
     * @returns {{[key:string]:any} | null}
     */
    static email(value) {
        value = value.toString().trim();
        if (!value)
            return null;
        const containsSpace = /\s/;
        if (containsSpace.test(value)) return { email: "Email can't contain any space" };
        const validEmail = /^.+@.+\..+/;
        if (!validEmail.test(value)) return { email: "Not a valid email." };
        return null;
    }
}