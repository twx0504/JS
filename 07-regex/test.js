// 1. check if a string is made up of 11 digits, and it must start with 1, and the second character should not be 1 and 2.
var reg = /^1[3-9]\d{9}$/;
console.log(reg.test(13978903158)); // true
console.log(reg.test(138534080452)); // false
console.log(reg.test(12853342345)); // false
