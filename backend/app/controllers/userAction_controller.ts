import type { HttpContext } from '@adonisjs/core/http'

import UserAction from '#models/userAction'
import IUserAction from '#models/request_objects/iUserAction'
import { createUserActionValidator, updateUserActionValidator } from '#validators/userAction_validator'

export default class UserActionController {
  constructor() {}

  async index({ response }: HttpContext) {
    const userActions = await UserAction.all()

    return response.json(userActions)
  }

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id')

    const userAction = await UserAction.findOrFail(id)

    return response.json(userAction)
  }

  async getUserActionsByUser({ request, response }: HttpContext) {
    const userId = request.param('userId')

    const userActions = await UserAction.findBy('userId', userId)

    return response.json(userActions)
  }

  async create({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createUserActionValidator)
    const iUserAction = validatedData as IUserAction

    const userAction = await UserAction.create(iUserAction)

    return response.json(userAction)
  }

  async update({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(updateUserActionValidator)
    const iUserAction = validatedData as IUserAction

    const userAction = await UserAction.findOrFail(iUserAction.id)
    userAction.merge(iUserAction)
    await userAction.save()

    return response.json(userAction)
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id')

    const userAction = await UserAction.findOrFail(id)
    await userAction.delete()

    return response.json(userAction)
  }


}