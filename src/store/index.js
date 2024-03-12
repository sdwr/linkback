import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            user: null,
            isOnMobile: false,
            pageTitle: '',
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setIsOnMobile(state, isOnMobile) {
            state.isOnMobile = isOnMobile;
        },
        setPageTitle(state, title) {
            state.pageTitle = title;
        },
    },
    actions: {
        //User actions
        async loadUser({ commit }) {
            try {
                // Load user data from localStorage
                const userData = localStorage.getItem('user');
                if (userData) {
                    let user = JSON.parse(userData);
                    commit('setUser', user);
                }

            } catch (error) {
                console.error('load user failed:', error);
            }
            console.log('user', this.state.user)
        },
        async saveUser({ commit }, user) {
            try {
                // Save user data to localStorage
                localStorage.setItem('user', JSON.stringify(user));

                commit('setUser', user);
            } catch (error) {
                console.error('Save user failed:', error);
            }
        },

        //Mobile actions
        async saveIsOnMobile({ commit }, isOnMobile) {
            commit('setIsOnMobile', isOnMobile);
        },

        //Page title actions
        async savePageTitle({ commit }, title) {
            commit('setPageTitle', title);
        },

    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getIsOnMobile(state) {
            return state.isOnMobile;
        },
        getPageTitle(state) {
            return state.pageTitle;
        },
    }
});
