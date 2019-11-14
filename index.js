const lodash = require('lodash');
const readEachLineSync = require('read-each-line-sync');
const YAML = require('json2yaml')

let fileName = 'test.properties';
let properties = {};

readEachLineSync(fileName, function (line) {
    if (line.charAt(0) && line.charAt(0) !== '#') {
        let parsedLine = line.split(/=(.+)/);
        let pieces = parsedLine[0].split('.');
        let value = parsedLine[1];
        properties = lodash.setWith(properties, pieces, value, Object);
    }

});

console.log(JSON.stringify(properties, null, 2));
console.log("\n\n\n");
let ymlText = YAML.stringify(properties);
console.log(ymlText);