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

/**
 * @param {String} value
 * @return {boolean}
 */
const isPhone = (value) =>
  validator.isNumeric(value) && validator.isLength(value, 10);

const isName = (value) =>
  validator.isLength(value, 2) && validator.matches(value, /(?=.*[a-z][A-z])/);

// const description = (value) => validator.isLength(value, 10);

// const checkLen = (value, low) => validator.isLength(value, low);

// const isLessThanN = (num,len) => Number(num) < len;


//Export Functions
exports.validateLogin = (data) => {
    let errors = {};

    if(isEmpty(data.email)) errors.email = 'Email must not be empty'

    if (!isEmail(data.email))   errors.email = 'Email be a valid email address'

    if(!isPassword(data.password)) errors.password = 'Password must contain an uppercase,lowercase character,number,special character and is 8 characters long'

    if(isEmpty(data.password)) errors.password = 'Password must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}

exports.validateRegister = (data) => {
  let errors = {};

  if (!isName(data.fname))   errors.fname = 'First name must be at least 2 characters'

  if(isEmpty(data.fname)) errors.fname = 'First Name must not be empty'

  if (!isName(data.lname))   errors.lname = 'Last name must be  at least 2 characters'

  if(isEmpty(data.lname)) errors.lname = 'Last name must not be empty'

  if (!isPhone(data.phone))   errors.phone = 'Phone number must be at least 10 characters'

  if(isEmpty(data.phone)) errors.phone = 'Phone number must not be empty'

  if (!isEmail(data.email))   errors.email = 'Email be a valid email address'

  if(isEmpty(data.email)) errors.email = 'Email must not be empty'

  if(!isPassword(data.password)) errors.password = 'Password must contain an uppercase,lowercase character,number,special character and is 8 characters long'

  if(isEmpty(data.password)) errors.password = 'Password must not be empty';

  return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
  }

}
