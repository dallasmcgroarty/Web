
/**
 * destructuring arrays
 */

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzaria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotta'],

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
    openingHours: {
        thu: {
            open: 12,
            close: 12
        },
        fri: {
            open: 11,
            close: 13
        },
        sat: {
            open: 0, // open 24 hours
            close: 24,
        }
    },

    // accept object as parameter and destructure it
    orderDelivery: function({starterIndex = 1, mainIndex = 0, time = '20:00', address}) {
        console.log(`Order  received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderPasta: function(ing1,ing2,ing3) {
        console.log(`Here is your pasta with ${ing1}, ${ing2}, and ${ing3}`);
    },
    
    orderPizza: function(mainIng, ...otherIngs) {
        console.log(mainIng);
        console.log(otherIngs);
    }
};

const test = [2, 3, 4];
const a = test[0];
const b = test[0];
const c = test[0];

const [x, y, z] = test;
console.log(x, y, z);

// add empty space to skip an element
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// swapping variables
// const temp = main;
// main = secondary;
// secondary = temp;

// swapping with array destructuring
[main, secondary] = [secondary, main]
console.log(main, secondary);

const [starter, mainItem] = restaurant.order(2, 0);

console.log(starter, mainItem);


// nested destructuring array
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i,j);

const [i, , [j, l]] = nested;
console.log(i, j, l);

// default values
const [p = 1, q = 1, r = 1] = [8, 9]
console.log(p, q, r);

/**
 * Destructuring objects
 */

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// change variable names while destructuring
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

// default values
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

// mutating variables
let e = 111;
let f = 999;

const obj = {e: 23, f:7, c:14};

({ e, f } = obj);
console.log(e,f);


// nested destructuring object
const {fri: {open: op, close: clo}} = openingHours;
console.log(op, clo);

// using object as argument to later be destructured by function
restaurant.orderDelivery({
    time: '22:30',
    address: 'Via Del Sol, 21',
    mainIndex: 2,
    starterIndex: 2
});


restaurant.orderDelivery({
    address: 'Via Del Sol, 21',
    starterIndex: 2
});

/**
 * Spread operator
 * - works on iterables - arrays, strings, maps, sets
 * - works for copying objects now
 */

const arr = [7,8,9];
const newArr = [1,2, ...arr];
console.log(newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays
const joinedArr = [...restaurant.mainMenu, ...newArr];
console.log(joinedArr);

// turn string to array and add more elements
const str = 'Dallas';
const letters = [...str, ' ', 'M.'];
console.log(letters);

// join array elemetns to a string
const str1 = letters.join('');
console.log(str1);

const ings = ['tomata','lemon','basil'];

// passing spread array as argument
restaurant.orderPasta(...ings);

// Objects
const newRestaurant = {...restaurant, founder: 'Dallas'};
console.log(newRestaurant);

// shallow copy
const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
restaurantCopy.openingHours.fri.open = 10;
console.log(restaurantCopy.name);
console.log(restaurant.name);
console.log(restaurantCopy.openingHours.fri.open);
console.log(restaurant.openingHours.fri.open);

/**
 * Rest pattern and parameters
 */

// SPREAD becayse ... is on right side of =
const arr2 = [1,2, ...[3,4]];

// REST, because ... is on left side of =
const [g, o, ...others] = [1,2,3,4,5];
console.log(g,o,others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);

// Objects
const {sat, ...weekdays} = restaurant.openingHours;
console.log(weekdays);

// Functions
// using spread allows arbitrary number or arguments to be passed to the function
const add = function(...nums) {
    let sum = 0;

    for(let n of nums) {
        sum += n;
    }

    return sum;
}

console.log(add(1,2,3));
const arr3 = [23,5,7];
console.log(add(...arr3));

restaurant.orderPizza('mushrooms','onion','olives','spinach');

/**
 * Short circuiting && and ||
 * - use any data type, return any data type, short-circuiting
 */

console.log(3 || 'Dallas');
console.log(0 || 'Dallas');

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests? restaurant.numGuests : 10;
console.log(guests1);

// || short-circuiting, returns first truthy value
const guests2 = restaurant.numGuests || 12;
console.log(guests2);

// && short-circuiting, returns first falsy value

console.log(3 && 'Dallas');
console.log(0 && 'Dallas');
console.log(null && 'Dallas');

// nullish coalescing operator
// short-circuits the same as && but evaluates based on nullish values
// nullush: null and undefined (NOT 0 or '')
const guests3 = restaurant.numGuests ?? 10;
console.log(guests3)

// logical assignment operators
const rest1 = {
    name: 'Capri',
    numGuests: 20,
};

const rest2 = {
    name: 'La Piazza',
    owner: 'Giovanni',
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// OR assignemnt operator ||=
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;

// nullish asignment operator ??= (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator &&=
rest1.numGuests &&= 10;
rest2.numGuests &&= 10;

console.log(rest1);
console.log(rest2);

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. 
    For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, 
    along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
};

// 1
const [players1, players2] = game.players;
console.log(players1, players2);

// 2
const [gk, ...fieldPlayers] = players1;
console.log(gk,fieldPlayers);

// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4
const players1Final = [...players1, 'Thiago','Coutinho','Perisic'];
console.log(players1Final);

// 5
const {team1, x: draw, team2} = game.odds;
console.log(team1,draw,team2);

// 6
function printGoals (...players) {
    for (let name of players) {
        console.log(name)
    }

    console.log(`Goals scored: ${players.length}`);
}

printGoals('Tom','Bob','Carl');
printGoals(...game.scored);

// 7
console.log(team1 < team2);

/**
 * For of loops
 */

const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu2) {
    console.log(item);
}

// .entries(), returns array of index and item ex. [0, 'pizza']
for (const item of menu2.entries()) {
    console.log(`${item[0]+1}: ${item[1]}`);
}

// split index and elem
for (const [i, el] of menu2.entries()) {
    console.log(`${i + 1}: ${el}`);
}

/**
 * Looping Objects
 */

// object keys
const props = Object.keys(openingHours);
console.log(props);

for (const day of Object.keys(openingHours)) {
    console.log(day);
}

// object values
const values = Object.values(openingHours);
console.log(values);

// object entries - key and value pairs returned
for (const [key, value] of Object.entries(openingHours)) {
    console.log(key, value);
}

// destructure key and value objects
for (const [key, {open, close}] of Object.entries(openingHours)) {
    console.log(key, open, close);
}

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1
for (const [i, el] of game.scored.entries()) {
    console.log(`Goal ${i+1}: ${el}`);
}

// 2
let sum = 0;
for (const value of Object.values(game.odds)) {
    sum += value;
}
const average = sum / Object.values(game.odds).length;
console.log(average);

// 3
for (const [key, value] of Object.entries(game.odds)) {
    if (key === 'x') {
        console.log(`Odd of draw: ${value}`)
    } else {
        console.log(`Odd of ${game[key]}: ${value}`)
    }
}

// 4
let obj1 = {};
for (const player of game.scored) {
    if (obj1[player]) {
        obj1[player] += 1;
    } else {
        obj1[player] = 1;
    }
}
console.log(obj1);

/**
 * Sets
 * - cannot have duplicates
 * - accepts any iterable
 * - no indexes
 * - should not be used if a value is needed from the set
 * - use to check if elem is in the set, or to get size of unique elements
 * - use arrays if you want to manipulate the data, have duplicates, etc ...
 */

const ordersSet = new Set(['Pasta','Pizza','Pizza','Risotto','Pasta','Pizza']);

console.log(ordersSet);

// set with a string
console.log(new Set('Dallas'));

// get set size
console.log(ordersSet.size);

// check if an element is in the set
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

// add to a set, duplicates will not be added
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');

// delete element from set
ordersSet.delete('Risotto');

console.log(ordersSet);

for (const order of ordersSet) {
    console.log(order);
}

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// use spread to unpack set and get array of only unique elements
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// get unique elements size
console.log(new Set(staff).size);

// count unique letters in a string
console.log(new Set('Dallas').size);

/**
 * Maps
 * - map values to keys
 */

// create map
const rest3 = new Map();

// add element to map, accepts a key value pair
rest3.set('name', 'Classico Italiano');
rest3.set(1, 'Firenze, Italy');

// set also returns the map
console.log(rest3.set(2, 'Lisbon, Portugal'));

// allows chaining sets because it returns the map
rest3.set('categories', ['Italian', 'Pizzaria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'We are open').set(false, 'We are closed');

// get element from map by key
console.log(rest3.get('name'));
console.log(rest3.get(true));
console.log(rest3.get(1));

const time = 21;
console.log(rest3.get(time > rest3.get('open') && time < rest3.get('close')));

// check if key exists
console.log(rest3.has('categories'));

// delete key, value pair
rest3.delete(2);
console.log(rest3);

// get map size
console.log(rest3.size);

// get all values from map
console.log(rest3.values());

// get all keys from map
console.log(rest3.keys());

// clear the map
//rest3.clear();

const question = new Map([
    ['question', 'What is the best programming language?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['Correct', 3],
    [true, 'Correct'],
    [false, 'Wrong!']
]);
console.log(question);

// convert object to map example
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// example question game using map
console.log(question.get('question'));
for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

//const answer = Number(prompt('Your answer'));

//console.log(question.get(question.get('Correct') === answer));

// convert map to array
console.log([...question]);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. 
The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

// 1.
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
gameEvents.delete(64);

// 3.
console.log(
    `An event happened, on average, every ${90 / gameEvents.size} minutes`
  );

// 4.
for (const [key,value] of gameEvents) {
    let half = '';
    if (key <= 45) {
        half = '[FIRST HALF]';
    } else {
        half = '[SECOND HALF]';
    }
    
    console.log(`${half} ${key}: ${value}`);
}