const validator = require("validator");

const isEmail = (value) => validator.isEmail(value);

const isEmpty = (string) => {
    if (!string) return true;
    if(string.trim() === '')return true;
    else return false;
}

const isLessThanN = (num,len) => Number(num) < len;

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

const isPrice = (value) =>
  validator.isNumeric(value) && !isLessThanN(value,100) && value % 100 === 0;

const isName = (value) =>
  validator.isLength(value, 2) && validator.matches(value, /(?=.*[a-z][A-z])/);

const isDescription = (value) => validator.isLength(value, 10);

const checkLen = (value, low) => validator.isLength(value, low);



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


exports.validateAddProduct = (data) => {
  let errors = {};

  if (!checkLen(data.name,3))   errors.name = 'Name must be at least 3 characters'

  if(isEmpty(data.name)) errors.name = 'Name must not be empty'

  if (!isPrice(data.price))   errors.price = 'Price be a valid number more than 99 and must be a multiple of 100'

  if(isEmpty(data.price)) errors.price = 'Price must not be empty'

  if(!isDescription(data.description)) errors.description = 'Description must be at least 10 characters'

  if(isEmpty(data.description)) errors.description = 'Description must not be empty';

  return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
  }

}

exports.validateDelivery = (data) => {
  let errors = {};

  if (!checkLen(data.address,3))   errors.address = 'Address must be at least 3 characters'

  if(isEmpty(data.address)) errors.address = 'Address must not be empty'

  if(!checkLen(data.city,2))   errors.city = 'City must be at least 2 characters'

  if(isEmpty(data.city)) errors.city = 'City must not be empty'

  if(!checkLen(data.postalCode,4)) errors.postalCode = 'Postal Code must be at least 4 characters'

  if(isEmpty(data.postalCode)) errors.postalCode = 'Postal Code must not be empty';

  if(!checkLen(data.country,3)) errors.country = 'Country must be at least 3 characters'

  if(isEmpty(data.country)) errors.country = 'Country must not be empty';

  return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
  }

}