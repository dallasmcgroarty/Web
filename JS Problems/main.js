function revStr(str) {
    var retStr = '';

    for (var elem of str) {
        retStr = elem + retStr;
    }

    return retStr;
}

console.log('reverse string -- ', revStr('hello'));
console.log('reverse string -- ', revStr('apple'));

function revStr2(str) {
    const arr = str.split('');
    arr.reverse();
    return arr.join('');
}

function palindrome(str) {
    var reversed = '';

    for (var char of str) {
        reversed = char + reversed;
    }
    if (str == reversed) {
        return true;
    } else {
        return false;
    }
}

console.log('palindrome -- ', palindrome('abba'));
console.log('palindrome -- ', palindrome('abbaa'));

function revInt(n) {
    var reversed = '';
    var strNum = String(n);
    var sign = null;

    if (strNum[0] == '-' || strNum[0] == '+') {
        sign = strNum[0];
        strNum = strNum.substring(1);
    }

    for(var num of strNum) {
        reversed = num + reversed;
    }

    if (sign) {
        reversed = sign + reversed;
    }

    return Number(reversed);
}

console.log('reversed int -- ', revInt(300));
console.log('reversed int -- ', revInt(322));
console.log('reversed int -- ', revInt(-56));

function maxChars(str) {
    var freq = {};

    for (var char of str) {
        if (freq[char]) {
            freq[char] += 1;
        } else {
            freq[char] = 1;
        }
    }

    var max = 0;
    var current = '';

    for (const item in freq) {
        if (freq[item] >= max) {
            max = freq[item];
            current = item;
        }
    }

    return current;
}

console.log('max character -- ', maxChars('abcccdd'));
console.log('max character -- ', maxChars('abcccddfffffee'));

function fib(n) {
    if (n == 1) {
        return 0;
    }

    if (n == 2) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
}

console.log('fibonacci (5)-- ', fib(5));
console.log('fibonacci (8) -- ', fib(8));

function fizzbuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log('fizzbuzz');
        } else if (i % 5 == 0) {
            console.log('buzz');
        } else if (i % 3 == 0) {
            console.log('fizz');
        } else {
            console.log(i);
        }
    }
}

fizzbuzz(15);

/**
 * array chunking
 * - given an array chunk size, divide the array into many subarrays where each subarray is of length size
 */

function chunk(arr, size) {
    let chunked = [];
    let subArr = [];
    let counter = 0;

    for (let item of arr) {
        subArr.push(item);

        if (counter == size - 1) {
            chunked.push(subArr);
            subArr = [];
            counter = 0;
        } else {
            counter += 1;
        }
    }
    
    if (subArr.length > 0) {
        chunked.push(subArr);
    }

    return chunked;
}

console.log('array chunking -- ', chunk([1,3,4,5,6,7,8], 2));
console.log('array chunking -- ', chunk([1,3,4,5,6,7], 2));
console.log('array chunking -- ', chunk([1,3,4,5,6,7,8], 3));

// using slice method
function chunk2 (arr, size) {
    let chunked = [];
    let index = 0;

    while(index < arr.length) {
        chunked.push(arr.slice(index, index + size));
        index += size;
    }

    return chunked;
}

console.log('array chunking 2 -- ', chunk2([1,3,4,5,6,7,8], 2));
console.log('array chunking 2 -- ', chunk2([1,3,4,5,6,7], 2));
console.log('array chunking 2 -- ', chunk2([1,3,4,5,6,7,8], 3));

/**
 * Anagrams
 * - check if two strings are anagrams of each other, a string is an anagram if it used the same characters
 *  in the same quantity
 */

function anagram(stringA, stringB) {
    let arr1 = stringA.toLowerCase().split('').sort().join('');
    let arr2 = stringB.toLowerCase().split('').sort().join('');

    if (arr1.length !== arr2.length || arr1 !== arr2) {
        return false;
    }

    return true;
}

