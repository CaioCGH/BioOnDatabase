

const util = require('util');

var root = {
    name: 'monday',
    next: []
};

const daysOfTheWeek = ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

parentNode = root;
for(let i = 0; i < daysOfTheWeek.length; i++){
    var node = {
        name: daysOfTheWeek[i],
        next: []
    }
    parentNode.next.push(node);
    // console.log(root);
    console.log(util.inspect(root, false, null, true /* enable colors */))

    parentNode = node;
}

// root.next = node2;
// console.log(root);

// var node3 = {
//     name: 'wednesday',
//     next: null
// }

// node2.next = node3;

// console.log(root);

