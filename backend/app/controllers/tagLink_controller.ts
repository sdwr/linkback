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

    const tagLinks = await TagLink.findBy('linkId', linkId);

    return response.ok(tagLinks);
  }

  async getTagLinksByTag({ request, response }: HttpContext) {
    const tagId = request.param('tagId');

    const tagLinks = await TagLink.findBy('tagId', tagId);

    return response.ok(tagLinks);
  }

  async getTagLinksByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const tagLinks = await TagLink.findBy('userId', userId);

    return response.ok(tagLinks);
  }

  async create({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createTagLinkValidator);
    const iTagLink = validatedData as ITagLink;

    const tagLink = await TagLink.create(iTagLink);

    return response.ok(tagLink);
  }

  async update({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(updateTagLinkValidator);
    const iTagLink = validatedData as ITagLink;

    const tagLink = await TagLink.findOrFail(iTagLink.id);
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
  
}