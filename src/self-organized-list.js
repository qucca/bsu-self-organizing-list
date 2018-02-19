class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    insert(data) {
        const node = new Node(data);

        if (this.length) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }

        this.length ++;

    }

    size() {
        return this.length;
    }

    at(index) {
        if (!this.length || index > this.length) return null;
        let curNode = this.head;
        let count = 0;
        while (count < index) {
            curNode = curNode.next;
            count++;
        }
        return curNode.data;
    }

    findNode(data) {
        let curNode = this.head;
        while (curNode) {
            if (curNode.data === data)
                return curNode;
            curNode = curNode.next;
        }
        return null
    }

    toArray() {
        if (!this.length) return [];
        let arr = [];
        let curNode = this.head;
        while (curNode) {
            arr.push(curNode.data);
            curNode = curNode.next;
        }
        return arr;
    }

    removeAt(index) {
        if (index > -1 && index < this.length){
            let curNode = this.head;
            let count = 0;
            if (index === 0) {
                this.head = curNode.next;
                if (!this.head) {
                    this.tail = null;
                }
                else {
                    this.head.prev = null;
                }
            } else if (index === this.length -1) {
                curNode = this.tail;
                this.tail = curNode.prev;
                this.tail.next = null;
            } else {
                while (count < index) {
                    curNode = curNode.next;
                    count++
                }
                curNode.prev.next = curNode.next;
                curNode.next.prev = curNode.prev;
            }
            this.length--
        }

    }

    moveToFront(node) {
        if (this.head === node) { return node }
        else if (node === this.tail) {
            node.prev.next = null;
            this.tail = node.prev;
        }
        else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this.head.prev = node;
        node.next = this.head;
        node.prev = null;
        this.head = node;

    }

    reorganize(data) {
       let curNode = this.head;
       if (this.length > 1) {
           while (curNode) {
               if (curNode.data === data) {
                   this.moveToFront(curNode);
                   return true
               }
               curNode = curNode.next;
           }
       }
       return false
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};
