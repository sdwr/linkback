import { createStore } from 'vuex';
import api from '../api';

export default createStore({
    state() {
        return {
            user: null,
            isOnMobile: false,
            pageTitle: '',
            allTags: [],
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
        setAllTags(state, tags) {
            state.allTags = tags;
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

        //Tag actions
        async loadAllTags({ commit }) {
            try {
                api.getTags().then(tags => {
                    commit('setAllTags', tags);
                });
            } catch (error) {
                console.error('load all tags failed:', error);
            }
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
        getAllTags(state) {
            return state.allTags;
        },
    }
});
