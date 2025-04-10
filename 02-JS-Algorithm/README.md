# JS Algorithm

## 01-Basic Algorithm

### 1.1 Accumulator

> initialize 0 to a variable.
> to find the cumulative sum of values.
> find the pattern of each item with the loop variable (i).

```js
var sum = 0; // Accumulator

for (var i = 0; i < n; i++) {
    sum += item;
}
```

### 1.2 Multiplier

> initialize 1 to a variable.

```js
var product = 1; // Multiplier

for (var i = 0; i < n; i++) {
    product *= item; // you need to find pattern for this item.
}
```

### 1.3 Brute Force Method

> aka exhaustive search.
> each possible value within a given range is taken out and checked against the given conditions.
>
> - if a value met the conditions, it is considered a valid solution.
> **Tip:**
> - Think of what you can do to reduce the range of exhaustive search.
> - Find the relationship between the outer loop and inner loop.

#### 1.3.1 Application

##### 1.3.1.1 Narcissistic Number / Armstrong Number / Pluperfect Digital Invariant (PPDI)

> **Requirements:**
>
> - n must be 3 digits
> - hundreds ** 3 + tens ** 3 + ones ** 3 = n

> **Methods**
> 1. Mathematical Method
> 2. String Method.

> **Extra:**
> String.prototype.charAt()
> - returns a character whose value < 65535.
> - higher code points are represented in a pair of 16-bit surrogate.
> - to retrieve value > 65535 we need charAt(i) + charAt(i + 1)
> - for most use case, charAt is fine but you need to know its limitation.
```js
var a = "我爱你";
console.log(a.charAt(0));
console.log(a.charAt(1));
console.log(a.charAt(2));
var emoji = "🌍";
console.log(emoji.charAt(0) + emoji.charAt(1));
// Safer method
console.log(String.fromCodePoint(emoji.codePointAt(0)));

```


##### 1.3.1.2 Prime Number

> **Requirements:**
> - The first prime number starts with 2.
> - divisible by 1 and itself.

##### 1.3.1.3 Chicken & Rabbit

> given heads.
> given legs.
> find the mathematical representation:
>  let a => chicken
>  let b => rabbits
> a + b = heads
> 2a + 4b = legs

> Tip:
> - find the relationship of the number of chicken and rabbit.
> - b = heads - a
> - iterate from 0 to heads.
> - check `2a + 4b = legs`.
> - return a & b if the condition is met.


## 02-Bubble Sort

- O(n^2) time complexity

> idea: 
> - Each turn, compare every two adjacent elements.
> - Swapping the order when the right element appears to be greater than the left one.
> - Otherwise, the position remains unchanged.
> - At the end of each turn, move the largest number from the unordered area to the end position.

> E.g., [1, 5, 3, 2, 6]

| Index | Turn | Comparison Count | Ordered Area Count |
| ----- | ---- | ---------------- | ------------------ |
| 0     | 1st  | 4                | 1                  |
| 1     | 2nd  | 3                | 2                  |
| 2     | 3rd  | 2                | 3                  |
| 3     | 4th  | 1                | 4                  |


> arr.length = 5
> totalTurn: arr.length - 1
> - condition: i = 0; i < arr.length - 1
> comparison count: arr.length - currentIndex - 1
> - condition: j = 0; j < arr.length - i - 1

```js
var arr = [22, 1, 5, 3, 2, 6, 77, 11, 3, 12, 50];

var len = arr.length;
// Control turns.
for (var i = 0; i < len - 1; i++) {
  // Control the comparison count.
  for (var j = 0; j < len - i; j++) {
    // When left element > right element, swapping happens.
    if (arr[j] > arr[j + 1]) {
      // Swapping logic.
      var temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;

      // XOR Swapping logic.
      // arr[j] = arr[j] ^ arr[j + 1];
      // arr[j + 1] = arr[j] ^ arr[j + 1];
      // arr[j] = arr[j] ^ arr[j + 1];
    }
  }
}

```

### 2.1 Bubble Sort V2

