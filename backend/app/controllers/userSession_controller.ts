import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

import User from '#models/user'
import UserSession from '#models/userSession'

export default class UserSessionController {
  constructor() {}

  async index({ response }: HttpContext) {
    const userSessions = await UserSession.all()

    return response.json(userSessions)
  }

  async login({ request, auth, response }: HttpContext) {
    //extract user session info from request
    const {email, password} = request.only(['email', 'password'])
    const {id, isGuest} = request.only(['id', 'isGuest'])

    let user = null;
    if (isGuest) {
      user = await User.query()
      .where('id', id)
      .andWhere('isGuest', true)
      .firstOrFail()
    } else {
      // adonis auth is not working!
      // verify credentials manually for now
      // user = await User.verifyCredentials(email, password)

      user = await User.findBy('email', email)
      if (!user) {
        return response.status(401).json({error: 'Invalid email or password'})
      }
      await hash.verify(user.password, password)

    }
    
    await auth.use('web').login(user)

    return response.json(user)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.json({message: 'logged out'})
  }
  
}

