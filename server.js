const express = require('express');
const app = express();
const itemrouter = require('./ItemRouter');

// For JSON requests in the body
app.use(express.json());

app.use(itemrouter);

app.listen(3000, () => {
    console.log('Server is running..');
});
