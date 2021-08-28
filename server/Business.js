const state = {
    index: 0
}

function IncrementIndex() {
    console.log('index business: ', state.index);     // Debug.
    return state.index++;
}

module.exports = {
    state,
    IncrementIndex
}
