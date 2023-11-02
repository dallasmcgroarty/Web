/**
 * two sum
 * - Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *  You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *  You can return the answer in any order.
 */
function twoSum(nums, target) {
    let mp = new Map();

    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (mp.has(diff)) {
            return [i, mp.get(diff)]
        }

        mp.set(nums[i], i);
    }
};

/**
 *  Is palindrome
 * - Given an integer x, return true if x is a palindrome, and false otherwise.
 * 
 * @param {Number} x 
 * @returns {Boolean}
 */
function isPalindrome(x) {
    var revStr = '';
    for (let char of x+'') {
        revStr = char + revStr;
    }
    return revStr == x+'';

    // using different method comparing both ends moving inward
    // let str = x+'';
    // for (let i = 0; i < Math.floor(str.length / 2); i++) {
    //     if (str[i] !== str[str.length - i - 1]) {
    //         return false;
    //     }
    // }
    // return true;
};

/**
 * You are given two integer arrays of equal length target and arr. In one step, you can select any non-empty subarray of arr and reverse it. 
    You are allowed to make any number of steps.
    Return true if you can make arr equal to target or false otherwise.

 * @param {Array} array_a 
 * @param {Array} array_b
 * @returns {Boolean} 
 */
function areTheyEqual(array_a, array_b){
    // Write your code here

    array_a.sort()
    array_b.sort()

    if (array_a.join(',') == array_b.join(',')) {
        return true;
    }

    return false;

    // one line solution
    return array_a.sort().join(',') == array_b.sort().join(',');
}

let aa = [1, 2, 3, 4];
let bb = [1, 4, 3, 2];

console.log(areTheyEqual(aa,bb));


/**
 * Contiguous subarrays
 * You are given an array arr of N integers. For each index i, you are required to determine the number of contiguous subarrays that fulfill the following conditions:
    - The value at index i must be the maximum element in the contiguous subarrays, and
    - These contiguous subarrays must either start from or end on index i
 * Output = An array where each index i contains an integer denoting the maximum number of contiguous subarrays of arr[i]
 * @param {Array} arr 
 */
function countSubarrays(arr) {
    let counts = [];

    // loop through array
    for (let i = 0; i < arr.length; i++) {
        // at each element, count itself once as a subarray
        let count = 1;

        // look backwards in array add 1 to current subarrays if a value is less than arr[i], else stop
        if (arr[i - 1]) {
            let j = i - 1;
            while (j >= 0 && arr[j] < arr[i]) {
                count += 1;
                j -= 1;
            } 
        }

        // look forwards in array add 1 to current subarrays if a value is less than arr[i], else stop
        if (arr[i + 1]) {
            let k = i + 1;
            while (k >= 0 && arr[k] < arr[i]) {
                count += 1;
                k += 1;
            }
        }

        counts.push(count);
    }

    // return subarrays count array
    return counts;
}

let a1 = [3, 4, 1, 6, 2];
console.log(countSubarrays(a1));

// helper function for rotationalCipher
function rotating(num, factor, type) {
    let lower;
    let upper;
    switch (type) {
        case 'upper':
            lower = 65;
            upper = 90;
            break;
        case 'lower':
            lower = 97;
            upper = 122;
            break;
        case 'number':
            lower = 48;
            upper = 57;
            break;
        default:
            break;
    }

    while (factor > 0) {
        if (num == upper + 1) {
            num = lower;
        }

        num += 1;
        factor -= 1;
    }

    return num;
}

/**
 * One simple way to encrypt a string is to "rotate" every alphanumeric character by a certain amount. 
 * Rotating a character means replacing it with another character that is a certain number of steps away in normal alphabetic or numerical order.
   For example, if the string "Zebra-493?" is rotated 3 places, the resulting string is "Cheud-726?". 
    Every alphabetic character is replaced with the character 3 letters higher (wrapping around from Z to A), 
    and every numeric character replaced with the character 3 digits higher (wrapping around from 9 to 0). Note that the non-alphanumeric characters remain unchanged.

    Given a string and a rotation factor, return an encrypted string.

 * @param {String} input 
 * @param {Number} rotationFactor 
 * @returns {String}
 */
