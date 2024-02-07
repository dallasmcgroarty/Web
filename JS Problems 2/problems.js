/***********
 * Coding Problems
 *  - custom problems
 */


/**
 *   Given a palindromic string of lowercase English letters palindrome, 
 *   replace exactly one character with any lowercase English letter so that the resulting string is not a palindrome,
 *   and that it is the lexicographically smallest one possible. Return the resulting string. 
 *   If there is no way to replace a character to make it not a palindrome, return an empty string.
 * 
 * @param {string} palindrome
 * @return {string}
 */
var breakPalindrome = function(palindrome) {
  const len = palindrome.length;
  if (len == 1) return '';

  for (let i = 0; i < Math.floor(len/2);i++) {
      if (palindrome[i] !== 'a') {
          return palindrome.substring(0,i) + 'a' + palindrome.substring(i+1);
      }
  }

  return palindrome.substring(0, len-1) + 'b';
};

breakPalindrome('--- break palindrome ---','abccba');