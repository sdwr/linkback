import type { HttpContext } from '@adonisjs/core/http'

import Tag from '#models/tag'
import ITag from '#models/request_objects/iTag'

import { createTagValidator, updateTagValidator } from '#validators/tag_validator'

export default class TagController {
  constructor() {}

  async index({ response }: HttpContext) {
    const tags = await Tag.all()

    return response.json(tags);
  }

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id')

    const tag = await Tag.findOrFail(id)

    return response.json(tag)
  }

  async getTagsByLink({ request, response }: HttpContext) {
    const linkId = request.param('linkId')

    const tags = await Tag.query()
      .where('linkId', linkId)

    return response.json(tags)
  }

  async getTagsByUser({ request, response }: HttpContext) {
    const userId = request.param('userId')

    const tags = await Tag.query()
      .where('userId', userId)

    return response.json(tags)
  }
  
  async create({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createTagValidator)
    const iTag = validatedData as ITag
    
    const tag = await Tag.create(iTag)

    return response.json(tag)
  }

  async update({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(updateTagValidator)
    const iTag = validatedData as ITag

    const tag = await Tag.findOrFail(iTag.id)
    tag.merge(iTag)
    await tag.save()

    return response.json(tag)
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id')

    const tag = await Tag.findOrFail(id)
    await tag.delete()

    return response.json(tag)
  }

  async deleteAll({ response }: HttpContext) {
    await Tag.truncate(true)

    return response.json("All tags deleted!")
  }
}