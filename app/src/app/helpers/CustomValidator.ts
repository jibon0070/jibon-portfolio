import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidator {
  static equation(control: AbstractControl): ValidationErrors | null {
    if (control.value == '' || control.value == null) return null;
    const has_word = /\w/;
    if (!has_word.test(control.value)) return {equation: 'Not a valid mathematics equation.'};
    try {
      eval(control.value);
    } catch {
      return {equation: 'Not a valid mathematical equation.'}
    }
    return null;
  };

  static notNegative(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value == "" || value == null) return null;
      return value < 0 ? {"notNegative": message} : null;
    }
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (control.value == "" || control.value == null)
      return null;
    const containsSpace = /\s/;
    if (containsSpace.test(control.value)) return {email: "Email can't contain any space"};
    const validEmail = /^.+@.+\..+/;
    if (!validEmail.test(control.value)) return {email: "Not a valid email."};
    return null;
  }

  static username(control: AbstractControl): ValidationErrors | null {
    if (control.value == "" || control.value == null) return null;
    const containsCapitalLetter = /[A-Z]/;
    if (containsCapitalLetter.test(control.value)) return {username: "Username cannot contain capital letter"};
    const containsSpace = /\s/;
    if (containsSpace.test(control.value)) return {username: "Do not use spaces is username."};
    const dontStartsWithCharacter = /(^\W)/;
    if (dontStartsWithCharacter.test(control.value)) return {username: "Username must start with character."};
    const startsWithNumber = /^\d/;
    if (startsWithNumber.test(control.value)) return {username: "Username must not start with number."};
    const containsNumberInMiddle = /^[a-z.]+\d[a-z.]+/;
    if (containsNumberInMiddle.test(control.value)) return {username: "If you use number it be at the end."};
    const endsWithDot = /\.$/;
    if (endsWithDot.test(control.value)) return {username: "Username can't end with dot."};
    return null;
  }

  static password(minLength: number, maxLength: number, hard = true): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null || control.value == "") return null;
      if (hard) {
        const containsCapitalLetter = /[A-Z]/;
        if (!containsCapitalLetter.test(control.value)) return {password: "Password must contain at least 1 capital letter."};
        const containsSmallLetter = /[a-z]/;
        if (!containsSmallLetter.test(control.value)) return {password: "Password must contain at least 1 small letter."};
        const containsNumber = /[0-9]/;
        if (!containsNumber.test(control.value)) return {password: "Password must contain at least 1 number."};
      }
      if (control.value.length < minLength) return {"password": `Password must be at least ${minLength} character long.`};
      if (control.value.length > maxLength) return {"password": `Password must be under ${maxLength} character long.`};
      return null;
    };
  }

  static phone(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value == null || value == "") return null;
    const startsWith01 = /^01/;
    if (!startsWith01.test(value)) return {phone: "Phone number must starts with 01."};
    const notContainNumber = /[^0-9]/;
    if (notContainNumber.test(value)) return {phone: "Phone number must contain only number."};
    if (value.length != 11) return {phone: `Phone number must be 11 characters long. Current number is ${value.length} characters long.`};
    return null;
  }

  static changePasswordCrossFieldPasswordValidation(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword');
    const cPassword = group.get('cPassword');
    if (cPassword?.value == null || cPassword.value == "") {
      cPassword?.setErrors(null);
    } else if (cPassword.value == newPassword?.value) {
      cPassword.setErrors(null);
    } else {
      cPassword.setErrors({crossField: "Password mismatch."})
    }
    return null;
  }

  static requiredAny(controls: string[], errorMessage: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      let values: string[] = [];
      controls.forEach(control => {
        values.push(group.get(control)?.value)
      });
      let exp: boolean[] = [];
      values.forEach(value => {
        exp.push(value == "" || value == null)
      });
      if (exp.includes(false)) {
        // good
        controls.forEach(control => {
          if (group.get(control)?.errors?.["requiredAny"])
            group.get(control)?.setErrors(null);
        });
      } else {
        // bad
        controls.forEach(control => {
          group.get(control)?.setErrors({requiredAny: errorMessage});
        });
      }
      return null;
    };
  }

  static requiredIf(check: string, value: string[], apply: string, message: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const check_control: AbstractControl = group.get(check)!;
      const apply_control: AbstractControl = group.get(apply)!;
      if (value.includes(check_control.value)) {
        if (apply_control.value === "" || apply_control.value === null) {
          apply_control.setErrors({requiredIf: message})
        }
      } else {
        if (apply_control.errors?.["requiredIf"]) {
          apply_control.setErrors(null);
        }
      }
      return null;
    };
  }
}
