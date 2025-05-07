import { Node, LinkedList } from "./linkedList.js";

class HashMap {
	#buckets;
	#capacity;
	#loadFactor;
	#entries;

	constructor(loadFactor) {
		this.#capacity = 16,
		this.#buckets = Array.from({ length: this.#capacity }, e => null),
		this.#loadFactor = loadFactor || 0.8;
		this.#entries = 0;
	}

	#hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
		}

		return hashCode;
	}

	#verifyIndex(index) {
		if (index < 0 || index >= this.#capacity) {
			throw new Error('Trying to access index out of bounds');
		}
	}

    #resize() {
        this.#capacity *= 2
        const entries = this.entries()
        this.#buckets = Array.from({length: this.#capacity}, (e) => e = null)
        entries.forEach(entry => {
            this.#refill(entry[0], entry[1])
        })
    }

    #refill(key, value) {
        const index = this.#hash(key);
		this.#verifyIndex(index);

        const entry = { key: key, value: value };
        if (this.#buckets[index] === null) {
			this.#buckets[index] = new LinkedList();
		} 
        this.#buckets[index].append(entry);
    }

	set(key, value) {
		const index = this.#hash(key);
		this.#verifyIndex(index);

		const entry = { key: key, value: value };

		if (this.#buckets[index] === null) {
			this.#buckets[index] = new LinkedList();
            this.#buckets[index].append(entry)
            this.#entries++
		} else if (this.#buckets[index].contains(entry.key)) {
            const listIndex = this.#buckets[index].findIndex(key)
            this.#buckets[index].removeAt(listIndex)
            this.#buckets[index].insertAt(entry, index)
        } else {
            this.#buckets[index].append(entry)
            this.#entries++
        }
        
        if (this.#entries/this.#capacity > this.#loadFactor) {
            this.#resize()
        }
	}

    get(key) {
        const index = this.#hash(key);
		this.#verifyIndex(index);
        if (this.#buckets[index] === null) return null
        
        const target = this.#buckets[index].find(key)
        return target;
    }
    
    has(key) {
        const index = this.#hash(key);
		this.#verifyIndex(index);
        if (this.#buckets[index] === null) {
            console.log('not found')
            return false
        }

        return this.#buckets[index].contains(key);
    }

    remove(key) {
        const index = this.#hash(key);
		this.#verifyIndex(index);
        if (this.has(key)) {
            console.log(`removing ${key}`)
            const target = this.#buckets[index].findIndex(key)
            this.#buckets[index].removeAt(target)
            this.#entries--
        }
        return false
    }

    length() {
        return this.#entries
    }

    clear() {
        this.#capacity = 16;
        this.#buckets = Array.from({ length: this.#capacity }, e => null);
        this.#entries = 0;
    }

    keys() {
        const allKeys = []
        this.#buckets.forEach(bucket => {
            if (bucket) {
                let current = bucket.head;

                while (current) {
                    allKeys.push(current.value.key);
                    current = current.next;
                }
            }
        })
        return allKeys
    }

    values() {
        const allValues = [];
		this.#buckets.forEach(bucket => {
			if (bucket) {
				let current = bucket.head;

				while (current) {
					allValues.push(current.value.value);
					current = current.next;
				}
			}
		});
		return allValues;
    }

    entries() {
        const allEntries = [];
		this.#buckets.forEach(bucket => {
			if (bucket) {
				let current = bucket.head;

				while (current) {
					allEntries.push([current.value.key, current.value.value]);
					current = current.next;
				}
			}
		});
		return allEntries;
    }
}

export { HashMap };