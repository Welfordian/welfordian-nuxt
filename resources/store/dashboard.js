export const state = () => ({
    connections: {}
})

export const mutations = {
    SET_CONNECTIONS(state, connections) {
        state.connections = connections;
    }
}

export const getters = {
    connections(state) {
        return state.connections;
    }
}
