import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import UserSessionController from '#controllers/userSession_controller';

export default class SessionMiddleware {
  
  async handle(ctx: HttpContext, next: NextFn) {
    const { session } = ctx

    //userId is stored in session as session.auth_web (default??)
    let userId = session.get('auth_web');


    // //make a session token if it doesn't exist 
    // //only used to link page views to a user
    // //the user gets attached to the session on login
    // let sessionToken = session.get('sessionToken')
    // console.log('session token', sessionToken)
    // if (!sessionToken) {
    //   console.log('no session token found')
    //   sessionToken = Math.random().toString(36).substring(7)
    //   session.put('sessionToken', sessionToken)
    //   console.log('new session token created', sessionToken)
    //   new UserSessionController().createUserSession(sessionToken)
    // }

    return next()
  }

}
