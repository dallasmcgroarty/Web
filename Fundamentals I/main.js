//let firstName = 'Dallas';
//console.log(firstName);

/** Data Types:
 * 1. Number - decimals, integers
 * 2. String - text, characters
 * 3. Boolean - true or false
 * 4. Undefiend - variable not yet defined, empty value
 * 5. Null - empty value
 * 6. Symbol(ES2015) - value that is unique, cannot be changed
 * 7. BigInt(ES2020) - larger integers than Number type can hold
 * 8. 
 */

console.log(typeof 'Dallas');
console.log(typeof 23);
console.log(typeof []);
console.log(typeof {num: 'num'});
console.log(typeof true);

let year;
console.log(year);

/**
 * Let, const, var
 * 
 * Let - use for variables you will be reassigning or will be assigned later
 * Const - for variables that will not be changed, and cannot be changed
 * Var - dont use it anymore, it is legacy
 */

let age = 30;
age = 31;

const birthYear = 1995;
//birthYear = 1990 // throws error because cannot be mutated

//const job; // throws error, needs an intial value

var job = 'programmer';
job = 'teacher';

/**
 * Operators
 */

let now = 2023;
let myAge = now - 1995;
let tomAge = now - 1990;
console.log('my age = ', myAge, '| tom age = ', tomAge);

// 2**3 = 2 to the power of 3
// * = multiplication
// / = division
console.log(myAge * 2, myAge / 2, 2 ** 3);

// concatenate with +
const firstName = 'Dallas';
const lastName = 'McGroarty';
console.log(firstName + lastName);
console.log(firstName + ' ' + lastName);

//assignment operators
let x = 10 + 5;
x += 10;
x *= 4;
x++;
x--;
console.log(x);

// comparison operators, >, <, >=, <=, ==
console.log(myAge > tomAge);
console.log(myAge < tomAge);

bmi = (mass, height) => {
    return mass / (height * height);
}

/**
 * Strings and template literals
 */

const firstName1 = 'Dallas';
const job1 = 'programmer';
const birthYear1 = 1995;
const year1 = 2023;

const dallas = "I'm " + firstName1 + ', a ' + (year1 - birthYear1) + ' year old ' + job1;
const dallas2 = `I'm ${firstName1}, a ${year1 - birthYear1} year old ${job1}`;
console.log(dallas);
console.log(dallas2);

/**
 * If / else
 */

const age1 = 28;
const age2 = 34;

if (age1 > age2) {
    console.log('age1 > age2');
} else {
    console.log('age2 > age1');
}

const birthYear2 = 1995;

let century;
if (birthYear2 <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);

/**
 * type conversion / type coercion
 */

const inputYear = '1991';
console.log(inputYear + 18) // concatenates 18 to 1991, coercion
console.log(Number(inputYear)); // convert string to number

console.log(Number('Dallas')); // returns NaN, Not a Number, fails to produce a new number, invalid number

console.log(String(23)); // convert number to string

// type coercion
console.log('I am ' + 23 + ' years old');

let n = '1' + 1; // '11'
n = n - 1; // 10
console.log(n);

/**
 *  Truthy and Falsy
 * 
 *  5 falsy values: 0, '', undefined, null, NaN
 */

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('dallas'));
console.log(Boolean({}));

/**
 * Equality Operators
 *  == vs. ===
 * 
 * ===, !== -> strict equality, compares values are exactly the same
 * ==, != -> loose equality, does type coercion
 */

const age3 = 28;

// strict
if (age3 === 28) console.log('you are 28 strict');

// loose
if (age3 == '28') console.log('you are 28 loose');

// const favoriteNum = prompt('What is your favorite number?');
// console.log(favoriteNum);

/**
 * Logical operators
 */
const hasLicense = true;
const hasGoodVision = false;

console.log(hasLicense && hasGoodVision);
console.log(hasLicense || hasGoodVision);
console.log(!hasLicense);

if (hasLicense && hasGoodVision) {
    console.log('You can drive');
} else {
    console.log('You may not drive');
}

/**
 * Switch statement
 * - similar to if / else, better to use when comparing more options/cases
 */

const day = 'wednesday';

switch(day) {
    case 'monday':
        console.log('it is monday');
        break;
    case 'tuesday':
        console.log('it is tuesday');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('wed and thurs we do the same thing');
        break;
    default:
        console.log('not a real day');
}

/**
 * Statement vs expressions
 * 
 * 3 + 4 - expression
 * 1990 - expression
 * true - expression
 * true && false - expression
 */

// statement
if (23 > 10) {
    const str = '23 is bigger';
}

/**
 * Ternary operator
 */

const age4 = 28;
age4 >= 21 ? console.log('You can drink alcohol legally') : console.log('You can not drink alcohol legally');

const legal = age4 >= 21 ? 'Legal' : 'Illegal';
console.log(legal);