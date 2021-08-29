const business = require ('./Business.js');

/**
 * Function to create a model. 
 * @param {string} name
 * @param {number} amount
 * @param {number} id
 */
function CreateModel (name, amount, id = null) {
    const object = {
        id: id ?? business.IncrementIndex(),
        modifydate: new Date(),
        name: name,
        amount: amount 
    };

    return object;
}

module.exports = { CreateModel };
