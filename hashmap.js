import { Node, LinkedList } from "./linkedList.js";

class HashMap {
	#buckets;
	#capacity;
	#loadFactor;
	#entries;

	constructor(loadFactor) {
		(this.#capacity = 16),
			(this.#buckets = Array.from({ length: this.#capacity }, e => null)),
			(this.#loadFactor = loadFactor || 0.8);
		this.#entries = 0;
	}

	#hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
		}

		return hashCode;
	}

	#verifyIndex(index) {
		if (index < 0 || index >= this.#capacity) {
			throw new Error('Trying to access index out of bounds');
		}
	}

	set(key, value) {
		const index = this.#hash(key);
        console.log({index})
		this.#verifyIndex(index);
        console.log(this.#buckets[index])

		const entry = { key: key, value: value };

		if (this.#buckets[index] === null) {
			this.#buckets[index] = new LinkedList();
			this.#buckets[index].append(entry);
		} else {
			// if (this.#buckets[index].contains())
			// For now, just append
			this.#buckets[index].append(entry)
		}
	}
}

export { HashMap };