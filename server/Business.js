const state = {
    index: 0,
    itemContainer: []
}

function IncrementIndex() {
    return state.index++;
}

module.exports = {
    state,
    IncrementIndex
}
