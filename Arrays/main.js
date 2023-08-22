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