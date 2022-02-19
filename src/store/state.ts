import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        users: {},
        messageList: {},
        userChats: {},
    },
    mutations: {
        users(state, item) {
            state.users = item
        },
        messageList(state, item) {
            state.messageList = item
        },
        userChats(state, item) {
            state.userChats = item
        },
    },
    actions: {},
    getters: {
        getUsers: (state) => {
            return state.users;
        },
        getUserChats: (state) => {
            return state.userChats;
        },
        getMessageList: (state) => {
            return state.messageList;
        },
    },

})