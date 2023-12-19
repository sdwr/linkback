import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            user: {}
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async loadUser({ commit }) {
            try {
                // Load user data from localStorage
                const userData = localStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);

                    // TODO: Check if user is expired
                    commit('setUser', user);
                }

            } catch (error) {
                console.error('load user failed:', error);
            }
        },
        async saveUser({ commit }, user) {
            try {
                // Save user data to localStorage
                localStorage.setItem('user', JSON.stringify(user));

                commit('setUser', user);
            } catch (error) {
                console.error('Save user failed:', error);
            }
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    }
});
