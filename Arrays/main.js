/**
 * Arrays!! 
 */

let arr = ['a', 'b', 'c', 'd', 'e'];

// slice method - returns a copy of a section from array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));

// splice method - removes elements from the array, can replace them, and returns the removed elements
//console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);

// reverse method - reverses the array, this method MUTATES the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// concat method - combines 2 or more arrays, does not mutate the original arrays
const letters = arr.concat(arr2);
console.log(letters);
// remember spread otion
console.log([...arr, ...arr2]);

// join - joins array elements together by a separator into a string
console.log(letters.join(' - '));

/**
 * the new at method
 */
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

// getting last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

// at also works on strings
console.log('Dallas'.at(0));

/**
 * forEach method
 */

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//     if (movement > 0) {
//         console.log(`Movement ${i + 1}: You deposited ${movement}`);
//     } else {
//         console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//     }
// }
// console.log('--- forEach ---');
movements.forEach(function(move, i, arr) {
    if (move > 0) {
        console.log(`Movement ${i + 1}: You deposited ${move}`);
    } else {
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
    }
});

/**
 * forEach method on sets and maps
 */


const currencies = new Map([
    ['USD', 'United States Dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Brittish Pound'],
]);

// Map
currencies.forEach(function(value, key, map) {
    console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, _, set) {
    console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, 
    and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀 */

function checkDogs(dogsJulia, dogsKate) {
    //const newDogsJulia = [...dogsJulia];
    const newDogsJulia = dogsJulia.slice(1, dogsJulia.length - 2);
    const combinedDogs = [...newDogsJulia, ...dogsKate];

    let retStr = '';
    combinedDogs.forEach(function(age, i) {
       if (age >= 3) {
        retStr = `Dog number ${i + 1} is an adult, and is ${age} years old`;
       } else {
        retStr = `Dog number ${i + 1} is still a puppy 🐶`;
       }

        console.log(retStr);
    });
}

checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);

/**
 * the map method
 */

const euroToUSD = 1.1;

const movementsUSD = movements.map(function(move) {
    return move * euroToUSD;
});

const movementsUSD2 = movements.map(move => move * euroToUSD);

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSD2);

const movementDesc = movements.map(function(move,i) {
    if (move > 0) {
        return `Movement ${i + 1}: You deposited ${move}`;
    } else {
        return `Movement ${i + 1}: You withdrew ${Math.abs(move)}`;
    }
});

console.log(movementDesc);

/**
 * Filter method
 */

const deposits = movements.filter(function(move) {
    return move > 0;
});
console.log(deposits);

const withdrawals = movements.filter(move => move < 0);
console.log(withdrawals);

/**
 * Reduce method
 */

const balance = movements.reduce(function(acc, value) {
    return acc += value;
}, 0);
console.log(balance);

// maximum value using reduce
const max = movements.reduce(function(acc, val) {
    if (acc > val) {
        return acc;
    } else {
        return val;
    }
}, movements[0]);

