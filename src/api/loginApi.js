
import { USER_SESSIONS_PATH } from "./api_routes"

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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto)
      })
      return response.json()
    } catch (error) {
      console.error('Error logging in:', error)
    }
  },

  logout: async (userDto) => {
    const url = `${BACKEND_URL}${USER_SESSIONS_PATH}/logout`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto)
      })
      return response.json()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  },
}

export default loginApi