# Array API

## 01 Head & Tail Operations

> mutate original array.

| Methods                                        | Description                                                                                                          |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Array.prototype.push(element, ...elementsN)    | add one or more items to the end of an array. <br/> return value: new length                                         |
| Array.prototype.pop()                          | remove the last item of an array. <br/> return value: the removed element or undefined if the array is empty.        |
| Array.prototype.unshift(element, ...elementsN) | add one or more items to the beginning of an array. <br/> return value: new length                                   |
| Array.prototype.shift()                        | remove item from the beginning of an array. <br/> return value: the removed item or undefined if the array is empty. |

## 02 CRUD (Create, Read, Update, Delete) Operations of an Array

| Use                    | Methods                                               | Description                                                                              | Mutate Original Array? |
| ---------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------- |
| Read                   | Array.prototype.slice(\[start], \[end])               | returns a shallow copy of a portion of an array <br/> end is not included.               | No                     |
| Create, Update, Delete | Array.prototype.splice(start, deleteCount, ...itemsN) | changes the content of an array by removing, replacing, or adding new elements in place. | Yes                    |



**Array.prototoype.slice([start], [end])**

> the extraction process always proceeds from left to right.
> regardless of the sign of starts and end (+ve+ve, -ve-ve, +ve-ve), as long as the elements fall within the bounds of start and end, elements within the range can be extracted.
> If start index > end index, then it returns an empty array.
> end index is not included.
> start index and end index points to the same position of the array, it returns an empty array.

**Array.prototoype.splice(start, deleteCount, ...itemsN)**

> find index, delete, and then add elements.
> the insertion happens at index, the element previously at index will be shifted to the right.
> add: deleteCount = 0
> - add to the end of an array: index = arr.length
> - add to the beginning of an array: index = -arr.length or 0.
> delete: do not specify itemsN
> replace: how many items to delete from index? What are new items to replace old ones?

## 03 Array & String Conversion

> do not mutate original array.

| Methods                           | Description                                                                                                                                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Array.prototype.join([separator]) | create and return a new string by concatenating all the elements with a comma or a specific separator if specified. <br/> If the array contains only one element, it will return the string of it without a separator. |
| Array.prototype.toString()        | returns a string represented the array. <br/> internally call join method. <br/> if join method is unavailable or is not a function, `Object.prototype.toString` is used and returns `[object Array]`                  |

> Array.prototype.toString recursively converts each element, including other arrays to strings.
> - this results in string representation of a flattened array.
> - note: string concatenation with array invokes toString!
> - e.g., when str is going to concatenate with arr, it is like: `str += arr + separator; -> str += arr.toString() + separator`


**String Instance Methods**

| Methods                                  | Description                                                                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| String.prototype.split(pattern, [limit]) | split a string based on specific pattern, and returns an array of those splitted substrings.                                                                                                                         |
| String.prototype.charAt(index)           | return a new string representing the character based on index given. <br/> each index represents a single UTF-16 code unit. <br/> for character whose code point > 65535 you need to extract charAt(i) + charAt(i+1) |


> A string is similar to an array.
>
> - each character can be accessed using index.
> - string can be traversed like an array.
>
> note: string behaves like array-like when it is wrapped with a wrapper object but it is technically not an array-like object because it is not an object.

## 04 Array Element Checking Methods

| Methods                                                       | Description                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Array.prototype.indexOf(elem, fromIndex = 0)                  | find the index of the first element found                              |
| Array.prototype.lastIndexOf(elem, fromIndex = arr.length - 1) | find the index of the last element found. </br> it searches backwards. |
| Array.prototype.includes(elem, fromIndex)                     | check if element exists in the array.                                  |

> note: indexOf compares elem with arr item based on strict equality (`===`).

## 05 Array Concatenation & Reverse

| Methods                            | Description                                                   | Mutate Original Array? |
| ---------------------------------- | ------------------------------------------------------------- | ---------------------- |
| Array.prototype.concat(...valuesN) | merge two or more values / arrays and return a new array.     | No                     |
| Array.prototype.reverse()          | reverse an array and returns the reference to the same array. | Yes                    |


## 06 Filtering Array Elements

> do not mutate original arrays

| Methods                                   | Description                                                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Array.prototype.filter(callback, thisArg) | return a shallow copied portion of the array containing only elements that pass the test implemented by callback. |
| Array.prototype.find(callback, thisArg)   |                                                                                                                   |

> callback is used to test each array element.
> We can write much more complex logic that suits our need.
> Note: any changes we make to the element inside the callback will not reflect on the final return result.
> Caveat: when the element of the callback received is a reference type, changing the reference data type will modify the item in the original array!

## 07 Sorting Array

> mutate original arrays

| Methods                        | Description                                                   |
| ------------------------------ | ------------------------------------------------------------- |
| Array.prototype.sort(callback) | sort the elements and return the reference to the same array. |


> if callbackfn is not provided, each item of the array is converted to string and compare based on UTF-16 code unit (unicode) order.

> function callback(elementA, elementB) {}
>
> - elementA: prev element
> - elementB: next element
> 
> if the return value of the callback is > 0, the exchange happens.
> `return a - b` : sort in ascending / increasing order.
> `return b - a` : sort in descending / decreasing order.


## 09 Array Traversal

> do not mutate original arrays

| Methods                                    | Description                                                  |
| ------------------------------------------ | ------------------------------------------------------------ |
| Array.prototype.forEach(callback, thisArg) | execute callback for each array item. <br/> return undefined |

> Caveats:
> 1. forEach loop cannot be terminated.
>
> - break: throw syntax error because callback is a function, not a loop.
> - return: only terminate the callback, not the loop. The next iteration is still continued.
> 2. Do not delete element inside forEach. It would result in skipping one or more elements.
>
> - recommended to use for loop / for ... in loop / ... if you want to have more fine-tune control over the loop.
> 3. Adding element inside callback during forEach execution will not be visited. 
> 


> Benefits:
> - It provides better and clear structure when we operate on arrays compared to the traditional for loop.

> Note: for loop has better performance compared to forEach 
> - due to:
>   - call to callback, even when the callback does nothing.
>   - this binding
>   - prototype chain searching