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