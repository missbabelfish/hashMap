class Node {
	constructor(value) {
		this.value = value,
        this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	append(value) {
		if (!this.head) {
			this.head = new Node(value);
			return;
		}
		let current = this.head;
		while (current.next) {
			current = current.next;
		}
		current.next = new Node(value);
	}

	prepend(value) {
		let newNode = new Node(value);
		newNode.next = this.head;
		this.head = newNode;
	}

	// test to see if off by one
	entries() {
		let count = 1;
		let current = this.head;
		while (current.next) {
			current = current.next;
			count++;
		}
		return count;
	}

	getHead() {
		return this.head;
	}

	tail() {
		let current = this.head;
		while (current.next) {
			current = current.next;
		}
		return current;
	}

	at(index) {
		let current = this.head;
		for (let i = 1; i <= index; i++) {
			current = current.next;
		}
		return current;
	}

	pop() {
		let popped;
		if (!this.head) return null;
		if (!this.head.next) {
			popped = this.head;
			this.head = null;
			return popped;
		}
		let current = this.head;
		let prev;
		while (current.next) {
			prev = current;
			current = current.next;
		}
		popped = current;
		prev.next = null;
		return popped;
	}

	contains(key) {
		if (!this.head) return false;

		let current = this.head;
		while (current) {
			if (current.value.key === key) {
				return true;
			}
			current = current.next;
		}
		return false;
	}

	find(key) {
		if (!this.head) return null;
		let index = 0;
		let current = this.head;
		while (current) {
			if (current.value.key === key) {
				return current.value.value;
			}
			index++;
			current = current.next;
		}
		return 'not found';
	}

	findIndex(key) {
		if (!this.head) return null;
		let index = 0;
		let current = this.head;
		while (current) {
			if (current.value.key === key) {
				return index;
			}
			index++;
			current = current.next;
		}
		return 'not found';
	}

	toString() {
		if (!this.head) return 'null';

		let values = [];
		let current = this.head;

		while (current) {
			values.push(`( ${current.value.value} )`);
			current = current.next;
		}

		values.push('null');
		return values.join(' -> ');
	}

	insertAt(value, index) {
		if (!this.head) {
			this.head = new Node(value);
			return;
		}
		if (index === 0) {
			this.prepend(value);
			return;
		}
		if (this.entries() < index + 1) {
			throw new Error('Index does not exist in list');
		}
		let current = this.head;
		let prev;
		for (let i = 1; i <= index; i++) {
			prev = current;
			current = current.next;
		}
		const newNode = new Node(value);
		prev.next = newNode;
		newNode.next = current;
	}

	removeAt(index) {
		console.log(index)
		if (!this.head) {
			throw new Error('no list');
		}
		if (index === 0) {
			this.head = this.head.next;
			return;
		}
		if (this.entries() < index + 1) {
			throw new Error('Index does not exist in list');
		}
		let current = this.head;
		let prev;
		for (let i = 1; i <= index; i++) {
			prev = current;
			current = current.next;
		}
		prev.next = current.next;
	}
}

export { Node, LinkedList }