- use assumption method.

> Assume the array is sorted (isSorted = true).
> If swapping occurs, the array is not fully sorted (isSorted = false).
> Break out the loop if there's no swaps happen in a full pass (meaning: the comparison logic is not entered).
> remember the isSorted is reset.

### 2.2 Bubble Sort V3

> build on top of V2.
> find the index of the element during last exchange in every turn. (index = j)
> sortedBorder = index (where index is the index of element during last exchange)
> in next turn, the inner loop (represents the comparison counts) will run up to index before sortedBorder. (j < sortedBorder)

## 03-Complexity

> refers to the computation time / amount of computation and memory space required during the program execution regardless of the code simplicity.
>
> - amount of computation (**time complexity**): the amount of time for an algorithm to get the result.
> - memory space (**space complexity**): the memory space used by the algorithm to get the result.
> time and space complexity are two important criteria for evaluating the quality of an algorithm.
> complexity refers to an **order of magnitude**.
>
> - computation time and memory space is something that we cannot know precisely.
> - we can only represents them using the order of magnitude (which category or range of size they fall into)

```js
var sum = 0;
for (var i = 0; i < n; i++) {
  sum += i;
}

// n is not known.
// n = 10
// n = 100
// n = 1000
// n = 1 billions?!
// with different value of n, the time taken is different.
```

### 3.1 Time Complexity

> based on the number of executions.
> the absolute time is impossible to estimate.
>
> - affected by many factors such as runtime environment & the amount of input.

| Time Complexity | Description                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O(1)            | the number of executions are countable, regardless of input size n.                                                                                                             |
| O(logn)         | the logarithm of the input n. <br/> if n = 100, then log100 = 10 executions <br/> the problem size is reduced by a common factor (commonly halved) with each step.              |
| O(n)            | the number of executions are linearly proportional to the input size. <br/> if input is n, then the amount of computation could be 1n, 2n, 3n, etc. <br/> single for loop is n. |
| O(n*logn)       | the number of execution = n * logn. <br/> if n = 100, then 100 * log 100 => 100 * 10 = 1000 executions. <br/> for loop (n) + binary search (logn)                               |
| O(n**2)         | the number of executions  = n ** 2. <br/> if n = 100, then the number of executions is 10000. <br/> nested for loop is n**2.                                                    |

> note: 
> 
> - O(1), O(logn), O(n) are considered good.
> - In real time project, O(n**2) is acceptable provided the input size is relatively small.
> - everything is dependent on case by case basis.
> - other time complexity like O(m + n), O(n^3), O(mn), O(2^n), O(n!)

### 3.2 Space Complexity

> refers to the **extra** space the algorithm uses relative to the input size.
> note: the input will naturally get bigger if it gets bigger. but we are talking about the extra space.

> In frontend development, we prioritize time complexity over space complexity.
> we want to present the UI the fastest time possible.
> Even performance optimisation is more about time / speed.
> Frontend is run on the browser, so the memory space is more than enough.

> similar to time complexity.
> common space complexity: O(1) & O(n)


## 04-Recursion

> recursion: functions continues to call itself with smaller input each time.
> only when the recursion hit the terminating condition, it will not return the result.
> breaking big problem into smaller ones.

> Tips:
> 1. If a problem is solvable using recursion?
> 2. Can it be broken down into smaller but similar problems?
> 3. What is the terminating conditions?




**Deep Clone**

```js
// Deep clone an array recursively.
// Time: O(n), Space: O(n) — n is the total number of elements including nested ones.
function deepClone(arr) {
  if (!Array.isArray(arr)) return;
  var result = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result.push(deepClone(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

var arr = [1, 2, [3, 4, 9, ["A", "B"]]];
var arr2 = deepClone(arr);
arr2[0] = "B";
arr2[2][0] = "A";
arr2[2][3][0] = "C";
console.log(arr, arr2);

// O(n) time: Although recursion may look like nested loops,
// each element is visited only once, including those in nested arrays.
// Therefore, the total time complexity is O(n), where n is the total number of elements.

// O(n) space: A new array is created for each nested level, and each element is copied once.
// The recursion depth depends on the nesting level, which is usually less than n.
// So the total space complexity is also O(n).

```

