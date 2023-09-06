/**
 *  Queue
 * - create a queue class with add and remove functionality
 */

class Queue {
    #data;

    constructor() {
        this.#data = [];
    }

    add(val) {
        this.#data.unshift(val);
    }

    remove() {
        return this.#data.pop();
    }

    first() {
        return this.#data[this.#data.length-1];
    }

    last() {
        return this.#data[0];
    }

    show() {
        return this.#data;
    }
}

console.log('--- Queue ---');
const q = new Queue();
q.add(1);
q.add(2);
q.add(3);
q.add(4);
console.log(q.show());
q.remove();
console.log(q.last());
console.log(q.first());
console.log(q.show());

/**
 *  Weave
 * - implement weake function
 * - weave receives to queues and combines them into a new third queue
 * - only use add, remove and peek (or first method)
 */
console.log('--- queue weave ---');
function weave(q1,q2) {
    const returnQ = new Queue();

    while (q1.first() || q2.first()) {
        if (q1.first()) {
            returnQ.add(q1.remove());
        }
        
        if (q2.first()) {
            returnQ.add(q2.remove());
        }
    }


    return returnQ;
}

const testQ1 = new Queue();
const testQ2 = new Queue();
testQ1.add(1);
testQ1.add(2);
testQ2.add('hi');
testQ2.add('there');
testQ2.add('the');
testQ2.add('te');

console.log(weave(testQ1,testQ2));



/**
 *  Stack
 * - create a stack class with add and remove functionality
 */

class Stack {
    #data;

    constructor() {
        this.#data = [];
    }

    add(val) {
        this.#data.push(val);
    }

    remove() {
        return this.#data.pop();
    }

    top() {
        return this.#data[this.#data.length-1];
    }

    show() {
        console.log(this.#data);
    }
}

console.log('--- Stack ---');
const stack = new Stack();
stack.add(1);
stack.add(2);
stack.add(3);
stack.add(4);
stack.show();
stack.remove();
console.log(stack.top());
stack.show();

console.log('--- Queue from stacks ---')
/**
 * Create Queue from Stack
 * 
 * - implement a queue  data structure using two stacks. Do not create an array inside the queue class.
 *   The queue should implement methods 'add', 'remove', and 'peek'
 * 
 */

class QueueStack {
    #stack1 = new Stack();
    #stack2 = new Stack();

    constructor() {
    }

    add(val) {
        this.#stack1.add(val);
    }

    remove() {
        while (this.#stack1.top()) {
            this.#stack2.add(this.#stack1.remove())
        }

        this.#stack2.remove();
    }

    peek() {
        while (this.#stack1.top()) {
            this.#stack2.add(this.#stack1.remove())
        }

        return this.#stack2.top();
    }
}

const qs = new QueueStack();
qs.add(1);
qs.add(2);
qs.add(3);
qs.remove();
console.log(qs.peek());