/**
 * more functions
 */

// default parameters

const bookings = [];

function createBooking(flightNum, numPassengers=10, price=100.00) {
    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking); 
}

createBooking('LH123', 50);

// passing by value vs passing reference
const flight = 'LH234';
const dallas = {
    name: 'Dallas',
    passport: 22323498
}

function checkIn(flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. Dallas'

    if (passenger.passport === 22323498) {
        console.log('Checked in');
    } else {
        console.log('Invalid passport');
    }
}

checkIn(flight, dallas);
// the passenger object gets changed, becaused it is passed by reference
console.log(flight, dallas);

function newPassport(person) {
    person.passport = Math.trunc(Math.random() * 1000000000);
}

newPassport(dallas);
checkIn(flight, dallas);

/**
 * first class functions vs higher order functions
 * - first class = functions act as another type of object
 * - higher order functions = a function that receives another function as an argument, or returns a new function or both
 */

/**
 * functions accepintg callback functions
 */

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};  

// higher order function
const transformer = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
}

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function() {
    console.log('high five');
}

//document.addEventListener('click', high5);

//['Dallas','Tim','Bob'].forEach(high5);

/**
 * functions returning functions
 */

const greet = function(greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

const greeterHey = greet('Hey');
greeterHey('Dallas');
greeterHey('Steven');

greet('Hello')('Dallas');

const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('Hi')('Dallas');

/**
 * Call and Apply methods
 */

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book: function(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`, name
        })
    }
}

lufthansa.book(239, 'Dallas');
lufthansa.book(635, 'Mike');
console.log(lufthansa.bookings);

const euroWings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: []
}

const book = lufthansa.book;

// does NOT work
//book(23,'Steve');

// call method - calls method of an object, substituting another object
book.call(euroWings, 23, 'Tom');
console.log(euroWings);

book.call(lufthansa, 239, 'Mary');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air',
    iataCode: 'LX',
    bookings: []
}

book.call(swiss, 583, 'Billy');
console.log(swiss);

// apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// just use call instead of apply and destructure array
//book.call(swiss, ...flightData);

/**
 * Bind method
 */
const bookEW = book.bind(euroWings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(246,'steven');
console.log(euroWings);

const bookEW23 = book.bind(euroWings, 23);
bookEW23('Barry');


// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}

//document.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(.1, 200));

const addVAT = addTax.bind(null, .23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. 
        Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. 
    If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. 
    If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
    question: 'What is your favorite programming language',
    options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),

    registerNewAnswer: function() {
        const answer = Number(prompt(`${this.question} \n ${this.options[0]} \n ${this.options[1]} \n ${this.options[2]} \n ${this.options[3]}`));

        if (isNaN(answer) || answer > 3 || answer == '') {
            alert('Invalid number!')
            return;
        }

        this.answers[answer] += 1;
        this.displayResults('string');
    },

    displayResults: function(type='array') {
        if (type == 'array') {
            console.log(this.answers);
        } else if (type == 'string') {
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
    }
}

document.querySelector('.btn').addEventListener('click', poll.registerNewAnswer.bind(poll));

/**
 * Immediately invoked function expressions (IIFE)
 */

const runOnce = function() {
    console.log('run once');
}
runOnce();

// IIFE
(() => {
    console.log('this only runs once!');
})();

/**
 * Closures
 * - a function has access to the variable environment of the execution in which it was created
 * - Closure - variable environment attached to the function, exactly as it was at the time and place the function was created
 */

const secureBooking = function() {
    let passengerCount = 0;
    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
};

// a function has access to the variable environment of the execution in which it was created
const booker = secureBooking();
booker();
booker();
console.dir(booker);

let f;

const g = function() {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};

const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    };
}
g();
f();

// re-assign f
h();
f();

// example 2
const boardPassengers = function(n, wait) {
    const perGroup = n / 3

    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups each with ${perGroup} passengers`)
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
}

boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, 
each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, 
and what that means for the variables involved in this example.

GOOD LUCK 😀
*/


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
