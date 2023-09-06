console.log('--- Trees ---');
/**
 * Trees !!
 *           1
 *         /  \
 *        2    3
 *       /    / \
 *      4    6   8 
 * 
 * - traversal of tress
 *   1. breadth-first traversal - start at top level going left to right at each level before going deep
 *         * pop each node and add children to end of array
 *   2. depth-first traversal - start at top level, going left as deep as you can, before checking right side
 *         * pop each node and add children to beginning of array
 */

/**
 * TreeNode
 * - the tree node containing the node data and children
 */
class TreeNode {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    add(data) {
        this.children.push(new TreeNode(data));
    }

    remove(data) {
        // using filter method
        this.children = this.children.filter(node => node.data !== data);

        // using more traditional for loop
        // for (let [i,child] of this.children.entries()) {
        //     if (child.data === data) {
        //         this.children.splice(i, 1);
        //         return;
        //     }
        // }
    }
}

/**
 * Tree
 * - the tree class containing the root node and traversal methods
 */
class Tree {
    constructor() {
        this.root = null;
    }

    // BFS - pop off parent node from front and add children to back of array
    traverseBFS() {
        let array = [this.root];
        while (array.length) {
            const node = array.shift();
            console.log(node.data);
            array.push(...node.children);
        }
    }

    // DFS - pop off parent node from front and add children to front of array
    traverseDFS() {
        let array = [this.root];
        while (array.length) {
            const node = array.shift();
            console.log(node.data);
            array.unshift(...node.children);
        }
    }
}

const TN1 = new TreeNode(23);
TN1.add(1);
TN1.add(2);
TN1.add(3);
TN2 = TN1.children[0];
TN2.add(4);
TN2.add(5);
TN3 = TN2.children[0];
TN3.add(6);

const tree = new Tree();
tree.root = TN1;
console.log(tree);
console.log('--- BFS ---');
tree.traverseBFS();

console.log('--- DFS ---');
tree.traverseDFS();

/**
 * Tree Level Width
 * - given the root node of a tree, return an array where each element is the width of the tree at each level
 */
console.log('--- Tree level width ---');
function levelWidth(root) {
    let arr = [root, 's'];
    let counters = [0];

    while (arr.length > 1) {
        const node = arr.shift();

        if (node === 's') {
            counters.push(0);
            arr.push('s');
        } else {
            arr.push(...node.children);
            counters[counters.length-1]++;
        }
    }

    return counters;
}

console.log(levelWidth(tree.root));


/**
 * Binary search tree
 * - each node can only have two children, where the left child is less than the parent and the right child is greater than the parent.
 */
console.log('--- Binary search tree ---');

class BSTNode {
    constructor(data,left=null,right=null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    insert(data) {
        if (data < this.data && this.left) {
            this.left.insert(data);
        } else if (data < this.data) {
            this.left = new BSTNode(data);
        } else if (data > this.data && this.right) {
            this.right.insert(data);
        } else if (data > this.data) {
            this.right = new BSTNode(data);
        }
    }

    contains(data) {
        if (data === this.data) {
            return true;
        }

        if (data < this.data && this.left) {
            return this.left.contains(data);
        } else if (data > this.data && this.right) {
            return this.right.contains(data);
        }

        return false;
    }
}

const BSTN1 = new BSTNode(54);
BSTN1.insert(35);
BSTN1.insert(26);
BSTN1.insert(46);
BSTN1.insert(49);
BSTN1.insert(32);
BSTN1.insert(20);
BSTN1.insert(15);
BSTN1.insert(18);
BSTN1.insert(5);
BSTN1.insert(60);
BSTN1.insert(58);
BSTN1.insert(72);
console.log(BSTN1);
console.log('bst contains 32 -->', BSTN1.contains(32));

/**
 * Validate binary search tree
 * - given a node, validate the binary search tree, ensuring that every node's left child is less than
 *  the parent node's value and that every node's right child is greater than the parent
 */
console.log('--- validate BST ---');
function validateBST(node, min=null, max=null) {
    if (max !== null && node.data > max) {
        return false;
    }

    if (min !== null && node.data < min) {
        return false;
    }

    if (node.left && !validateBST(node.left, min, node.data)) {
        return false;
    }

    if (node.right && !validateBST(node.right, node.data, max)) {
        return false;
    }

    return true;
}

const fakeBST = new BSTNode(20);
fakeBST.left = new BSTNode(10);
fakeBST.right = new BSTNode(28);
fakeBST.left.left = new BSTNode(6);
fakeBST.right.right = new BSTNode(4);
console.log(validateBST(BSTN1));
console.log(validateBST(fakeBST));
