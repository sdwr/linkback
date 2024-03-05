import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import IUser from '#models/request_objects/iUser'

import { createGuestUserValidator, createUserValidator, updateUserValidator } from '#validators/user_validator'
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
    user.save();

    return response.json(user)
  }

  async update({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(updateUserValidator)
    const iUser = validatedData as IUser

    const user = await User.findOrFail(iUser.id)
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


}