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

/**
 * Linked list from last
 * - given a linked list and integer n, return the element n spaces from the last node in the list. Do not call the 'size' method.
 *   Assume that n will always be less than the length of the list.
 */
console.log('--- linked list from last ---');

function fromLast(list, n) {
    let slow = list.head;
    let fast = list.head;

    for(let i = 0; i < n; i++) {
        fast = fast.next;
    }

    while(fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

const list1 = new LinkedList();
list1.insertFirst(1);
list1.insertFirst(2);
list1.insertFirst(3);
list1.insertFirst(4);
list1.insertFirst(5);
// list1 = 5,4,3,2,1
console.log(fromLast(list1, 2));
