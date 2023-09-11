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