console.log('anagram -- ', anagram('rail safety', 'fairy tales'));
console.log('anagram -- ', anagram('rail SAFETY', 'fairy tales'));
console.log('anagram -- ', anagram('hi there', 'bye there'));

// anagram charMap solution
function anagram2(stringA, stringB) {
    const aCharMap = buildCharMap(stringA);
    const bCharMap = buildCharMap(stringB);

    if (Object.keys(aCharMap).length !== Object.keys(bCharMap).length) {
        return false;
    }

    for (let char in aCharMap) {
        if (aCharMap[char] !== bCharMap[char]) {
            return false
        }
    }

    return true;
}

// helper function
function buildCharMap(str) {
    const charMap = {};

    for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
        charMap[char] = charMap[char] + 1 || 1;
    }

    return charMap;
}

console.log('anagram 2 -- ', anagram2('rail safetY', 'fairy tales'));

/**
 * Sentence capitalization
 * - function accepts a string and capitalized the first letter of each word then return the string
 */
// better solution 
function capitalize(str) {
    return str.split(' ').map((val, i) => val[0].toUpperCase() + val.slice(1)).join(' ');
}

// longer solution shows thought
function capitalize2(str) {
    let retStr = '';
    let word = '';
    for (let char of str) {
        if (char !== ' ') {
            word += char;
        } else {
            retStr += ' ' + word[0].toUpperCase() + word.slice(1);
            word = '';
        }
    }

    retStr += ' ' + word[0].toUpperCase() + word.slice(1);

    return retStr;
}

function capitalize3(str) {
    const words = [];

    for (let word of str.split(' ')) {
        words.push(word[0].toUpperCase() + word.slice(1));
    }

    return words.join(' ');
}

console.log('Capitalize -- ', capitalize('a short sentence'));
console.log('Capitalize -- ', capitalize('look, it is working!'));
console.log('Capitalize -- ', capitalize2('look, it is working!'));

/**
 * Printing steps
 * - write a function that accepts a positive number N.
 * the function should console log a step shape with N levels using the # character. Make sure the step has spaces on the right hand side.
 */

function steps(n) {
    let i = 0;

    while (i < n) {
        console.log('#'.repeat(i+1).padEnd(n, '-'));
        i += 1;
    }
    console.log('--- done ---')
}

function steps2(n) {
    for (let i = 0; i < n; i++) {
        let stair = '';

        for (let j = 0; j < n; j++) {
            if (j <= i) {
                stair += '#';
            } else {
                stair += '-'
            }
        }

        console.log(stair);
    }

    console.log('--- done ---')
}

function stepsRecursion(n, row = 0, stair = '') {
    if (n == row) {
        return;
    }

    if (n === stair.length) {
        console.log(stair);
        return stepsRecursion(n, row+1);
    }

    if (stair.length <= row) {
        stair += '#';
    } else {
        stair += '-';
    }

    stepsRecursion(n, row, stair);
}
//stepsRecursion(4);

steps2(5);

steps(2);
steps(3);
steps(4);

/**
 * Pyramid 
 * - write a function that accepts a positive number N. the function should console log a pyramid shape
 * with N levels using the # character. make sure the pyramid has spaces on both the left and right hand sides.
 * Ex n = 1
 *  '#'
 * n = 2
 *  ' # '
 *  '###'
 * n = 3
 *  '  #  '
 *  ' ### '
 *  '#####'
 */
console.log('--- pyramid ---');
function pyramid(n) {
    let mid = Math.floor((n * 2 - 1) / 2);

    for (let row = 0; row < n; row++) {
        let level = '';

        for (let col = 0; col < n * 2 - 1; col++) {
            if (col < mid - row || col > mid + row) {
                level += '-';
            } else {
                level += '#';
            }
        }

        console.log(level);
    }
}

function pyramidRecursive(n, row=0, level='') {
    if (row === n) {
        return;
    }

    if (level.length === 2 * n-1) {
        console.log(level);
        return pyramidRecursive(n, row + 1);
    }

    let mid = Math.floor((n * 2 - 1) / 2);
    let add;

    if (level.length < mid - row || level.length > mid + row) {
        add = '-';
    } else {
        add = '#'
    }

    return pyramidRecursive(n, row, level + add);

}
console.log('-pyramid recursive-');
pyramidRecursive(3);

