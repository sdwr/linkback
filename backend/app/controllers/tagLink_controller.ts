import type { HttpContext } from '@adonisjs/core/http';

import TagLink from '#models/tagLink';
import ITagLink from '#models/request_objects/iTagLink';

import { createTagLinkValidator, updateTagLinkValidator } from '#validators/tagLink_validator';

export default class TagLinkController {
  constructor() {}

  async index({ response }: HttpContext) {
    const tagLinks = await TagLink.all();

    return response.ok(tagLinks);
  }

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id');

    const tagLink = await TagLink.findOrFail(id);

    return response.ok(tagLink);
  }

  async getTagLinksByLink({ request, response }: HttpContext) {
    const linkId = request.param('linkId');

    const tagLinks = await TagLink.query()
      .where('linkId', linkId);

    return response.ok(tagLinks);
  }

  async getTagLinksByTag({ request, response }: HttpContext) {
    const tagId = request.param('tagId');

    const tagLinks = await TagLink.query()
      .where('tagId', tagId);

    return response.ok(tagLinks);
  }

  async getTagLinksByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const tagLinks = await TagLink.query()
      .where('userId', userId);

    return response.ok(tagLinks);
  }

  //should be unique for each linkId-tagId pair
  async createOrGet({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createTagLinkValidator);
    const iTagLink = validatedData as ITagLink;

    // Check if the tagLink already exists
    const tagLink = await TagLink.query()
      .where('linkId', iTagLink.linkId)
      .where('tagId', iTagLink.tagId)
      .first();
    
    if (tagLink) {
      return response.ok(tagLink);
    } else {
      const newTagLink = await TagLink.create(iTagLink);
      return response.ok(newTagLink);
    }
  }

  async update({ request, response, auth }: HttpContext) {
    const id = request.param('id');

    const validatedData = await request.validateUsing(updateTagLinkValidator);
    const iTagLink = validatedData as ITagLink;

    const tagLink = await TagLink.findOrFail(id);

    //verify that the user owns the tagLink
    if (!auth.user?.id || tagLink.userId !== auth.user.id) {
      return response.unauthorized('You can only update your own tagLink information');
    }

    tagLink.merge(iTagLink);
    await tagLink.save();

    return response.ok(tagLink);
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id');

    const tagLink = await TagLink.findOrFail(id);
    await tagLink.delete();

    return response.ok(tagLink);
  }
  
  async deleteAll({ response }: HttpContext) {
    await TagLink.truncate(true);

    return response.ok("All tagLinks deleted!");
  }
}