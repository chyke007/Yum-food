const validator = require("validator");

const isEmail = (value) => validator.isEmail(value);

const isEmpty = (string) => {
    if (!string) return true;
    if(string.trim() === '')return true;
    else return false;
}

/** returns true if the value has atleast a lowercase character,
 * an uppercase character, a number or a special character,
 * and is at least  characters long
 * @param  {string} value
 * @return {boolean}
 */
const isPassword = (value) =>
  validator.matches(
    value,
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,}/ // eslint-disable-line
  );

// /**
//  * @param {String} value
//  * @return {boolean}
//  */
// const phone = (value) =>
//   validator.isNumeric(value) && validator.isLength(value, 10);

// const name = (value) =>
//   validator.isLength(value, 3) && validator.matches(value, /(?=.*[a-z][A-z])/);

// const description = (value) => validator.isLength(value, 10);

// const checkLen = (value, low) => validator.isLength(value, low);

// const isLessThanN = (num,len) => Number(num) < len;


//Export Functions
exports.validateLogin = (data) => {
    let errors = {};

    if(isEmpty(data.email)) errors.email = 'Email must not be empty'

    if (!isEmail(data.email))   errors.email = 'Email be a valid email address'

    if(isEmpty(data.password)) errors.password = 'Password must not be empty';

    if(!isPassword(data.password)) errors.password = 'Password must contain an uppercase,lowercase character,number,special character and is 8 characters long'

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}
