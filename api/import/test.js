

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

    parentNode = node;
}
