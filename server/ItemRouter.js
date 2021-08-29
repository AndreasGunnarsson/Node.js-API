const express = require('express');
const { body, validationResult } = require('express-validator');
const io = require('./IO.js');
const model = require('./ItemModel.js');
const business = require ('./Business.js');
const itemRouter = express.Router();

// Reads from file when the program stars if there is any file available.
io.ReadFromFile();

// Endpoint for GET which responds with one object in the array itemContainer.
itemRouter.get('/get/:id',
    (req, res) => {
        const id = req.params.id;
        const foundItem = business.state.itemContainer.find (
            element => element.id == id
        );
        if(!foundItem)
            res.status(404).json('Id not found.');
        else {
            res.status(200).json(foundItem);
        }
    }
);

// Endpoint for GET that prints sends a response with all items in the array itemContainer.
itemRouter.get('/get', (req, res) => {
    res.status(200).json(business.state.itemContainer);
});

// Endpoint for POST which creates an object based on what the user sends in the body of the request and saves it in the array itemContainer.
itemRouter.post('/post',
    body('name').notEmpty(),
    body('amount').isInt({min: 0, max: 100}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const recieved = req.body;
        const object = model.CreateModel(recieved.name, recieved.amount);

        business.state.itemContainer.push(object);
        res.status(201).json(object);
        io.WriteToFile();
    }
);

// Endpoint for PUT to edit an item.
itemRouter.put('/put',
    body('id').isInt({min: 0}),
    body('name').notEmpty(),
    body('amount').notEmpty().isInt({min: 0, max: 100}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const recieved = req.body;
        const indexFound = business.state.itemContainer.findIndex((element) => element.id == recieved.id);
        if (indexFound >= 0) {
            const object = model.CreateModel(recieved.name, recieved.amount, recieved.id);
            business.state.itemContainer.splice(indexFound, 1, object);
            res.status(200).json(object);
        }
        else
            res.status(404).json('Id not found.');
        io.WriteToFile();
    }
);

// Endpoint for DELETE to remove an item with a specific id.
itemRouter.delete('/delete/:id',
    (req, res) => {
        const id = req.params.id;
        const indexFound = business.state.itemContainer.findIndex((element) => element.id == id);
        if (indexFound >= 0) {
            business.state.itemContainer.splice(indexFound, 1);
            res.status(200).json('Item removed.');
        }
        else {
            res.status(404).json('Id not found.');
        }
        io.WriteToFile();
    }
);

// Endpoint for DETELE that removes everything.
itemRouter.delete('/delete', (req, res) => {
    business.state.itemContainer = [];
    res.status(200).json('Deleted everything.');
    io.WriteToFile();
});

module.exports = itemRouter;
