import { createStore } from 'vuex';
import api from '../api';

export default createStore({
    state() {
        return {
            user: null,
            isLoggedIn: false,
            isOnMobile: false,
            pageTitle: '',
            allTags: [],
            toast: { text: '', type: ''},

            //save player progress here for now, move player API to separate component later
            clipProgress: 0,
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setIsLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
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
        setToast(state, toast) {
            state.toast = toast;
        },
        setClipProgress(state, progress) {
            state.clipProgress = progress;
        }
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

        //Login actions
        async saveIsLoggedIn({ commit }, isLoggedIn) {
            commit('setIsLoggedIn', isLoggedIn);
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

        //Toast message actions
        async saveToast({ commit }, message) {
            console.log('saveToast:', message)
            commit('setToast', message);
        },

        //Player actions
        async saveClipProgress({ commit }, progress) {
            commit('setClipProgress', progress);
        }

    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getIsLoggedIn(state) {
            return state.isLoggedIn;
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
        getToast(state) {
            return state.toast;
        },
        getClipProgress(state) {
            return state.clipProgress;
        }
    }
});
