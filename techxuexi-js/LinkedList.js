class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0; // 总数
    }

    prepend(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    deleteNode(node) {
        if (node === this.head) {
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            }
        } else if (node === this.tail) {
            this.tail = this.tail.prev;
            if (this.tail) {
                this.tail.next = null;
            }
        } else {
            const prevNode = node.prev;
            const nextNode = node.next;
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
        }
        this.length--;
    }

    find(data) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.data === data) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    // 获取链表长度
    size() {
        return this.length;
    }
}
