// check the match of {} [] () is correct.

// a {(b{c[1, 2, 3]})} /
// a {b[c(d)e (f)}] x

var str = "a{(b{c[1,2,3]})}"; // true
var str2 = "a{b[c(d)e(f)}]"; // false
var str3 = "a{(b{c[1,2,3"; // false
var str4 = "a{(b{c[1,2,3]})"; // false
var str5 = "abc1,2,3]})"; // false
var str6 = "abc123"; // true
var str7 = ""; // true

/**
 * Pass a string as an argument.
 * Return true if match.
 * 
 * O(N) time
 * O(N) space
 */

function matchSymbol(str) {
  if (typeof str !== "string") return false;
  var len = str.length;
  if (len === 0) return true;
  var stack = []; // affected by str. O(n)
  var leftSymbols = "{([";
  var rightSymbols = "})]";
  for (var i = 0; i < len; i++) {
    if (leftSymbols.includes(str[i])) { // O(1) - the search is not tied to input str.
      stack.push(str[i]);
    } else if (rightSymbols.includes(str[i])) { // O(1) - the search is not tied to input str.
      var stackTop = stack[stack.length - 1];
      if (isSymbolMatch(stackTop, str[i])) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  // Note: If there are missing right brackets, stack might still have something. Its length will not be 0.
  return stack.length === 0;
}

function isSymbolMatch(leftSymbol, rightSymbol) {
  return (
    (rightSymbol === "}" && leftSymbol === "{") ||
    (rightSymbol === ")" && leftSymbol === "(") ||
    (rightSymbol === "]" && leftSymbol === "[")
  );
}



console.log(matchSymbol(str)); // true
console.log(matchSymbol(str2)); // false
console.log(matchSymbol(str3)); // false
console.log(matchSymbol(str4)); // false
console.log(matchSymbol(str5)); // false
console.log(matchSymbol(str6)); // true
console.log(matchSymbol(str7)); // true
console.log(matchSymbol(1)); // false

