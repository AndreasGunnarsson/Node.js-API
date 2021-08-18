const express = require('express');
const app = express();

const itemContainer = [];
const itemRouter = express.Router();
let index = 0;

function incrementIndex() {
    return index++;
}

class Item {
    constructor(name, amount) {
        this.id = incrementIndex();
        this.modifydate = 2021;
        this.name = name;
        this.amount = amount;
    }
}

itemRouter.get('/get/:id', (req, res) => {
    console.log('get id');
    const id = req.params.id;
    const foundItem = itemContainer.find (
        element => element.id == id
    );
    res.json(foundItem);
});

itemRouter.get('/get', (req, res) => {
    res.status(200).json(itemContainer);
});

itemRouter.post('/post', (req, res) => {
    const recieved = req.body;
    const object = new Item(recieved.name, recieved.amount);
    console.log(object.id, object.modifydate, object.name, object.amount);
    itemContainer.push(object);
    res.status(201).json(object);
});

itemRouter.put('/put', (req, res) => {
    console.log('put');
});

itemRouter.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const index = itemContainer.findIndex((element) => element.id == id);
    if (index >= 0) {
        itemContainer.splice(index, 1);
        res.json('id removed');
    }
    else {
        res.json('id doesnt exist');
    }
        
});

itemRouter.delete('/delete', (req, res) => {
    // itemContainer = [];
    console.log('delete');
});

module.exports = itemRouter;
