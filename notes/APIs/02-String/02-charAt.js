/**
 * String.prototype.charAt(index)
 *
 *
 * return a new string consisting of the single UTF-16 code unit at the given index.
 *
 * note:
 * - index starts with 0. There's no negative value here.
 *
 * Important:
 *  to get a full character with value greater than 65535, you must retrieve not only charAt(i) + charAt(i + 1)
 */

var str = "abcdefghijklmnopqrstuvwxyz";
// Access the last character of the string.
console.log(str.charAt(str.length - 1)); // z

// Without providing index, it is default to index 0.
console.log(str.charAt()); // a

/* Importance! */
var str2 = "𠮷𠮾";
console.log(str2.charAt(0)); // "\ud842", which is not a valid Unicode character
console.log(str2.charAt(1)); // "\udfb7", which is not a valid Unicode character
console.log(str2.charAt(0) + str2.charAt(1)); // 𠮷 -> get full surrogate use str.charAt(i) + str.charAt(i + 1)

// Alternative: Get full Unicode code point at the given index
console.log(String.fromCodePoint(str2.codePointAt(0))); // 𠮷

/* Obtain each character from a string */

var str3 = "opqrs";
for (var i = 0; i < str3.length; i++) {
    console.log(str3[i]);
  console.log(str3.charAt(i));
}
