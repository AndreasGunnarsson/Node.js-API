const business = require('./Business.js');
const fs = require('fs');

const saveFile = 'save.json';
let itemContainer = [];

function WriteToFile() {
    console.log('Write');                   // Debug.
    console.log('index WriteToFile: ', business.state.index);       // Debug.
    const stringify = JSON.stringify(itemContainer);
    const indexstring = '"lastIndex":' + business.state.index;
    const append = '{"items":' + stringify + ',' + indexstring + '}';
    fs.writeFile(saveFile, append, (err) => {
        if (err)
            throw err;
    });
}

function ReadFromFile() {
    console.log('read');                // Debug.
    fs.readFile(saveFile, (err, data) => {
        if (err)
            throw err;
        const parse = JSON.parse(data);
        itemContainer = parse.items;
        console.log('last read itemContainer: ', itemContainer);             // Debug.
        business.state.index = parse.lastIndex;
        console.log('last read index: ', business.state.index);      // Debug.
    });
}

module.exports = {
    itemContainer,
    WriteToFile,
    ReadFromFile
};
