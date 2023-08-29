/**
 * Object oriented programming
 */

const Person = function(firstName, birthYear) {
    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // never create a method inside a constructor function
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // };
};

const dallas = new Person('Dallas', 1995);
console.log(dallas);

// instanceof
console.log(dallas instanceof Person);


/**
 * Prototypes
 */
console.log(Person.prototype);

// add method with prototype
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};

dallas.calcAge();

console.log(dallas.__proto__);

console.log(dallas.__proto__ === Person.prototype);

// add property with prototype
Person.prototype.species = 'Homo Sapien';
console.log(dallas.species);
console.log(dallas.hasOwnProperty('firstName'));
console.log(dallas.hasOwnProperty('species'));

/**
 * Protypical inheritance on built in objects
 */

const arr = [1,1,1,2,2,2,3,3,3];
Array.prototype.unique = function () {
    return [...new Set(this)];
}

console.log(arr.unique());

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// 1.
const Car = function (make='',speed=0) {
    this.make = make;
    this.speed = speed;
}

// 2.
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
};

// 3.
Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(this.speed);
};

// 4. 

const car1 = new Car('BWM', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.accelerate();
car1.brake();

car2.brake();
car2.brake();


/**
 * Classes
 * 
 * 1. Classes are not hoisted
 * 2. Classes are first-class
 * 3. Classes are executed in strict mode
 */

// class expression
const PersonCl2 = class {};

// class declaration
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
        this.money = 10000;
    }

    // methods will be added to .prototype property
    // instance method
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    /**
     * Setters and Getters
     */
    get currentMoney () {
        return this.money;
    }

    set currentMoney (value) {
        this.money = value;
    }

    get age() {
        return 2037 - this.birthYear;
    }

    set fullName (name) {
        if (name.includes(' ')) {
            this._fullName = name;
        } else {
            console.log('Given name is not a full name.');
        }
    }

    get fullName () {
        return this._fullName;
    }

    /**
     * Static methods
     * - not available to instances of the class (objects)
     * - can only be called on the class itself
     */
    static hey () {
        console.log('Hey there');
    } 
}

const billy = new PersonCl('Billy', 2001);
console.log(billy);
billy.calcAge();

console.log(billy.money);

console.log(billy.currentMoney);

billy.currentMoney = 15000;
console.log(billy.money);

console.log(billy.age);
billy.fullName = 'Billy Bob';
console.log(billy.fullName);

/**
 * object create
 */

const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },
}

const lou = Object.create(PersonProto);
console.log(lou);
lou.name = 'Lou';
lou.birthYear = 2001;
lou.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
    constructor(make='',speed=0) {
        this.make = make;
        this.speed = speed;
    }

    brake () {
        this.speed -= 5;
    }

    accelerate () {
        this.speed += 10;
    }

    set speedUS (speed) {
        this._speedUS = speed * 1.6;
    }

    get speedUS () {
        return this._speedUS / 1.6;
    }
}

const newCar = new CarCl('Ford', 120);
newCar.accelerate();
newCar.accelerate();
newCar.accelerate();
newCar.brake();
newCar.speedUS = newCar.speed;
console.log(newCar.speedUS);

/**
 * Inheritance
 */

class PersonCl3 extends PersonCl {
    constructor(firstName, birthYear, course) {
        // use super to construct parent portion
        super(firstName, birthYear);
        this.course = course;
    }

    me () {
        console.log(this);

        // use super to call parent method, instead of this
        super.calcAge();
    }
}

const tom = new PersonCl3('Tom', 2002, 'Math');
console.log(tom);
tom.calcAge();
tom.me();


class Account {
    // public fields (instances)
    locale = navigator.locale;

    // private fields (instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
    }

    // public methods
    getMovements () {
        return this.#movements;
    }

    deposit (value) {
        this.#movements.push(value);
        return this;
    }

    withdraw (value) {
        this.deposit(-value);
        // return this to enable chaining methods
        return this;
    }

    balance () {
        return this.#movements.reduce((acc, value) => acc += value);
    }

    // private methods
    #approveLoan(val) {
        return true;
    }

    // static method (on the class itself, not instances)
    static helper() {
        console.log('Helper');
    }
}

const acc1 = new Account('Sean', 'USD', 2234);
acc1.deposit(500).deposit(300).deposit(250).withdraw(100);
console.log(acc1.balance());
console.log(acc1);
console.log(acc1.getMovements());
Account.helper();

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCl extends CarCl {
    #charge;

    constructor(make,speed, charge) {
        super(make,speed);
        this.#charge = charge;
    }

    accelerate() {
        super.accelerate();
        return this;
    }

    brake () {
        super.brake();
        return this;
    }

    chargeBattery() {
        this.#charge += 10;
        return this;
    }

    currentStatus() {
        console.log(`${this.make} going ${this.speed} with ${this.#charge}% battery`);
        return this;
    }
}

const ev = new EVCl('Rivian', 120, 23);
ev.accelerate().accelerate().accelerate().brake().brake().currentStatus();