import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import UserSession from '#models/userSession'
import hash from '@adonisjs/core/services/hash'


export default class UserSessionController {
  constructor() {}

  async index({ response }: HttpContext) {
    const userSessions = await UserSession.all()

    return response.json(userSessions)
  }

  async login({ request, auth, response }: HttpContext) {
    const {email, password} = request.only(['email', 'password'])

    let user = await User.findBy('email', email)
    if (!user) {
      return response.status(401).json({message: 'Invalid credentials'})
    }
    await hash.verify(user.password, password)

    //User is authenticated
    await auth.use('web').login(user)

    return response.json(user)
  }

  async loginGuest({ request, auth, response }: HttpContext) {
    const {id} = request.only(['id'])

    const user = await User.query()
      .where('id', id)
      .andWhere('isGuest', true)
      .firstOrFail()

    await auth.use('web').login(user)

    return response.json(user)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.json({message: 'logged out'})
  }
  
}

