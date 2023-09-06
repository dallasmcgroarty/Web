function revStr(str) {
    var retStr = '';

    for (var elem of str) {
        retStr = elem + retStr;
    }

    return retStr;
}

console.log('reverse string -- ', revStr('hello'));
console.log('reverse string -- ', revStr('apple'));

function revStr2(str) {
    const arr = str.split('');
    arr.reverse();
    return arr.join('');
}

function palindrome(str) {
    var reversed = '';

    for (var char of str) {
        reversed = char + reversed;
    }
    
    if (str == reversed) {
        return true;
    } else {
        return false;
    }
}

console.log('palindrome -- ', palindrome('abba'));
console.log('palindrome -- ', palindrome('abbaa'));

function revInt(n) {
    var reversed = '';
    var strNum = String(n);
    var sign = null;

    if (strNum[0] == '-' || strNum[0] == '+') {
        sign = strNum[0];
        strNum = strNum.substring(1);
    }

    for(var num of strNum) {
        reversed = num + reversed;
    }

    if (sign) {
        reversed = sign + reversed;
    }

    return Number(reversed);
}

console.log('reversed int -- ', revInt(300));
console.log('reversed int -- ', revInt(322));
console.log('reversed int -- ', revInt(-56));

function maxChars(str) {
    var freq = {};

    for (var char of str) {
        if (freq[char]) {
            freq[char] += 1;
        } else {
            freq[char] = 1;
        }
    }

    var max = 0;
    var current = '';

    for (const item in freq) {
        if (freq[item] >= max) {
            max = freq[item];
            current = item;
        }
    }

    return current;
}

console.log('max character -- ', maxChars('abcccdd'));
console.log('max character -- ', maxChars('abcccddfffffee'));

function fizzbuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log('fizzbuzz');
        } else if (i % 5 == 0) {
            console.log('buzz');
        } else if (i % 3 == 0) {
            console.log('fizz');
        } else {
            console.log(i);
        }
    }
}

fizzbuzz(15);

/**
 * array chunking
 * - given an array chunk size, divide the array into many subarrays where each subarray is of length size
 */

function chunk(arr, size) {
    let chunked = [];
    let subArr = [];
    let counter = 0;

    for (let item of arr) {
        subArr.push(item);

        if (counter == size - 1) {
            chunked.push(subArr);
            subArr = [];
            counter = 0;
        } else {
            counter += 1;
        }
    }
    
    if (subArr.length > 0) {
        chunked.push(subArr);
    }

    return chunked;
}

console.log('array chunking -- ', chunk([1,3,4,5,6,7,8], 2));
console.log('array chunking -- ', chunk([1,3,4,5,6,7], 2));
console.log('array chunking -- ', chunk([1,3,4,5,6,7,8], 3));

// using slice method
function chunk2 (arr, size) {
    let chunked = [];
    let index = 0;

    while(index < arr.length) {
        chunked.push(arr.slice(index, index + size));
        index += size;
    }

    return chunked;
}

console.log('array chunking 2 -- ', chunk2([1,3,4,5,6,7,8], 2));
console.log('array chunking 2 -- ', chunk2([1,3,4,5,6,7], 2));
console.log('array chunking 2 -- ', chunk2([1,3,4,5,6,7,8], 3));

/**
 * Anagrams
 * - check if two strings are anagrams of each other, a string is an anagram if it used the same characters
 *  in the same quantity
 */

function anagram(stringA, stringB) {
    let arr1 = stringA.toLowerCase().split('').sort().join('');
    let arr2 = stringB.toLowerCase().split('').sort().join('');

    if (arr1.length !== arr2.length || arr1 !== arr2) {
        return false;
    }

    return true;
}

console.log('anagram -- ', anagram('rail safety', 'fairy tales'));
console.log('anagram -- ', anagram('rail SAFETY', 'fairy tales'));
console.log('anagram -- ', anagram('hi there', 'bye there'));

// anagram charMap solution
function anagram2(stringA, stringB) {
    const aCharMap = buildCharMap(stringA);
    const bCharMap = buildCharMap(stringB);

    if (Object.keys(aCharMap).length !== Object.keys(bCharMap).length) {
        return false;
    }

    for (let char in aCharMap) {
        if (aCharMap[char] !== bCharMap[char]) {
            return false
        }
    }

    return true;
}

// helper function
function buildCharMap(str) {
    const charMap = {};

    for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
        charMap[char] = charMap[char] + 1 || 1;
    }

    return charMap;
}

console.log('anagram 2 -- ', anagram2('rail safetY', 'fairy tales'));