console.log('-pyramid regular-');
pyramid(1);
pyramid(2);
pyramid(3);


/**
 * Return vowels
 * - write a function that returns the number of vowels used in a string. Vowels are the characters
 *  a, e, i, o, u
 */
console.log('--- vowels ---');
function vowels(str) {
    const vowels = ['a','e','i','o','u'];
    let num = 0;
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            num += 1;
        }
    }

    return num;
}

// regular expression version
function vowels2(str) {
    return str.match(/[aeiou]/gi) != null ? str.match(/[aeiou]/gi).length : 0;
}

console.log(vowels('Hi there!'));
console.log(vowels('why do you ask?'));
console.log(vowels('Why'));


/**
 * Matrix spiral
 * - write a function that accepts an integer N and returns a NxN spiral matrix
 * 
 * notes:
 *  - start top left [0][0], move right til end of row, move down til end of col, move left til end of row, move up til end of column, then repeat
 *  - increment counter at each move
 *  - after moving one whole row or col, increment or decrement the next row or col.
 */
console.log('--- sprial matrix ---')
function matrix(n) {
    let result = [];

    for (let i = 0; i < n; i++) {
        result.push([]);
    }

    let counter = 1;
    let startCol = 0;
    let endCol = n-1;
    let startRow = 0;
    let endRow = n-1;

    while (startCol <= endCol && startRow <= endRow) {
        // top row
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter;
            counter++;
        }
        startRow++;

        // right col
        for (let i = startRow; i <= endRow; i++) {
            result[i][endCol] = counter;
            counter++;
        }
        endCol--;

        // bottom row
        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter;
            counter++
        }
        endRow--;

        // start col
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter;
            counter++;
        }
        startCol++;
    }

    return result;
}

console.log(matrix(3));
console.log(matrix(4));


/**
 * Create an 'eventing' library out of the Events class. The Events class should have methods 'on', 'trigger', and 'off'
 */

class Events {
    #events

    constructor() {
        this.#events = {};
    }

    // register event handler
    on(eventName, callback) {
        if (this.#events[eventName]) {
            this.#events[eventName].push(callback);
        } else {
            this.#events[eventName] = [callback];
        }
    }

    // trigger all callbacks associated with given eventName
    trigger(eventName) {
        for (let event of this.#events[eventName]) {
            event();
        }
    }

    // remove all event handlers associated with eventName
    off(eventName) {
        delete this.#events[eventName];
        //this.#events[eventName] = [];
    }
}

const E = new Events();

E.on('click', function() {
    return 'Clickity click';
})

E.on('click', function() {
    return 'another click event';
})

E.on('scroll', function() {
    return 'scroll event';
})

E.trigger('click');

/**
 * Sorting!!
 */

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                // destructure array method
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

                // temp method
                // const lesser = arr[j+1];
                // arr[j+1] = arr[j];
                // arr[j] = lesser;
            }
        }
    }
    // return sorted array
    return arr;
}

console.log('--- bubble sort ---', bubbleSort([3,-4,0,20,15,8,33]));

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let indexOfMin = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[indexOfMin]) {
                indexOfMin = j;
            }
        }

        if (i !== indexOfMin) {
            [arr[i], arr[indexOfMin]] = [arr[indexOfMin], arr[i]];
        }
    }
    // return sorted array
    return arr;
}

console.log('--- selection sort ---', selectionSort([3,-4,0,20,15,8,33]));

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }

    const center = Math.floor(arr.length / 2);

    let left = arr.slice(0, center);
    let right = arr.slice(center);

    return merge(mergeSort(left), mergeSort(right));
    // return sorted array
}

function merge(left, right) {
    const result = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return [...result, ...left, ...right];
}

console.log('--- merge sort ---', selectionSort([3,-4,0,20,15,8,33]));