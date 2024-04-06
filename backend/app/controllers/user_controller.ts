import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import IUser from '#models/request_objects/iUser'

import { createGuestUserValidator, createUserValidator, updateUserValidator, upgradeGuestUserValidator } from '#validators/user_validator'
export default class UserController {
  constructor() {}

  async index({ response }: HttpContext) {
    const users = await User.all()

    return response.json(users)
  }

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id')

    const user = await User.findOrFail(id)

    return response.json(user)
  }

  async create({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createUserValidator)
    const iUser = validatedData as IUser

    const user = await User.create(iUser)

    return response.json(user)
  }

  async createGuest({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createGuestUserValidator)
    const iUser = validatedData as IUser

    const user = await User.create(iUser)
    user.username = `guest${user.id}`
    await user.save();

    return response.json(user)
  }

  async upgradeGuest({ request, response }: HttpContext) {
    const id = request.param('id')
    
    const validatedData = await request.validateUsing(upgradeGuestUserValidator)
    const iUser = validatedData as IUser
    iUser.isGuest = false

    try {
      const user = await User.findOrFail(id)
      user.merge(iUser)
      await user.save()
      return response.json(user)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error: 'An unexpected error occured' })
    }

  }

  async update({ request, response, auth }: HttpContext) {
    const id = request.param('id')

    // if(!auth.isAuthenticated) {
    //   return response.unauthorized('You must be logged in to update your user information')
    // }

    const validatedData = await request.validateUsing(updateUserValidator)
    const iUser = validatedData as IUser

    const user = await User.findOrFail(id)

    //verify that the user is updating their own information
    // if (!auth.user?.id || user.id !== auth.user.id) {
    //   return response.unauthorized('You can only update your own user information')
    // }

    user.merge(iUser)
    await user.save()

    return response.json(user)
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id')

    const user = await User.findOrFail(id)
    await user.delete()

    return response.json(user)
  }

  async deleteAll({ response }: HttpContext) {
    await User.truncate(true)

    return response.ok("All users deleted")
  }
}