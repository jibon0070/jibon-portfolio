export default class Validators {

    /**
     * @param {string} value
     * @returns {{[key:string]: any}|null}
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
     * @returns {{email: string}|null}
     */
    static email(value) {
        value = value.toString().trim();
        if (!value)
            return null;
        const containsSpace = /\s/;
        if (containsSpace.test(value)) return {email: "Email can't contain any space"};
        const validEmail = /^.+@.+\..+/;
        if (!validEmail.test(value)) return {email: "Not a valid email."};
        return null;
    }

    /**
     * @param {string} value
     * @return {{username: string}|null}
     */
    static username(value) {
        value = value.toString().trim();
        if (!value) return null;
        const containsCapitalLetter = /[A-Z]/;
        if (containsCapitalLetter.test(value)) return {username: "Username cannot contain capital letter"};
        const containsSpace = /\s/;
        if (containsSpace.test(value)) return {username: "Do not use spaces is username."};
        const dontStartsWithCharacter = /(^\W)/;
        if (dontStartsWithCharacter.test(value)) return {username: "Username must start with character."};
        const startsWithNumber = /^\d/;
        if (startsWithNumber.test(value)) return {username: "Username must not start with number."};
        const containsNumberInMiddle = /^[a-z.]+\d[a-z.]+/;
        if (containsNumberInMiddle.test(value)) return {username: "If you use number it be at the end."};
        const endsWithDot = /\.$/;
        if (endsWithDot.test(value)) return {username: "Username can't end with dot."};
        return null;
    }

    /**
     * @param {number} minLength
     * @param {number} maxLength
     * @param {boolean} hard
     * @return {(function(*): (null|{password: string}))}
     */
    static password(minLength, maxLength, hard = true) {
        return (value) => {
            value = value.toString().trim()
            if (!value) return null;
            if (hard) {
                const containsCapitalLetter = /[A-Z]/;
                if (!containsCapitalLetter.test(value)) return {password: "Password must contain at least 1 capital letter."};
                const containsSmallLetter = /[a-z]/;
                if (!containsSmallLetter.test(value)) return {password: "Password must contain at least 1 small letter."};
                const containsNumber = /[0-9]/;
                if (!containsNumber.test(value)) return {password: "Password must contain at least 1 number."};
            }
            if (value.length < minLength) return {"password": `Password must be at least ${minLength} character long.`};
            if (value.length > maxLength) return {"password": `Password must be under ${maxLength} character long.`};
            return null;
        };
    }
}