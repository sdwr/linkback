import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import IUserSession from '#models/request_objects/iUserSession'
import UserSession from '#models/userSession'

import { DateTime } from 'luxon'

export default class ViewsMiddleware {
  public async handle(ctx: HttpContext, next: NextFn) {
    const { auth, session } = ctx

    //userId is stored in session as session.auth_web (default??)
    let userId = session.get('auth_web');

    if (userId) {
      console.log('is logged in (in session middleware)', userId)
    }


    // if(userId) {
    //   console.log('is logged in (in session middleware)', userId)
    // }
    // console.log(session.all(), 'session data in session middleware')

    // // Check if session already exists for user
    // let sessionToken = session.get('sessionToken')
    // if(!sessionToken) {
    //   // Generate a new session id
    //   sessionToken = Math.random().toString(36).substring(7)
    //   session.put('sessionId', sessionToken)
    // }
    // let existingSession = await UserSession.query().where('session_token', sessionToken).first()

    // if (existingSession) {
    //   // update with userId
    //   if(!existingSession.userId && userId) {
    //     existingSession.userId = userId
    //     await existingSession.save()
    //   }
    // } else {
    //   // Or create a new session record
    //   let iUserSession: IUserSession = {
    //     userId,
    //     sessionToken: sessionToken,
    //     sessionExpiry: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
    //     deviceIP: "test",
    //     date: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
    //   }
    //   existingSession = await UserSession.create(iUserSession)
    // }
    // console.log('session after', session.all()

    return next()

}

}
