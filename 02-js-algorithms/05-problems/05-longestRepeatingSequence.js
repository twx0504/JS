var str = "aaabbccddfffffff";

function longestRepeatingSequence(str) {
  var charToCount = {};
  var len = str.length;
  var count;
  for (var i = 0; i < len; i++) {
    count = 0;
    if (charToCount[str[i]] === undefined) {
      charToCount[str[i]] = 0;
    }
    for (var j = i; j < len; j++) {
      if (str[i] === str[j]) {
        count++;
      } else {
        break;
      }
    }
    if (count >= charToCount[str[i]]) {
      charToCount[str[i]] = count;
    }
  }

  return charToCount;
}

function longestRepeatingSequenceV1(str) {
  var res = {
    char: "",
    length: 0,
  };
  var len = str.length;
  var currentCount;
  for (var i = 0; i < len; i++) {
    // Reset currentCount
    currentCount = 0;
    for (var j = i; j < len; j++) {
      if (str[i] === str[j]) {
        currentCount++;
      } else {
        break;
      }
    }
    if (currentCount >= res.length) {
      res.char = str[i];
      res.length = currentCount;
      // ensure the next outer loop iteration is correct. After this line, i++ will run, and continue next outer loop iteration. This ensure no letter will be skipped.
      i += currentCount - 1;
    }
  }

  return res;
}

function longestRepeatingSequenceV2(str) {
  var res = {
    char: "",
    length: 0,
  };
  var len = str.length;
  var count;
  for (var i = 0; i < len; i++) {
    // Reset count
    count = 0;
    for (var j = i; j < len; j++) {
      if (str[i] === str[j]) {
        count++;
      }
      if (str[i] !== str[j] || j === len - 1) {
        if (count >= res.length) {
          res.char = str[i]; // use i here, i is fixed, j could get different char!
          res.length = count;
        }
        if (j < len - 1) {
          i = j - 1;
        }
        break;
      }
    }
  }
  return res;
}
// console.log(longestRepeatingSequence(str));
// console.log(longestRepeatingSequence("aaabbccddaaaaaffffdddddfdddd"));

// /**
//  * Double Pointer
//  */

function longestRepeatingSequenceDPV1(str) {
  var i = 0;
  var j = 0;
  var res = {
    char: "",
    length: 0,
  };
  var count = 0;
  while (i < str.length) {
    if (str[i] === str[j]) {
      count++;
    }

    // when i === str.length - 1 (last item index) it enter here.
    if (str[i] !== str[j] || i === str.length - 1) {
      // When the continuous substring appears at the end.
      // e.g., aabbccccccccc; since after c there's no different char, so we need i === str.length - 1 to enter this condition for checking.
      if (res.length < count) {
        res.char = str[j];
        res.length = count;
      }

      count = 0; // reset count
      j = i; // move j to i.

      // if i -- is put here, it causes infinite loop because
      // e.g.,
      // i = 23 (last item) j = 23 i = 22 (due to i-- here)
      // i = 23 j = 23 i = 22 (due to i-- here)
      // ... infinite loop

      // when i is not the last item index.
      if (i < str.length - 1) {
        i--;
      }
    }
    i++;
  }
  return res;
}
console.log(longestRepeatingSequenceDPV1("aaabbcccccdddfffffffff"));

function longestRepeatingSequenceDPV2(str) {
  if (str.length === 0) return { char: "", length: 0 };
  var currentChar = str[0]; // first character as the current char
  var currentCount = 1; // start the count at 1.
  var maxChar = "";
  var maxCount = 1;

  for (var i = 1; i < str.length; i++) {
    // i starts with 1.
    if (str[i] === currentChar) {
      currentCount++;
    } else {
      if (currentCount > maxCount) {
        maxCount = currentCount;
        maxChar = currentChar;
      }
      currentCount = 1; // reset
      currentChar = str[i]; // reset
    }
  }

  // When the longest continuous substring happens to be at the end, we need to check it after loop.
  // Because the loop terminating when i = str.length
  // It has no time to update the maxCount and maxChar as the loop has been terminated.
  // The middle part substring has no problem.
  if (currentCount > maxCount) {
    maxCount = currentCount;
    maxChar = currentChar;
  }
  return { char: maxChar, length: maxCount };
}

console.log(longestRepeatingSequenceDPV2("aaabbcccccddddddddddfffffffffe"));
