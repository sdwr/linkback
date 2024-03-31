import store from  '@/store';
import loginApi from '@/api/loginApi';
import backendApi from '@/api/backendApi';

const userLogin = {
  loginFromStore: async () => {
    let user = store.state.user;
    if(!user || !user.id) {
      throw new Error('User not found: ', user);
    }
    console.log('Attempting to login as user:', user)
    try {
      let userResponse = await loginApi.login(user);
      // check if the response is a user object
      if(!userResponse) {
        throw new Error('Error logging in as user:', user);
      }
      store.dispatch('saveUser', userResponse);
      store.dispatch('saveIsLoggedIn', true);
    } catch(error) {
      store.dispatch('saveIsLoggedIn', false);
      console.error(error);
    }
  },
  loadUserAndLogin: async () => {
    console.log('Loading user')
    //load user from local storage, if it exists 
    store.dispatch('loadUser');
    let storedUser = store.state.user;

    //if no user, create a guest user
    if(!storedUser || !storedUser.id) {
      let user = await backendApi.createGuestUser({isGuest: true});
      store.dispatch('saveUser', user);
      storedUser = store.state.user;
    }
    //if still no user, throw an error
    if(!storedUser || !storedUser.id) {
      throw new Error('User not found: ', storedUser);
    }
    
    // user should be loaded from store, try to login
    try {
      if(!storedUser || !storedUser.id) {
        throw new Error('User not found: ', storedUser);
      }
      console.log('Attempting to login as user:', storedUser)
      let userResponse = await loginApi.login(storedUser);
      // check if the response is a user object
      if(!userResponse) {
        throw new Error('Error logging in as user:', storedUser);
      }
      store.dispatch('saveUser', userResponse);
      store.dispatch('saveIsLoggedIn', true);

    } catch (error) {
      store.dispatch('saveIsLoggedIn', false);
      console.error(error);
    }

  },
  loginAsGuest: async () => {
    let user = await backendApi.createGuestUser({isGuest: true});
    store.dispatch('saveUser', user);

    // try to login
    userLogin.loginFromStore();
  },
}

export default userLogin;