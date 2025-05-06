import { HashMap } from "./hashmap.js";
// import { LinkedList } from "./linkedList.js";


const test = new HashMap()

test.set('apple', 'red')
test.set('carrot', 'orange')
test.set('onb', 'orange')
test.set('apple', 'dupe')

console.log(test)