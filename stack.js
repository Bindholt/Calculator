export default class Stack {
    head = null;

    constructor(){

    }

    push(data) {
        const node = new Node(data)
        if(this.head) {
            node.next = this.head
        }

        this.head = node;
    }

    pop() {
        if(!this.head) {
            return null;
        }
        const node = this.head;
        this.head = this.head.next;
        return node;
    }

    peek() {
        return this.head;
    }

    clear() {
        this.head = null;
    }


    dumpList(){
        if(this.head) {
            let current = this.head;
            let dump = "";
            while(current) {
                dump += current.data + " ";
                current = current.next;
            }
            return dump;
        }
    }
}

class Node {
    next = null;
    data = null;

    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}