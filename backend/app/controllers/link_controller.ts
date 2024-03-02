import LinkService from '#services/link_service';
import { createLinkValidator, updateLinkValidator } from '#validators/link_validator';
import type { HttpContext } from '@adonisjs/core/http'

import Link from '#models/link';
import ILink from '#models/request_objects/iLink';

export default class LinkController {
  constructor(protected linkService: LinkService) {}
  //get all links
  async index({ response }: HttpContext) {
    const links = await Link.all();

    return response.ok(links);
  }
  

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id');

    const link = await Link.findOrFail(id);

    return response.ok(link);
  }

  async create({ request, response }: HttpContext) {
    const validatedLink = await request.validateUsing(createLinkValidator);
    const iLink = validatedLink as ILink;
    
    const link = await Link.create(iLink);

    return response.ok(link);
  }

  async update({ request, response }: HttpContext) {
    const validatedLink = await request.validateUsing(updateLinkValidator);
    const iLink = validatedLink as ILink;

    const link = await Link.findOrFail(iLink.id);
    link.merge(iLink);
    await link.save();

    return response.ok(link);
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id');

    const link = await Link.findOrFail(id);
    await link.delete();

    return response.ok(link);
  }


}