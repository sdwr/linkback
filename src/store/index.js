import { createStore } from 'vuex';
import api from '../api';
import { createBlankUserDto } from '@/utils';

export default createStore({
    state() {
        return {
            user: null,
            userCredentials: null,
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
        setUserCredentials(state, userCredentials) {
            state.userCredentials = userCredentials;
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
        loadUser({ commit }) {
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
        saveUser({ commit }, user) {
            try {
                commit('setUser', user);

                // Save user data to localStorage
                localStorage.setItem('user', JSON.stringify(user));

            } catch (error) {
                console.error('Save user failed:', error);
            }
        },

        loadUserCredentials({ commit }) {
            try {
                // Load user credentials from localStorage
                const userCredentialsData = localStorage.getItem('userCredentials');
                if (userCredentialsData) {
                    let userCredentials = JSON.parse(userCredentialsData);
                    commit('setUserCredentials', userCredentials);
                }
            } catch(error) {
                console.info('load user credentials failed:', error);
            }
        },

        saveUserCredentials({ commit }, userCredentials) {
            try {
                commit('setUserCredentials', userCredentials);

                // Save user credentials to localStorage
                localStorage.setItem('userCredentials', JSON.stringify(userCredentials));

            } catch (error) {
                console.error('Save user credentials failed:', error);
            }
        },

        //Login actions
        async saveIsLoggedIn({ commit }, isLoggedIn) {
            console.log('saveIsLoggedIn:', isLoggedIn)
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
            commit('setToast', message);
        },

        //Player actions
        async saveClipProgress({ commit }, progress) {
            commit('setClipProgress', progress);
        }

    },
    getters: {
        getUser(state) {
            return state.user || createBlankUserDto();
        },
        getUserCredentials(state) {
            return state.userCredentials;
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