/**
 * Sentence capitalization
 * - function accepts a string and capitalized the first letter of each word then return the string
 */
// better solution 
function capitalize(str) {
    return str.split(' ').map((val, i) => val[0].toUpperCase() + val.slice(1)).join(' ');
}

// longer solution shows thought
function capitalize2(str) {
    let retStr = '';
    let word = '';
    for (let char of str) {
        if (char !== ' ') {
            word += char;
        } else {
            retStr += ' ' + word[0].toUpperCase() + word.slice(1);
            word = '';
        }
    }

    retStr += ' ' + word[0].toUpperCase() + word.slice(1);

    return retStr;
}

function capitalize3(str) {
    const words = [];

    for (let word of str.split(' ')) {
        words.push(word[0].toUpperCase() + word.slice(1));
    }

    return words.join(' ');
}

console.log('Capitalize -- ', capitalize('a short sentence'));
console.log('Capitalize -- ', capitalize('look, it is working!'));
console.log('Capitalize -- ', capitalize2('look, it is working!'));

/**
 * Printing steps
 * - write a function that accepts a positive number N.
 * the function should console log a step shape with N levels using the # character. Make sure the step has spaces on the right hand side.
 */

function steps(n) {
    let i = 0;

    while (i < n) {
        console.log('#'.repeat(i+1).padEnd(n, '-'));
        i += 1;
    }
    console.log('--- done ---')
}

function steps2(n) {
    for (let i = 0; i < n; i++) {
        let stair = '';

        for (let j = 0; j < n; j++) {
            if (j <= i) {
                stair += '#';
            } else {
                stair += '-'
            }
        }

        console.log(stair);
    }

    console.log('--- done ---')
}

function stepsRecursion(n, row = 0, stair = '') {
    if (n == row) {
        return;
    }

    if (n === stair.length) {
        console.log(stair);
        return stepsRecursion(n, row+1);
    }

    if (stair.length <= row) {
        stair += '#';
    } else {
        stair += '-';
    }

    stepsRecursion(n, row, stair);
}
//stepsRecursion(4);

steps2(5);

steps(2);
steps(3);
steps(4);

/**
 * Pyramid 
 * - write a function that accepts a positive number N. the function should console log a pyramid shape
 * with N levels using the # character. make sure the pyramid has spaces on both the left and right hand sides.
 * Ex n = 1
 *  '#'
 * n = 2
 *  ' # '
 *  '###'
 * n = 3
 *  '  #  '
 *  ' ### '
 *  '#####'
 */
console.log('--- pyramid ---');
function pyramid(n) {
    let mid = Math.floor((n * 2 - 1) / 2);

    for (let row = 0; row < n; row++) {
        let level = '';

        for (let col = 0; col < n * 2 - 1; col++) {
            if (col < mid - row || col > mid + row) {
                level += '-';
            } else {
                level += '#';
            }
        }

        console.log(level);
    }
}

function pyramidRecursive(n, row=0, level='') {
    if (row === n) {
        return;
    }

    if (level.length === 2 * n-1) {
        console.log(level);
        return pyramidRecursive(n, row + 1);
    }

    let mid = Math.floor((n * 2 - 1) / 2);
    let add;

    if (level.length < mid - row || level.length > mid + row) {
        add = '-';
    } else {
        add = '#'
    }

    return pyramidRecursive(n, row, level + add);

}
console.log('-pyramid recursive-');
pyramidRecursive(3);

console.log('-pyramid regular-');
pyramid(1);
pyramid(2);
pyramid(3);


/**
 * Return vowels
 * - write a function that returns the number of vowels used in a string. Vowels are the characters
 *  a, e, i, o, u
 */
console.log('--- vowels ---');
function vowels(str) {
    const vowels = ['a','e','i','o','u'];
    let num = 0;
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            num += 1;
        }
    }

    return num;
}

// regular expression version
function vowels2(str) {
    return str.match(/[aeiou]/gi) != null ? str.match(/[aeiou]/gi).length : 0;
}

console.log(vowels('Hi there!'));
console.log(vowels('why do you ask?'));
console.log(vowels('Why'));


/**
 * Matrix spiral
 * - write a function that accepts an integer N and returns a NxN spiral matrix
 * 
 * notes:
 *  - start top left [0][0], move right til end of row, move down til end of col, move left til end of row, move up til end of column, then repeat
 *  - increment counter at each move
 *  - after moving one whole row or col, increment or decrement the next row or col.
 */
