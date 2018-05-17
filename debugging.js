import {
    LinkedList
} from './src/single-linked-list.js'

const list = new LinkedList(1, 23, 44, 'dsfs', {});

list.forEach(v => console.log(v));
list.forEachUntil(v => console.log(v), p => p !== 44);

console.log(list.reverse().toString());
console.log(list.toString());


const tempArray = [];
for (let z of list) {
    tempArray.push(z);
}
console.log(tempArray);