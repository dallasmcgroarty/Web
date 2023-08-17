const dallas = {
    firstName: 'dallas',
    age: 28,

    getAge: function() {
        return this.age;
    },

    // arrow function doesn't get 'this' scope from object
    greet: () => {
        console.log(`Hey ${this.firstName}`)
    }
};

dallas.greet();
console.log(dallas.getAge());