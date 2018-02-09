class SingleLinkedList {
    constructor() {
        this.tail = null;
        this.head = null;
        this.length = 0;
        Array.from(arguments).forEach(v => this.push(v))
    }

    get(index) {
        return this._getNodes(index).value;
    }

    _getNodes(index) {
        if (this.length === 0) {
            throw new Error('List is empty');
        } else if (index + 1 > this.length) {
            throw new Error('Index is greater then list length')
        } else {
            let current = this.head,
                currentIndex = 0;
            while (current) {
                if (currentIndex === index) {
                    return current;
                } else {
                    current = current.next;
                    currentIndex++;
                }
            }
        }
    }

    set(index, value) {
        if (index + 1 > this.length) {
            let currentTail = this.tail;
            while (this.length < index) {
                this.push(null);
                currentTail = currentTail.next;
            }
            this.push(value);
        } else {
            const addingNode = new Node(value, this._getNodes(index));
            this._getNodes(index - 1).next = addingNode;
        }
    }

    push() {
        Array.from(arguments).forEach(value => {
            const addingNode = new Node(value);
            if (this.length === 0) {
                this.tail = addingNode;
                this.head = addingNode;
            } else {
                this.tail.next = addingNode;
                this.tail = addingNode;
            }
            this.length++;
        })
    }

    pop() {
        let result;
        if (this.length === 0) {
            throw new Error('List is empty');
        } else if (this.length === 1) {
            result = this.head.value;
            this.head = null;
            this.tail = null;
        } else if (this.length === 2) {
            result = this.tail.value;
            this.head.next = null;
            this.tail = this.head;
        } else {
            let current = this.head;
            while (current.next.next) {
                current = current.next;
            }
            current.next = null;
            result = this.tail.value;
            this.tail = current;
        }
        this.length--;
        return result;
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

    forEach(callback) {
        let current = this.head,
            index = 0;
        while (current) {
            callback(current, index);
            current = current.next;
            index++;
        }
    }
}

class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

module.exports = SingleLinkedList;