## 05 Stack

- a data structure follows the LIFO (Last In First Out) 

### 5.1 Implementation of Stack

- Stack is a logical structure (an abstraction), while an array is a physical strucuture (something existed in your computer!).
- We can implement stack using array.

> operation: push() & pop()

> `[ 1, 2 ,3, 4, 5]   <- push`
> `[ 1, 2 ,3, 4, 5]   -> pop`


## 06 Binary Search

> in each turn, the search range is halved.
> calculate mid index.
> check nums[mid] > target i = mid + 1
> check nums[mid] < target j = mid - 1


> O(logn) time O(1) space
> loop
> recursion
>
> Note: Generally, loop has better performance than loop.
> Note: brute force search has better performance over binary search if the input array is small.

## 07 Longest Repeating Characters

> brute force
> - involves skip steps
```js
function longestRepeatingSequence(str) {
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
          res.char = str[i]; // use i. i is fixed, j might get different char.
          res.length = count;
        }
        if (j < len - 1) { // when j is not the last item index. (Avoid infinite loop)
          i = j - 1;
        }
        break; // break inner loop when different char is met, we are not going to search further.
      }
    }
  }
  return res;
}
```

> double pointer

```js
function longestRepeatingSequenceDP(str) {
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
    if (str[i] !== str[j] || i === str.length - 1) { // check difference OR the last item
      if (res.length < count) {
        res.char = str[j];
        res.length = count;
      }

      count = 0; // Reset count
      j = i; // move j to i

      // Do not put i-- outside conditionals i < str.length - 1, it causes infinite loops.
      // if i = str.length - 1 (23) -> i -- => 22 -> i++ => 23 
      // if i = str.length - 1 (23) -> i -- => 22 -> i++ => 23 
      // if i = str.length - 1 (23) -> i -- => 22 -> i++ => 23 
      // ...
      // Infinite loop
      if (i < str.length - 1) { // Correct i for i other than the last item index.
        i--;
      }
    }
    i++;
  }
  return res;
}
```

## 08 Quick Sort

> O(nlogn) time when the best, the worst might not reach O(logn)
> - outer for loop (n)
> - inner divide and conquer (logn)
> O(n) space note that the first time: lefts + mids + rights = arr
> find any number as pivot. Usually we use midpoint.
> termination condition: when arr.length === 0 / 1 return arr (do not sort)
> prepare lefts, mids, rights arrays.
> use arr.splice / arr.slice to get pivot.
> loop through the entire array.
>
> - `arr[i] > pivot` push to rights
> - `arr[i] < pivot` push to lefts
> - `arr[i] === pivot` push to mids
>
> return quickSort(lefts).concat(pivot, mids, quickSort(rights)) -> some extra overheads in arr.concat.


**Double Pointers**
> O(nlogn) best time (On^2 worst time) but it is faster than implementation using splice / slice.
> O(n) space
> - select leftmost element as pivot
> - terminating condition: left >= right return undefined
> - pivot partitioning: 
>   - requirement: 
>   - i = 0
>   - j = arr.length - 1
>   - outer loop: condition: i < j
>   - inner loop: (Note: we search right to left first, otherwise the partitioning is failed because there's case when i === j such that `nums[i] === nums[j] > nums[left]` and the swapping of the bigger number to the leftmost could happens.)
>     - swaps elements >= pivot to the right (search right to left)
>     - j -- when elements are already bigger than pivot.
>     - swaps elements <= pivot to the left. (search left to right)
>     - i ++ when elements are already smaller than pivot.
>     - swap `arr[i]` & `arr[j]`
>   - swap `arr[i]` with `leftmost element` (exit outer loop means now i === j)
>   - return i
> - quickSort(i, p - 1)
> - quickSort(p + 1, j)

> further optimisation: implement getMedianOfThree & doing quickSort on smallest subarray.