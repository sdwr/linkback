import store from  '@/store';
import loginApi from '@/api/loginApi';
import backendApi from '@/api/backendApi';

import { assertHasProperties } from '@/utils';
import { TOAST_TYPE } from '@/consts';

const userLogin = {
  //prefer to use credentials from store, if they exist
  //fallback to stored user as guest
  loginFromStore: async () => {
    await store.dispatch('loadUserCredentials');
    await store.dispatch('loadUser');
    let userCredentials = store.state.userCredentials;
    let user = store.state.user;

    if(userCredentials?.email && userCredentials?.password) {
      await userLogin.loginWithCredentials(userCredentials);
    } else if(user?.id && user?.isGuest) {
      await userLogin.loginAsGuest(user);
    }

    if(store.state.isLoggedIn) {
      return true;
    }

    //if we get here, we failed to login
    //clear out any existing user data
    store.dispatch('saveUser', null);
    store.dispatch('saveUserCredentials', null);
    store.dispatch('saveIsLoggedIn', false);

    return false;
  },
  loginWithCredentials: async (credentials) => {
    try {
      assertHasProperties(credentials, ['email', 'password']);
      let userResponse = await loginApi.login(credentials);

      // check if the response is a user object
      if(!userResponse) {
        throw new Error('Error logging in with credentials:', credentials);
      }
      store.dispatch('saveUser', userResponse);
      store.dispatch('saveUserCredentials', credentials);
      store.dispatch('saveIsLoggedIn', true);
      return true;

    } catch(error) {
      store.dispatch('saveUser', null);
      store.dispatch('saveIsLoggedIn', false);

      return false;
    }
  },
  loginAsGuest: async (user) => {
    try {
      assertHasProperties(user, ['id', 'isGuest']);
      let userResponse = await loginApi.loginGuest(user)
      // check if the response is a user object
      if(!userResponse) {
        throw new Error('Error logging in as guest:', user);
      }

      store.dispatch('saveUser', userResponse);
      store.dispatch('saveUserCredentials', null);
      store.dispatch('saveIsLoggedIn', true);
      
      return true;

    } catch(error) {
      store.dispatch('saveIsLoggedIn', false);

      return false;
    }
  },
  loadUserAndLogin: async () => {
    let loggedIn = await userLogin.loginFromStore();
    if(!loggedIn) {
      await userLogin.createNewGuest();
    }
  },
  createNewGuest: async () => {
    //clear out any existing user data
    store.dispatch('saveUser', null);
    store.dispatch('saveUserCredentials', null);

    try {
      let user = await backendApi.createGuestUser({});
      if(!user) {
        throw new Error('Error creating guest user');
      }
      store.dispatch('saveUser', user);
      store.dispatch('saveUserCredentials', null);

      return userLogin.loginAsGuest(user);
    } catch(error) {
      //nothing to clear here, as we didn't save anything
      return false;
    }
  },
  logout: async () => {
    let user = store.state.user;
    if(!user) {
      console.log('No user to log out');
      return true;
    }

    let loggedOut = await loginApi.logout(user);
    if(loggedOut) {
      store.dispatch('saveUser', null)
      store.dispatch('saveUserCredentials', null)
      store.dispatch('saveIsLoggedIn', false)
      return true;
    } else {
      console.error('Error logging out');
      return false;
    }
  },
}

export default userLogin;