console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
function calcAverageHumanAge(ages) {
    const humanAges = ages.map(function(age, i) {
        if (age <= 2) {
            return 2 * age;
        } else {
            return 16 + age * 4;
        }
    });
    console.log('Human ages -> ', humanAges);

    const adultdogs = humanAges.filter(function(age, i) {
        return age >= 18;
    })
    console.log(adultdogs);

    const averageAge = adultdogs.reduce(function(acc, val) {
        return acc += val;
    },0) / adultdogs.length;

    console.log(averageAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

/**
 * Chaining methods
 */

// pipeline
const totalDepositsInUSD = movements
    .filter(move => move > 0)
    .map(move => move * euroToUSD)
    .reduce((acc, val) => acc + val);
console.log(totalDepositsInUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
function calcAverageHumanAge2(ages) {
    return ages
        .map(age => age <= 2 ? age * 2 : 16 + age * 4)
        .filter(age => age >= 18)
        .reduce((acc, val, i, arr) => acc + val / arr.length, 0);
}

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));

/**
 * The find method
 */

// Data
const account1 = {
    owner: 'Dallas McGroarty',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
const accounts = [account1, account2, account3, account4];

console.log(movements.find(move => move < 0));

const account = accounts.find(acc => acc.owner == 'Jessica Davis');
console.log(account);

/**
 * findIndex method
 */

const index = accounts.findIndex(acc => acc.pin === 2222);
console.log(index);
console.log(accounts[index]);

/**
 * Some method
 */

// returns for any element
const anyDeposits = movements.some(move => move > 1500);
console.log(anyDeposits);

/**
 * Every method
 * - only returns true if all elements satisfy the condition
 */
console.log(account4.movements.every(move => move > 0));

// separate callback
const deposit = move => move > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

/**
 * flat and flatmap
 */

const arr4 = [[1,2,3],[4,5,6],7,8];

// flat - only goes one level deep by default
console.log(arr4.flat());

// use depth parameter to flatten deeper arrays
const arrDeep = [[[1,2],3],[4,[5,6]],7,8]
console.log(arrDeep.flat(2));

// can extract object properties with map
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat()
console.log(allMovements);
const overallBalance = allMovements.reduce((acc,val) => acc + val, 0);
console.log(overallBalance);

// chained
const overallBalance2 = accounts.map(acc => acc.movements).flat().reduce((acc, val) => acc + val);
console.log(overallBalance2);

// flatmap - only goes one level deep
const overallBalance3 = accounts.flatMap(acc => acc.movements).reduce((acc, val) => acc + val);
console.log(overallBalance3);

/** 
 * sorting arrays
 */

// sort - sorts the array, mutates the array it is called on
const owners = ['Dallas','Bob','Tom','Billy'];

// by default sorts by string
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);
console.log(movements.sort());

// pass in function argument to compare by
// return < 0, A, B
// return > 0, B, A

// ascending
//movements.sort((a, b) => a - b);

movements.sort((a, b) => {
    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }
})

console.log(movements);

// descending
//movements.sort((a, b) => b - a);
movements.sort((a, b) => {
    if (a > b) {
        return -1;
    }

    if (b > a) {
        return 1;
    }
})

console.log(movements);

/**
 * more array methods
 */

// fill - fill array with some variable, can specify start and end indices
const x = new Array(7);
//x.fill(1)
//x.fill(1, 3);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z);

/**
 * When to use which array method--
 *
 * To mutuate the original array:
 *  - push, unshift, pop, shift, splice, reverse, sort, fill
 * 
 * To get a new array:
 *  - map, filter, slice, concat, flat, flatMap
 * 
 * To get an array index:
 *  - indexOf, findIndex
 * 
 * To get an array element:
 *  - find
 * 
 * To check if an element exists:
 *  - includes, some, every
 * 
 * To create a string from array
 *  - join
 * 
 * To transform array into a value
 *  - reduce
 * 
 * To loop array
 *  - forEach, for of
 */

/**
 * Array exercises
 */

// get all deposits
const totals = accounts.map(acc => acc.movements).flat().filter(move => move > 0).reduce((acc, val) => acc + val);
console.log(totals);

// number of deposits of $1000+
const depositsGT1000 = accounts.map(acc => acc.movements).flat().filter(move => move >= 1000).length;
console.log(depositsGT1000);

// object containing sum of deposits and of withdrawals
const sums = accounts.map(acc => acc.movements).flat().reduce((sums, cur) => {
    //cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
    sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
    return sums;
}, {deposits: 0, withdrawals: 0})

console.log(sums);

// title case
const convertTitleCase = function(title) {
    const expectations = ['a','an','the','but','or','on','in','with'];

    return title.toLowerCase().split(' ').map(function(char, i) {
        return char[0].toUpperCase() + char.slice(1);
    }).join(' ');
};  

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a longer NICER title'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, 
    simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, 
    and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). 
    Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];

// 1.
dogs.forEach(function(dog) {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 2.
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahsDog.curFood > sarahsDog.recommendedFood ? `Sarah's dog is eating too much` : `Sarah's dog is eating too little`);

// 3.
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood).map(dog => dog.owners).flat();
const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommendedFood).map(dog => dog.owners).flat();
console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
console.log(dogs.some(function(dog) {
    const lower = dog.recommendedFood * 0.9;
    const upper = dog.recommendedFood * 1.1;

    if (dog.curFood >= lower && dog.curFood <= upper) {
        return true;
    } else {
        return false;
    }
}));

// 7.
const dogsEatingOkay = dogs.filter(function(dog) {
    const lower = dog.recommendedFood * 0.9;
    const upper = dog.recommendedFood * 1.1;

    if (dog.curFood >= lower && dog.curFood <= upper) {
        return true;
    } else {
        return false;
    }
});
console.log(dogsEatingOkay);

// 8.
const dogsCopy = [...dogs].sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);