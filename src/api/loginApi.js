
import { USER_SESSIONS_PATH } from "./api_routes"
import store from "@/store";
import { TOAST_TYPE } from "@/consts";
import { requestWrapper } from "@/utils";

//load the backend url from environment variables
let backendUrl;
if (import.meta.env.PROD) {
  backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
} else {
  backendUrl = import.meta.env.VITE_BACKEND_URL_DEV;
}

const BACKEND_URL = backendUrl;


const loginApi = {
  login: async (userDto) => { 
    const url = `${BACKEND_URL}${USER_SESSIONS_PATH}/login`
    let body = userDto
    try {
      const response = await requestWrapper(url, 'POST', body)
      if(!response.ok) {
        throw new Error('Failed to login')
      }
      let data = await response.json()

      store.dispatch('saveToast', { text: `Logged in as ${data?.username}`, type: TOAST_TYPE.SUCCESS });
      return data

    } catch (error) {
      store.dispatch('saveToast', { text: `Failed to login`, type: TOAST_TYPE.ERROR });
      return null;
    }
  },

  loginGuest: async (userDto) => {
    const url = `${BACKEND_URL}${USER_SESSIONS_PATH}/loginGuest`
    let body = userDto
    try {
      const response = await requestWrapper(url, 'POST', body)
      if(!response.ok) {
        throw new Error('Failed to login')
      }
      let data = await response.json()

      store.dispatch('saveToast', { text: `Logged in as guest ${data?.username}`, type: TOAST_TYPE.SUCCESS });
      return data
    } catch (error) {
      store.dispatch('saveToast', { text: `Failed to login`, type: TOAST_TYPE.ERROR });
      return null;
    }
  },

  logout: async (userDto) => {
    const url = `${BACKEND_URL}${USER_SESSIONS_PATH}/logout`
    let body = userDto
    try {
      const response = await requestWrapper(url, 'POST', body)
      if(!response.ok) {
        throw new Error('Failed to login')
      }
      let data = await response.json()
      
      store.dispatch('saveToast', { text: `Logged out`, type: TOAST_TYPE.SUCCESS });
      return data
    } catch (error) {
      store.dispatch('saveToast', { text: `Failed to logout`, type: TOAST_TYPE.ERROR });
      return null;
    }
  },
}

export default loginApi