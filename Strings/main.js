/**
 * Strings
 */

const airline = 'TAP Air Portugal';
const plane = 'A320';

// get character by index
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

// String methods

// indexOf - get index of a character, returns first occurence
console.log(airline.indexOf('r'));

// lasIndexof - gets index of a character, returns last occurence
console.log(airline.lastIndexOf('r'));

// indexOf searching for whole word
console.log(airline.indexOf('Portugal'));

// Slice - extract section of a string, accepts start and end, otherwise begins at 0
// - returns a new string
// - doesn't include end index in return string
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

// extract first word
console.log(airline.slice(0, airline.indexOf(' ')));

// extract last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// using negative beginning, extract starting from the end
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));
console.log(airline.slice(-5));

// 
const checkMiddleSeat = function(seat) {
    // B and E are middle seats
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E') {
        console.log('Middle Seat');
    } else {
        console.log('Not Middle Seat');
    }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// toLowerCase
console.log(airline.toLowerCase());

// toUpperCase
console.log(airline.toUpperCase());

// fix capitalization of name
const passenger = 'dAllaS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// compare emails
const email = 'dallas@gmail.com';
const loginEmail = '  Dallas@Gmail.com \n';

const lowerEmail = loginEmail.toLowerCase();

// trim - removes leading and trailing white space and newlines
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail ===  email);

// replace characters
const priceGB = '288,97P';
const priceUS = priceGB.replace('P', '$').replace(',','.');
console.log(priceUS);

const announce = 'All passengers come to boarding door 23. Boarding door 23!';

// replace all occurences
console.log(announce.replaceAll('door', 'gate'));

// regular expression in replace
console.log(announce.replace(/door/g, 'gate'));

// booleans
const plane1 = 'A320neo';
console.log(plane1.includes('A320'));
console.log(plane1.includes('Boeing'));

// starts with
console.log(plane1.startsWith('Air'));
console.log(plane1.startsWith('A3'));

// ends with
console.log(plane1.endsWith('neo'));

// practice exercise
const checkBaggage = function(items) {
    let baggage = items.toLowerCase();

    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('You are not allowed on board');
    } else {
        console.log('Welcome aboard!');
    }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Snacks and a gun');

// split method - splits string into array based on separator
const testStr = 'here+there+string+nice';
console.log(testStr.split('+'));

console.log('Dallas Mcg'.split(' '));

const [firstName, lastName] = 'Dallas Mcg'.split(' ');
console.log(firstName, lastName);

// join method - joins array elements into a string
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function(name) {
    let splitName = name.split(' ');
    let retName = [];
    for (let item of splitName) {
       // retName.push(item[0].toUpperCase() + item.slice(1));
        retName.push(item.replace(item[0], item[0].toUpperCase()));
    }
    console.log(retName.join(' '));
};

const passenger1 = 'jessica ann smith davis';
capitalizeName(passenger1);

// padding - add characters to beginning or end of string
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));

const maskCreditCard = function(number) {
    const str = number + '';
    const lastFour = str.slice(-4);
    return lastFour.padStart(str.length, '*');
}

console.log(maskCreditCard(2348903843408));
console.log(maskCreditCard('343204583432843444'));
console.log(maskCreditCard(1234567));

// repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(3));

const planesInLine = function(n) {
    console.log(`There are ${n} planes in line ${'>'.repeat(n)}`);
}

planesInLine(5);
planesInLine(10);

console.log(['hello', 'on'].reverse());

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀 */

function camelCase(str) {
    let splitLines = str.trim().split('\n');
    // [camel_word,camel_word]

    for (let [i,word] of Object.entries(splitLines)) {
        let splitWord = word.trim().split('_');
        // [camel,word]
        let camelWord = splitWord[0].toLowerCase() + splitWord[1][0].toUpperCase() + splitWord[1].slice(1);
        console.log(camelWord.padEnd(20) + '✅'.repeat(Number(i)+1));
    }
}

document.querySelector('.btn').addEventListener('click', function(e) {
    camelCase(document.querySelector('.textarea').value);
});

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

for (const flight of flights.split('+')) {
    let [type, from, to, time] = flight.split(';');

    if (type.startsWith('_Delayed')) {
        type = '🔴 ' + type.split('_')[1] + ' ' + type.split('_')[2];
    } else {
        type = type.split('_')[1];
    }

    from = from.slice(0,3).toUpperCase();
    to = to.slice(0,3).toUpperCase();
    time = time.replace(':','h');

    console.log(`${type} from ${from} to ${to} (${time})`.padStart(45));
}