console.log('--- sprial matrix ---')
function matrix(n) {
    let result = [];

    for (let i = 0; i < n; i++) {
        result.push([]);
    }

    let counter = 1;
    let startCol = 0;
    let endCol = n-1;
    let startRow = 0;
    let endRow = n-1;

    while (startCol <= endCol && startRow <= endRow) {
        // top row
        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter;
            counter++;
        }
        startRow++;

        // right col
        for (let i = startRow; i <= endRow; i++) {
            result[i][endCol] = counter;
            counter++;
        }
        endCol--;

        // bottom row
        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter;
            counter++
        }
        endRow--;

        // start col
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter;
            counter++;
        }
        startCol++;
    }

    return result;
}

console.log(matrix(3));
console.log(matrix(4));


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

console.log('--- Linked List ---')
/**
 * Linked lists and Node
 */

class Node {
    constructor(data=null,next=null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor(head=null) {
        this.head = head;
        this.length = 0;
    }

    insertFirst(data) {
        const node = new Node(data);

        if (this.head === null) {
            this.head = node;
        } else {
            let temp = this.head;
            this.head = node;
            this.head.next = temp;
        }

        this.length += 1;
    }

    size() {
        let curNode = this.head;
        let count = 0;
        while(curNode) {
            count += 1;
            curNode = curNode.next;
        }
        return count;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        if (!this.head) {
            return null;
        }

        let curNode = this.head;
        while(curNode.next) {
            curNode = curNode.next;
        }
        return curNode;
    }

    clear() {
        this.head = null;
    }

    removeFirst() {
        if (!this.head) {
            return
        }

        this.head = this.head.next;
    }

    removeLast() {
        if (!this.head) {
            return;
        }

        if (!this.head.next) {
            this.head = null;
            return;
        }

        let curNode = this.head;
        let prevNode = this.head.next;
        while (curNode.next) {
            prevNode = curNode;
            curNode = curNode.next;
        }

        prevNode.next = null;
    }

    insertLast(data) {
        const node = new Node(data);

        if (!this.head) {
            this.head = node;
            return;
        }

        let curNode = this.head;

        while(curNode.next) {
            curNode = curNode.next;
        }

        curNode.next = node;
    }

    getAt(index) {
        let counter = 0;
        let curNode = this.head;
        while(curNode) {
            if (counter == index) {
                return curNode;
            } 
            counter += 1;
            curNode = curNode.next;
        }
        
        return null;
    }

    removeAt(index) {
        if (!this.head) {
            return;
        }

       if (index == 0) {
            this.head = this.head.next;
            return;
       }

        let prev = this.head;
        let next = this.head.next;
        let counter = 0;

        while (next) {
            if (counter === index - 1) {
                prev.next = next.next;
                return;
            }
            counter += 1;
            prev = next;
            next = next.next;
        }
    }

    insertAt(index,data) {
        const node = new Node(data);

        if (index == 0) {
            let temp = this.head;
            this.head = node;
            this.head.next = temp;
        }

        let prev = this.head;
        let next = this.head.next;
        let counter = 0;

        while (next) {
            if (counter === index - 1) {
                node.next = next;
                prev.next = node;
                return;
            }
            counter += 1;
            prev = next;
            next = next.next;
        }
    }
}

const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const list = new LinkedList();
list.insertFirst(1);
list.insertFirst(2);
list.insertFirst(3);
console.log(list);
console.log('list size -> ', list.size());
console.log('list get first -> ', list.getFirst());
console.log('list get last -> ', list.getLast());
//list.removeFirst();
//list.removeLast(); // remove 1, now 2 is last
//console.log('list get last after remove -> ',list.getLast());
list.insertLast(4);
//console.log('list get last after insert last', list.getLast());
console.log('list get at index -> ', list.getAt(2));
// list = 3,2,1,4
//list.removeAt(0);
//console.log('list get at index -> ', list.getAt(0));

// list = 3,2,1,4
list.insertAt(3,6);
console.log('list get at index -> ', list.getAt(3))


/**
 * Mid point of linked list
 * - return middle of linked list if list has an even number of elements, return the node at the end of the first half.
 *   Do not use counter variable, do not retrieve size of list, only iterate through list one time.
 */
console.log('--- list mid point ---');

function midpoint(list) {
    let slow = list.getFirst();
    let fast = list.getFirst();

    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}
// list = 3,2,1,6,4
console.log(midpoint(list));

/**
 * Circular linked list
 *  - return true if linked list is circular, else return false
 */
console.log('--- circular linked list ---');
function circular(list) {
    let slow = list.getFirst();
    let fast = list.getFirst();

    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}
const l1 = new LinkedList();
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
l1.head = a;
a.next = b;
b.next = c;
c.next = a;
console.log(circular(l1));