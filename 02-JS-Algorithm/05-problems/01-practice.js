// aaaabbbbcccddddddd
//

function longestRepeatingCharDP(str) {
  var currentChar = str[0];
  var currentCount = 1;
  var maxChar = "";
  var maxCount = 1;
  var i = 1;
  while (i < str.length) {
    if (str[i] === currentChar) {
      currentCount++;
    } else {
      if (currentCount > maxCount) {
        maxChar = currentChar;
        maxCount = currentCount;
      }
      currentChar = str[i];
      currentCount = 1;
    }
    i++;
  }

  if (currentCount > maxCount) {
    maxChar = currentChar;
    maxCount = currentCount;
  }

  return { char: maxChar, length: maxCount };
}
console.log(longestRepeatingCharDP("aaaabbbbcccddddddde"));

function longestRepeatingCharBF(str) {
  var len = str.length;
  var res = {
    char: "",
    length: 0,
  };
  var count;
  for (var i = 0; i < len; i++) {
    count = 0;
    for (var j = i; j < len; j++) {
    //   console.log(count);
      if (str[i] === str[j]) {
        count++;
      }
      if (str[i] !== str[j] || j === str.length - 1) {
        if (count >= res.length) {
          res.char = str[i]; // use i to get the char (because i is fixed, you could get different char.)
          res.length = count;
        }
        if (j < str.length - 1) {
          // for i that is not the last index
          i = j - 1;
        }
        break; // break the current loop (we are not going to search further)
      }
    }
  }

  return res;
}
console.log(longestRepeatingCharBF("aaaabbbbcccddddddde"));
