import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

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

  async getTagsByUser({ request, response }: HttpContext) {
    const userId = request.param('userId')

    const tags = await Tag.query()
      .where('userId', userId)

    return response.json(tags)
  }

  async getTagsByLink({ request, response }: HttpContext) {
    const linkId = request.param('linkId')

    const tags = await Tag.query()
      .select('tags.*')
      .leftJoin('tag_links', 'tags.id', 'tag_links.tag_id')
      .where('tag_links.link_id', linkId)

    return response.json(tags)
  }

  //order by # of taglinks for each tag for now, later by # of votes
  async getTopTags({ request, response }: HttpContext) {
    const amount = Number(request.input('amount', 10))

    const tags = await Tag.query()
      .select('tags.*')
      .select(db.raw('COUNT(tag_links.id) as tagLinksCount'))
      .leftJoin('tag_links', 'tags.id', '=', 'tag_links.tag_id')
      .groupBy('tags.id')
      .orderBy(db.raw('COUNT(tag_links.id)'), 'desc')
      .limit(amount);

    return response.json(tags)
  }
  
  async createOrGet({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createTagValidator)
    const iTag = validatedData as ITag

    // Check if the tag already exists
    const tag = await Tag.query()
      .where('name', iTag.name)
      .first()

    if (tag) {
      return response.json(tag)
    } else {
      const newTag = await Tag.create(iTag)
      return response.json(newTag)
    }
  }

  async update({ request, response, auth }: HttpContext) {
    const id = request.param('id')
    const validatedData = await request.validateUsing(updateTagValidator)
    const iTag = validatedData as ITag

    const tag = await Tag.findOrFail(id)

    //verify that the user owns the tag
    if (!auth.user?.id || tag.userId !== auth.user.id) {
      return response.unauthorized('You can only update your own tag information')
    }
    
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