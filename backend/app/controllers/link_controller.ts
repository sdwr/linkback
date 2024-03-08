import { createLinkValidator, updateLinkValidator } from '#validators/link_validator';
import type { HttpContext } from '@adonisjs/core/http'


import Link from '#models/link';
import ILink from '#models/request_objects/iLink';

export default class LinkController {
  constructor() {}
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

  async getLinksByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const links = await Link.query()
      .where('userId', userId)

    return response.ok(links);
  }

  async getLinksByTag({ request, response }: HttpContext) {
    const tagId = request.param('tagId');

    const links = await Link.query()
      .select('links.*')
      .leftJoin('tag_links', 'links.id', 'tag_links.link_id')
      .where('tag_links.tag_id', tagId);

    return response.ok(links);
  }

  //query params: amount
  async getNewLinks({ request, response }: HttpContext) {
    const amount = Number(request.input('amount', 10));

    const links = await Link.query()
      .orderBy('created_at', 'desc')
      .limit(amount);

    return response.ok(links);
  }

  //query params: amount
  async getTopLinks({ request, response }: HttpContext) {
    const amount = Number(request.input('amount', 10));

    const links = await Link.query()
      .select('links.*')
      .leftJoin('votes', 'links.id', 'votes.link_id')
      .groupBy('links.id')
      .orderByRaw('SUM(votes.vote_value) DESC')
      .limit(amount);

    return response.ok(links);
  }

  async getWithVotes({ request, response }: HttpContext) {
    const linkIds = request.input('linkIds');

    const links = await Link.query()
      .whereIn('links.id', linkIds)
      .leftJoin('votes', 'links.id', 'votes.link_id')
      .groupBy('links.id')
      .sum('votes.vote_value as votesSum');

    return response.ok(links);
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