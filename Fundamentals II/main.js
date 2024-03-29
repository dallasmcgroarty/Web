/**
 * Functions
 */

function logger() {
    console.log('Dallas');
}

// calling / running / invoking function
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

const appleJuice = fruitProcessor(23, 40);
console.log(appleJuice);

/**
 * Function declaration vs function expression
 */

// Function declaration - can call function anywhere in scope
function calcAge(birthYear) {
    return 2023 - birthYear;
}

const age = calcAge(1995);
console.log(age);

// Function expression - can only call function after defined
const calcAge1 = function (birthYear) {
    return 2023 - birthYear;
}

const age1 = calcAge1(1995);
console.log(age1);

/**
 * Arrow functions
 */

const calcAge2 = birthyear => 2023 - birthyear;
console.log(calcAge2(1995))

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2023 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1995, 'Dallas'));

/**
 * Intro Arrays
 */

const friends = ['john','timmy','steven'];
console.log(friends);

const years = new Array(2001,2002,2003,2004);
console.log(years);
console.log(friends[0]);
console.log(friends[1]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

/**
 * Array operations
 */

// push, add to end of array
const friends2 = ['john','timmy','steven'];
friends2.push('tony');
console.log(friends2);

// unshift, add to beginning of array
friends2.unshift('billy');
console.log(friends2);

// pop, remove last element from array
friends2.pop();
const popped = friends2.pop(); // also returns removed element
console.log(popped);
console.log(friends2);

// shift, remove first element from array
friends2.shift();
console.log(friends2);

console.log(friends2.indexOf('timmy'));
console.log(friends2.indexOf('bob')); // returns -1 if element not in array

// includes, returns true of false if element in array or not
// - uses strict equality
console.log(friends2.includes('timmy'));
console.log(friends2.includes('bob'));

/**
 * Intro Objects
 */

const dallas = {
    firstName: 'Dallas',
    lastName: 'McGroarty',
    age: 28,
    birthYear: 1995,
    friends: ['john','timmy','steven'],
    hasDriverLicense: true,

    calcAge3: function(birthYear) {
        return 2023 - birthYear;
    },

    calcAge4: function() {
        return 2023 - this.birthYear;
    }
}

console.log(dallas);
console.log(dallas.firstName);
console.log(dallas.friends);
console.log(dallas['age']);

const nameKey = 'Name';
console.log(dallas['first' + nameKey]);

dallas.location = 'US';
dallas['twitter'] = '@dallasmcg';
console.log(dallas);

console.log(dallas.calcAge3(1995));
console.log(dallas.calcAge4());

/**
 * Loops
 */

const dallas2 = [
    'dallas',
    'mcgroarty',
    [1,2,3],
    28
]

for (let rep = 1; rep <= 10; rep++) {
    //console.log(rep);
}

for (let i = 0; i < dallas2.length; i++) {
    console.log(dallas2[i]);
}

// for of
// for (let elem of dallas2) {
//     console.log(elem);
// }

// reverse loop with inner loop
for (let i = dallas2.length - 1; i >= 0; i--) {
    console.log(dallas2[i]);

    for (let i = 1; i < 6; i++) {
        console.log(i);
    }
}

// while loop
let rep = 1
while (rep <= 10) {
    console.log(`rep ${rep}`);
    rep++
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(dice);
    dice = Math.trunc(Math.random() * 6) + 1;
}