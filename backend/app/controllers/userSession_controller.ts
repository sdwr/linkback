import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import UserSession from '#models/userSession'
import IUserSession from '#models/request_objects/iUserSession'
import UserSessionUtils from '#services/user_session_utils'

export default class UserSessionController {
  constructor(protected userSessionUtils: UserSessionUtils) {}

  async index({ response }: HttpContext) {
    const userSessions = await UserSession.all()

    return response.json(userSessions)
  }

  async onFirstLogin({ request, response }: HttpContext) {
    //create a new guest user
    let guestUser = await User.create({
      username: '',
      email: '',
      password: '',
      date: new Date(),
    })

    guestUser.username = 'guest' + guestUser.id
    await guestUser.save() 

    //extract device info from request
    let deviceInfo = request.input('deviceInfo')

    //create a new user session
    let userSession = await UserSession.create({
      userId: guestUser.id,
      sessionToken: '',
      deviceInfo: deviceInfo,
      date: new Date(),
    })
    



    //return user session
    return response.json(userSession)
  }

  async loginWithSessionToken({ request, response }: HttpContext) {
    //find user session by session token
    let sessionToken = request.input('sessionToken')
    let userSession = await UserSession.findBy('sessionToken', sessionToken)
    
    //verify user session


    //return user session
  }

