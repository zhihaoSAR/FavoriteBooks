const fs = require('fs');

let rawdata = fs.readFile('Books.json').then(console.log);

