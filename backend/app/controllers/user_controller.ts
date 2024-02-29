import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async index({ response }: HttpContext) {
    return response.json({
      message: 'Hello, world!',
    })
  }
}