function rotationalCipher(input, rotationFactor) {
    const A = 65
    const Z = 90
    const a = 97
    const z = 122
    const ZERO = 48
    const NINE = 57
    
    let output = '';

    for (let char of input) {
        let numChar = char.charCodeAt(0);
        let converted;

        if (numChar <= 90 && numChar >= 65) {
            converted = (numChar + rotationFactor) > 90 ? rotating(numChar, rotationFactor, 'upper') : numChar + rotationFactor;
            output += String.fromCharCode(converted);
        } else if (numChar <= 122 && numChar >= 97) {
            converted = (numChar + rotationFactor) > 122 ? rotating(numChar, rotationFactor, 'lower') : numChar + rotationFactor;
            output += String.fromCharCode(converted);
        } else if (numChar <= 57 && numChar >= 48) {
            converted = (numChar + rotationFactor) > 57 ? rotating(numChar, rotationFactor, 'number'): numChar + rotationFactor;
            output += String.fromCharCode(converted);
        } else {
            output += char;
        }
    }

    return output;
}


let cypherIn = 'Zebra-493?';
let cypherIn2 = 'abcdZXYzxy-999.@';
console.log(rotationalCipher(cypherIn, 3));
console.log(rotationalCipher(cypherIn2, 200));

/**
 * Given an array of integers nums, return the number of good pairs. 
 *  A pair (i, j) is called good if nums[i] == nums[j] and i < j.
 * 
 * hint - sum formula = Count how many times each number appears. If a number appears n times, then n * (n – 1) // 2 good pairs can be made with this number.

 * @param {Number[]} nums
 * @return {Number}
 */
var numIdenticalPairs = function(nums) {
    let freq = {};
    let pairs = 0;

    for (let num of nums) {
        if (freq[num]) {
            freq[num] += 1;
        } else {
            freq[num] = 1;
        }
    }

    for (let num in freq) {
        pairs += Math.floor(freq[num] * (freq[num] - 1) / 2);
    }

    return pairs;
};


/**
 * Return the subset A, in increasing order where the sum of A's elements is greater than the sum of B's elements.
 * If more than one subset exists, return the one with the maximal sum.
 * 
 * @param {Array} arr 
 * @returns {Array}
 */
function subsetA(arr) {
    // Write your code here
    // sort array since order doesn't matter and we can get highest values from the end
    // create 2 arrays A and B to compare, while A holds highest values 
    arr.sort((a,b) => a - b);
    let a = [];
    let sumA = 0;
    let sumArr = 0;
    
    for (let num of arr) {
        sumArr += num;
    }
    
    while (arr.length) {
        let last = arr.pop();
        a.unshift(last);
        
        sumArr = sumArr - last;
        sumA += last;
        
        if (sumA > sumArr) {
            return a;
        }
    }
}

console.log(subsetA([5,3,2,4,1,2,5,7,4,9,11]));

/**
 * Given a time in -hour AM/PM format, convert it to military (24-hour) time.

    Note: - 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
    - 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.
 */
function toMilitary(s) {
    // Write your code here
    let time = s.split(':');
    let timeOfDay = time[time.length-1].substring(2);
    time[time.length-1] = time[time.length-1].substring(0,2);
    let mTime = '';
    
    if (timeOfDay == 'PM' && Number(time[0]) == 12) {
        mTime = time.join(':');
    } else if (timeOfDay == 'AM' && Number(time[0]) == 12) {
        time[0] = '00';
        mTime = time.join(':');
    } else if (timeOfDay == 'PM' && Number(time[0]) >= 1) {
        time[0] = ''+(Number(time[0]) + 12);
        mTime = time.join(':');
    } else {
        mTime = time.join(':');
    }
    console.log(mTime);
    return mTime;
}

