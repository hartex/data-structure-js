class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class SingleLinkedList {
    constructor() {
        this.tail = null;
        this.head = null;
        this.length = 0;
        this.push(...arguments);
    }

    get(index) {
        return this._getNode(index).value;
    }

    _getNode(index) {
        if (this.length === 0) {
            throw new Error('List is empty');
        } else if (index + 1 > this.length) {
            throw new Error('Index is greater then list length')
        } else {
            let current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next
            }
            return current;
        }
    }

    set(index, value) {
        if (index + 1 > this.length) {
            let currentTail = this.tail;
            while (this.length < index) {
                this.pushOne(null);
                currentTail = currentTail.next;
            }
            this.pushOne(value);
        } else {
            const updatingNode = this._getNode(index);
            updatingNode.value = value;
        }
    }

    push() {
        Array.from(arguments).forEach(value => this.pushOne(value));
    }

    pushOne(element) {
        const addingNode = new Node(element);
        if (this.length === 0) {
            this.tail = addingNode;
            this.head = addingNode;
        } else {
            this.tail.next = addingNode;
            this.tail = addingNode;
        }
        this.length++;
    }

    pop() {
        let resultNode;
        if (this.length === 0) {
            throw new Error('List is empty');
        } else if (this.length === 1) {
            resultNode = this.head;
            this.head = null;
            this.tail = null;
        } else if (this.length === 2) {
            resultNode = this.tail;
            this.head.next = null;
            this.tail = this.head;
        } else {
            const penultimate = this._getNode(this.length - 2);
            resultNode = penultimate.next;
            penultimate.next = null;
            this.tail = penultimate;
        }
        this.length--;
        return resultNode.value;
    }

    shift() {
        if (this.length === 0) {
            throw new Error('List is empty');
        }

        const result = this.head.value;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else if (this.length === 2) {
            this.head = this.tail;
        } else {
            this.head = this.head.next;
        }
        this.length--;
        return result;
    }

    unshift() {
        const listBeginning = new SingleLinkedList(...arguments);
        const currentHead = this.head;
        this.head = listBeginning.head;
        if (!this.tail) {
            this.tail = listBeginning.tail;
        }
        listBeginning.tail.next = currentHead;
        this.length = this.length + listBeginning.length;
    }

    contains(element) {
        let result = false;
        this.forEachUntil(v => {
        }, p => {
            const comparisonResult = Object.is(element, p);
            if (comparisonResult) {
                result = true;
                return false;
            } else {
                return true;
            }
        });
        return result;
    }

    forEach(callback) {
        this.forEachUntil(callback, v => true);
    }

    forEachUntil(callback, predicate) {
        let current = this.head,
            index = 0;
        while (current) {
            if (predicate(current.value)) {
                callback(current.value, index);
                current = current.next;
                index++;
            } else {
                break;
            }
        }
    }

    toString() {
        return JSON.stringify(this.asArray);
    }

    get asArray() {
        const array = [];
        this.forEach(v => array.push(v));
        return array;
    }

    reverse() {
        const tempList = new SingleLinkedList();
        this.forEach(v => tempList.unshift(v));
        return tempList;
    }

    get sorted() {
        return this.asArray.sort();
    }

    [Symbol.iterator]() {
        let i = 0;
        const list = this;
        return {
            next() {
                if (i < list.length) {
                    return {
                        done: false,
                        value: list.get(i++)
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        }
    };
}

/*export {
    SingleLinkedList as LinkedList
};*/

module.exports = SingleLinkedList;