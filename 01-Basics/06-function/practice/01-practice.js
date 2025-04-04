// 1. Calculate the sum of all values between range [a, b]
/**
 *  a b
 *  3 5
 * -1 2
 *  5 3 note: we want to start at b and end at a.
 */
function sum(a, b) {
  // check if a number is a number type and not NaN
  a = typeof a === "number" && !isNaN(a) ? a : 0;
  b = typeof b === "number" && !isNaN(b) ? b : 0;

  var total = 0;
  // different cases:
  if (a >= b) {
    for (var i = b; i <= a; i++) {
      total += i;
    }
  } else {
    for (var i = a; i <= b; i++) {
      total += i;
    }
  }
  console.log(total);
}

sum(1, "3"); // 1
sum(-2, 10); // 52
sum(1, 10); // 55
sum("a", "b"); // 0

// 2. Validate user name

function validateUsername(username) {
  var len = username.length;
  if (len < 4) {
    console.log("Username should not be less than 4 letters!");
  } else if (len <= 8) {
    console.log("Your username is acceptable.");
  } else {
    console.log("Username should not be greater than 8 letters!");
  }
}

var username = "twx0504";

validateUsername(username);

validateUsername("123");

validateUsername("Iamagoodboy1234");
