// index = last number used when creating a new item.
// itemContainer = array with all items saved during the lifetime of the application.
const state = {
    index: 0,
    itemContainer: []
}

// Function used to increment the index when creating new objects (see ItemModel).
function IncrementIndex() {
    return state.index++;
}

module.exports = {
    state,
    IncrementIndex
}
