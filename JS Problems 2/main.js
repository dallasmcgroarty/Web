/***********
 * Coding Problems
 *  - strings, arrays, integers
 */


/**
 * Reverse string
 * 
 * @param {String} str 
 */
function reverse(str) {
  let revStr = '';

  for (let char of str) {
    revStr = char + revStr;
  }

  return revStr;
}

// alt version 2
function reverse2(str) {
  const arr = str.split('');
  arr.reverse();
  return arr.join('');
}

// alt version 3
function reverse3(str) {
  return str.split('').reduce((reversed, char) => {
    return char + reversed 
  }, '');
}

console.log('--- reverse string ---', reverse('hello'));

console.log('--- reverse string 2 ---', reverse('hello'));

console.log('--- reverse string 3 ---', reverse3('hello'));


/**
 * Determine if string is a Palindrome, return true else false
 * 
 * @param {String} str 
 */
function palindrome(str) {
  let reversed = '';

  for (let char of str) {
    reversed = char + reversed;
  }

  return reversed == str;
}

function palindrome2(str) {
  const reversed = str.split('').reverse().join('');

  return reversed == str;
}

console.log('--- palindrome ---', palindrome('abba'));
console.log('--- palindrome ---', palindrome('aba'));
console.log('--- palindrome ---', palindrome('abcdef'));
console.log('--- palindrome 2 ---', palindrome2('racecar'));


/**
 * Reverse integer, keep sign if negative
 * 
 * @param {Number} n 
 */
function reverseInt(n) {
  let sign = '';
  let stringNum = n + '';
  let reversed = '';

  if (stringNum[0] == '-') {
    sign = stringNum[0];
    stringNum = stringNum.slice(1);
  }

  for (let elem of stringNum) {
    reversed = elem + reversed;
  }

  return Number(sign + reversed);
}

function reverseInt2(n) {
  const reversed = n
    .toString()
    .split('')
    .reverse()
    .join('');

  return parseInt(reversed) * Math.sign(n);
}

console.log('--- reverse int ---', reverseInt(-431));
console.log('--- reverse int ---', reverseInt(234));


/**
 * Given a string, return the character that is most commonly used in the string.
 * 
 * @param {String} str 
 */
function maxChars(str) {
  let frequency = {};

  for (let char of str) {
    if (frequency[char]) {
      frequency[char] += 1;
    } else {
      frequency[char] = 1;
    }
  }

  let max = '';
  let curMax = 0;

  for (let char in frequency) {
    if (frequency[char] > curMax) {
      curMax = frequency[char];
      max = char;
    }
  }

  return max;
}

console.log('--- max characters ---', maxChars('aaadddbbfffff'));
console.log('--- max characters ---', maxChars('apple 1133333322'));


/**
 * Fizzbuzz, logs the numbers from 1 to n. But for multiples of 3 print 'fizz', for multiples of 5 print 'buzz', 
 *  for number which are multiples of both 3 and 5 print 'fizzbuzz'.
 * @param {*} n 
 */
function fizzBuzz(n) {
  console.log('--- fizzbuzz ---');

  for (let i = 1; i <= n; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      console.log('fizzbuzz');
    } else if (i % 3 == 0) {
      console.log('fizz');
    } else if (i % 5 == 0) {
      console.log('buzz');
    } else {
      console.log(i);
    }
  }
}

//fizzBuzz(15);


/**
 * Given an array and chunk size, divide the array into many subarrays where each subarray is of length size
 * 
 * @param {Array} array 
 * @param {Number} size 
 */
function chunk(array, size) {
  let chunk = [];
  let subArrays = [];

  let count = 0;
  for (let x of array) {
    if (count == size) {
      subArrays.push(chunk);
      chunk = [];
      count = 0
    }

    chunk.push(x);
    count += 1;
  }

  if (chunk.length > 0) {
    subArrays.push(chunk);
  }

  return subArrays;
}

console.log('--- chunk array ---', chunk([1,2,3,4], 2));
console.log('--- chunk array ---', chunk([1,2,3,4,5,6,7,8], 3));


/**
 * Check to see if two string are anagrams of each other.
 * One string is an anagram of another if it uses the same characters in the same quantity
 * Only consider characters, not spaces or punctuation
 * Consider capital same as lowercase
 * 
 * @param {String} stringA 
 * @param {String} stringB 
 */
function anagrams(stringA, stringB) {
  const punc = [',','.','-','!',':',';'];
  const freqA = frequency(stringA);
  const freqB = frequency(stringB);

  for (let char in freqA) {
    if (freqA[char] != freqB[char]) {
      return false;
    }
  }

  return true;
}

// alt version, split and sort string into arrays then compare
function anagrams2(stringA, stringB) {
  const a = stringA
    .toLowerCase()
    .replaceAll('!','')
    .split('')
    .sort();

  const b = stringB
    .toLowerCase()
    .replaceAll('!','')
    .split('')
    .sort();

  return a == b;
}

function frequency(str) {
  let freq = {};
  const punc = [',','.','-','!',':',';', ' '];
  str = str.toLowerCase();

  for (let el of str) {
    if (punc.includes(el)) continue;

    if (freq[el]) {
      freq[el] += 1;
    } else {
      freq[el] = 1;
    }
  }

  return freq;
}

console.log('--- anagrams ---', anagrams('rail safety', 'fairy tales'));
console.log('--- anagrams ---', anagrams('RAIL! SAFETY!', 'fairy tales'));
console.log('--- anagrams ---', anagrams('hi there', 'bye there'));
console.log('--- anagrams 2 ---', anagrams('RAIL! SAFETY!', 'fairy tales'));


/**
 * Capitalize first letter of each word in the string
 * return the capitalized string
 * 
 * @param {String} str 
 */
function capitalize(str) {
  let words = [];

  for (let word of str.split(' ')) {
    words.push(word[0].toUpperCase() + word.slice(1));
  }

  return words.join(' ');
}

// alt version, split string to array, map over it and assign new string to each element then join together
function capitalize2(str) {
  return str.split(' ').map((val, i) => {
    return val[0].toUpperCase() + val.slice(1)
  }).join(' ');
}

console.log('--- capitalize ---', capitalize('a short sentence'));
console.log('--- capitalize 2 ---', capitalize2('a lazy fox'));