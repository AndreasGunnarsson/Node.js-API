const express = require('express');
const app = express();
const cors = require('cors');
const itemrouter = require('./ItemRouter');

app.use(cors());

// For JSON requests in the body
app.use(express.json());

app.use(itemrouter);

app.listen(3000, () => {
    console.log('Server is running..');
});
