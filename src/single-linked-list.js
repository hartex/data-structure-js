class SingleLinkedList {
    constructor() {
        this.tail = null;
        this.head = null;
        this.length = 0;
    }

    push() {
        Array.from(arguments).forEach((value, index) => {
            const addingNode = new Node(value);
            if (this.head) {
                let current = this.head;
                while (current) {
                    current = current.next;
                }
            } else {
                this.head = addingNode;
            }
        })
    }
}

class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

module.exports = SingleLinkedList;