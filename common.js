/**
 * Check if a value is a number type.
 *
 * isNaN intrinsicaly uses Number() to convert val.
 *  - Number("") / Number(" ") -> 0.
 *  - filter non-numeric strings, undefined, NaN.
 * parseInt
 *  - parseInt("") / parseInt(" ") / parseInt(null) -> NaN.
 *  - filter empty string, string with empty spaces and null.
 *
 * @param {number} val
 * @returns {boolean} true if it is a number. Otherwise, it is false.
 */
function isNumber(val) {
  if (isNaN(val)) {
    return false;
  } else if (isNaN(parseInt(val))) {
    return false;
  } else {
    return true;
  }
}

// console.log(isNumber(1)); // true
// console.log(isNumber("1")); // true
// console.log(isNumber("  1")); // true
// console.log(isNumber("  1   ")); // true
// console.log(isNumber("1   ")); // true
// console.log(isNumber("1px")); // false
// console.log(isNumber("  1px")); // false
// console.log(isNumber("")); // false
// console.log(isNumber("  ")); // false
// console.log(isNumber("undefined")); // false
// console.log(isNumber(null)); // false
// console.log(isNumber(undefined)); // false

/**
 * Check if a given year is a leap year.
 * - when year is divisible by 4 and year is not divisible by 100.
 * - when year is divisible by 400.
 * - leap year 
 * -> when the days of the year has one more day.
 * -> February has 29 days in a leap year.
 * @param {number} year 
 * @returns 
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Generate a random number within the range [min, max].
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
