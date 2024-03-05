
import { USER_SESSIONS_PATH } from "./api_routes"

const BACKEND_URL = 'http://localhost:3333'

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