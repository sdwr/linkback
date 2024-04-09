import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import User from '#models/user'
import UserSession from '#models/userSession'
import hash from '@adonisjs/core/services/hash'
import IUser from '#models/request_objects/iUser'
import iUserSession from '#models/request_objects/iUserSession'


export default class UserSessionController {
  constructor() {}

  async index({ response }: HttpContext) {
    const userSessions = await UserSession.all()

    return response.json(userSessions)
  }

  async login({ request, auth, session, response }: HttpContext) {
    const {email, password} = request.only(['email', 'password'])

    let user = await User.findBy('email', email)
    if (!user) {
      return response.status(401).json({message: 'Invalid credentials'})
    }
    await hash.verify(user.password, password)

    //User is authenticated
    await auth.use('web').login(user)
    console.log(session.all(), 'session data in login')

    //dont need to worry about race conditions here
    this.addUserIdToSession(session, user.id)

    return response.json(user)
  }

  async loginGuest({ request, auth, session, response }: HttpContext) {
    const {id} = request.only(['id'])

    const user = await User.query()
      .where('id', id)
      .andWhere('isGuest', true)
      .firstOrFail()

    await auth.use('web').login(user)
    console.log(session.all(), 'session data in loginGuest')

    //dont need to worry about race conditions here
    this.addUserIdToSession(session, user.id)

    return response.json(user)
  }

  async logout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()

    session.clear()

    return response.json({message: 'logged out'})
  }

  async addUserIdToSession(session: any, userId: number) {
    let sessionToken = session.get('sessionToken')

    if(sessionToken) {
      let userSession = await UserSession.findBy('sessionToken', sessionToken)
      if(userSession) {
        userSession.userId = userId
        await userSession.save()
      }
    }
  }

  async createUserSession(sessionToken: string, userId = undefined) {
    let iUserSession = {
      sessionToken,
      userId,
      date: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
    } as iUserSession;

    let userSession = await UserSession.create(iUserSession)

    return userSession
  }
  
}

