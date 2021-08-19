const business = require('./Business.js');
const fs = require('fs');

const saveFile = 'save.json';
let itemContainer = [];

function WriteToFile() {
    const stringify = JSON.stringify(itemContainer);
    const indexstring = '"lastIndex":' + business.index;
    const append = '{"items":' + stringify + ',' + indexstring + '}';
    fs.writeFile(saveFile, append, (err) => {
        if (err)
            throw err;
    });
}

function ReadFromFile() {
    fs.readFile(saveFile, (err, data) => {
        if (err)
            throw err;
        const parse = JSON.parse(data);
        itemContainer = parse.items;
        business.index = parse.lastIndex;
    });
}

module.exports = {
    itemContainer,
    WriteToFile,
    ReadFromFile
};
