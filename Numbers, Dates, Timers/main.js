/**
 * Numbers Dates Timers
 */

// conversion
console.log(Number('23'));
console.log(+'23');

// parsing
console.log(Number.parseInt('30px', 10)); // success
console.log(Number.parseInt('e23', 10)) // fails

console.log(Number.parseInt('2.5rem')); // only returns whole integer
console.log(Number.parseFloat('2.5rem')); // returns decimal

// check not a number
console.log(Number.isNaN(20));
console.log(isNaN('20'));
console.log(isNaN('hello'));

console.log(isFinite(20));
console.log(isFinite(20 / 0));

console.log(Number.isInteger(22));
console.log(Number.isInteger(22.3));

/**
 * Math and rounding
 */

// square root
console.log(Math.sqrt(25));
console.log(25 ** (1/2));

// cubic root
console.log(8 ** (1/3));

// max value
console.log(Math.max(5,18,23,11,2));

// min value
console.log(Math.min(5,18,23,11,2));

// random number
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(5,25));


// rounding integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.4));
console.log(Math.round(23.8));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.8));

console.log(Math.floor(23.3));
console.log(Math.floor(23.7));

// rounding decimals
// toFixed() always returns a string
console.log((2.7).toFixed(2));
console.log((2.777776).toFixed(4));
console.log(+(2.777776).toFixed(2));

/**
 * Remainder operator
 */

console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3); 
console.log(8 / 3); // 8 = 3 * 2 + 2

console.log(6 % 2);

const isEven = n => n % 2 === 0;
const isOdd = n => n % 2 !== 0;

console.log(isEven(8));
console.log(isEven(11));
console.log(isEven(514));

/**
 * Numeric separators
 */

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

/**
 * BigInt
 */

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// end with n to create a bigint
console.log(4934934304304394304394334n);

console.log(BigInt(49349343043043));

/**
 * Dates
 */

// creating dates
const now = new Date();
console.log(now);

const date1 = new Date('Aug 02 2020 18:05:41');
console.log(date1);

const date2 = new Date('December 24, 2015');
console.log(date2);

// year, month (zero based), day, hour, minute, second
const date3 = new Date(2037, 10, 19, 15, 23, 5);
console.log(date3);

const date4 = new Date(2037, 10, 31);
console.log(date4);

const date5 = new Date(0);
console.log(date5);

// working with dates
console.log('---- working with dates ----');
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.toUTCString());
console.log(future.toDateString());
console.log(future.toLocaleString());
console.log(future.getTime());

console.log(new Date(future.getTime()));

// current timestamp
console.log(Date.now());

// set 
future.setFullYear(2040)
console.log(future);

/**
 * operations with dates
 */

const future1 = new Date(2037, 10, 19, 15, 23);
console.log(future1);

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)));

/**
 * timers
 */

const ingredients = ['olives', 'spinach'];
// set timeout
const pizzaTimer = setTimeout(
    (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 
    3000, 
    ...ingredients);

// clear timeout based on comparison
if (ingredients.includes('olives')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function() {
    const now = new Date();
    //console.log(now);
}, 1000);

