const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const io = require('./IO.js');
const business = require ('./Business.js');

const itemRouter = express.Router();

class Item {
    constructor(name, amount, id = null) {
        this.id = id ?? business.IncrementIndex();
        this.modifydate = new Date();
        this.name = name;
        this.amount = amount;
    }
}

// ----------------------------------------------------------------

// itemRouter.get('/get/:id',
itemRouter.get('/get/:id',
    // body('id').isInt({min: 0}),
    (req, res) => {
        // console.log('parameters: ', req.params.id);
        // const errors = validationResult(req);
        // if (!errors.isEmpty())
        // if (req.params.id == 10)
        //     return res.status(400);
            // return res.status(400).json({ errors: errors.array() });
        const id = req.params.id;
        const foundItem = io.itemContainer.find (
            element => element.id == id
        );
        if(!foundItem)
            res.status(404).json('Id not found.');
        else {
            io.WriteToFile();                       // Debug.
            res.status(200).json(foundItem);
        }
    }
);

itemRouter.get('/get', (req, res) => {
    io.ReadFromFile();                          // Debug.
    res.status(200).json(io.itemContainer);
});

itemRouter.post('/post',
    body('name').notEmpty(),
    body('amount').isInt({min: 0, max: 100}),
    (req, res) => {
        console.log('req: ', req);
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const recieved = req.body;
        const object = new Item(recieved.name, recieved.amount);
        console.log('Post object: ', object.id, object.modifydate, object.name, object.amount);         // Debug.
        io.itemContainer.push(object);
        res.status(201).json(object);
    }
);

itemRouter.put('/put',
    body('id').isInt({min: 0}),
    body('name').notEmpty(),
    body('amount').notEmpty().isInt({min: 0, max: 100}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const recieved = req.body;
        const indexFound = io.itemContainer.findIndex((element) => element.id == recieved.id);
        if (indexFound >= 0) {
            const object = new Item(recieved.name, recieved.amount, recieved.id);
            io.itemContainer.splice(indexFound, 1, object);
            res.status(200).json(object);
        }
        else
            res.status(404).json('Id not found.');
    }
);

itemRouter.delete('/delete/:id',
    // body('id').isInt({min: 0}),
    (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty())
        //     return res.status(400).json({ errors: errors.array() });
        const id = req.params.id;
        const indexFound = io.itemContainer.findIndex((element) => element.id == id);
        if (indexFound >= 0) {
            io.itemContainer.splice(indexFound, 1);
            res.status(200).json('Item removed.');
        }
        else {
            res.status(404).json('Id not found.');
        }
    }
);

itemRouter.delete('/delete', (req, res) => {
    io.itemContainer = [];
    res.status(200).json('Deleted everything.');
});

module.exports = itemRouter;
