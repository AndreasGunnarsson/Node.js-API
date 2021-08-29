const business = require('./Business.js');
const fs = require('fs');

const saveFile = 'save.json';

// Writes the array and the last index number used to a JSON file. 
function WriteToFile() {
    const stringify = JSON.stringify(business.state.itemContainer);
    const indexstring = '"lastIndex":' + business.state.index;
    const append = '{"items":' + stringify + ',' + indexstring + '}';
    fs.writeFile(saveFile, append, (err) => {
        if (err)
            throw err;
    });
}

// Reads from the same JSON file that we previously saved to.
function ReadFromFile() {
    fs.readFile(saveFile, (err, data) => {
        if (err) {
            console.log('Save file not available yet.\n', err);
            return;
        }
        else {
            const parse = JSON.parse (
                data,
                (key, value) => {
                    if (key === 'modifydate') {
                        value = new Date(value);
                        return value;
                    }
                    else
                        return value;
                }
            );
            business.state.itemContainer = parse.items;
            business.state.index = parse.lastIndex;
        }
    });
}

module.exports = {
    WriteToFile,
    ReadFromFile
};
