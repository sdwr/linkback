import { createLinkValidator, updateLinkValidator } from '#validators/link_validator';
import type { HttpContext } from '@adonisjs/core/http'
import PageViewService from '#services/pageView_service';
import { inject } from '@adonisjs/core'

import Link from '#models/link';
import ILink from '#models/request_objects/iLink';

@inject()
export default class LinkController {
  constructor(protected pageViewService: PageViewService) {}
  //get all links
  async index({ response }: HttpContext) {
    const links = await Link.all();

    return response.ok(links);
  }
  
  async getOne({ request, response, auth, session}: HttpContext) {
    console.log(session.all(), 'session data in getOne')
    console.log(session, 'session in getOne')
    console.log(auth, 'auth in getOne')
    console.log(auth.user, 'auth user in getOne')
    const id = request.param('id');

    const link = await Link.query()
      .where('id', id)
      .preload('user')
      .preload('tags')
      .withCount('pageViews')
      .first();

    if(link) {
      //dont worry about race condition for totalViews
      link.totalViews++
      link.save()
      await this.pageViewService.addPageView(session, link.id);
    }
    return response.ok(link);
  }

  async getSubmittedLinksByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const links = await Link.query()
      .where('userId', userId)
      .preload('user')
      .preload('tags')
      .withCount('pageViews');

    return response.ok(links);
  }

  async getSavedLinksByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const links = await Link.query()
      .select('links.*')
      .innerJoin('saved_links', 'links.id', 'saved_links.link_id')
      .where('saved_links.user_id', userId)
      .preload('user')
      .preload('tags');

    return response.ok(links);
  }

  async getLinksByTag({ request, response }: HttpContext) {
    const tagId = request.param('tagId');

    const links = await Link.query()
      .distinct('links.id')
      .select('links.*')
      .leftJoin('tag_links', 'links.id', 'tag_links.link_id')
      .where('tag_links.tag_id', tagId)
      .preload('user')
      .preload('tags');

    return response.ok(links);
  }

  //query params: amount
  async getNewLinks({ request, response }: HttpContext) {
    const amount = Number(request.input('amount', 10));

    const links = await Link.query()
      .orderBy('created_at', 'desc')
      .limit(amount)
      .preload('user')
      .preload('tags');

    return response.ok(links);
  }

  //query params: amount
  async getTopLinks({ request, response, session }: HttpContext) {
    console.log(session.all(), 'session data in getTopLinks')
    const amount = Number(request.input('amount', 10));

    const links = await Link.query()
      .orderBy('vote_sum', 'desc')
      .limit(amount)
      .preload('user')
      .preload('tags');

    return response.ok(links);
  }

  async createOrGet({ request, response }: HttpContext) {
    const validatedLink = await request.validateUsing(createLinkValidator);
    const iLink = validatedLink as ILink;

    //verify that the link is unique
    //except for clips
    if(!iLink.isClip) {
      const linkExists = await Link.query()
        .where('url', iLink.url)
        .first();
      
      if (linkExists) {
        return response.ok(linkExists);
      }
    }
    
    const link = await Link.create(iLink);

    return response.ok(link);
  }
    
  async create({ request, response }: HttpContext) {
    const validatedLink = await request.validateUsing(createLinkValidator);
    const iLink = validatedLink as ILink;

    //verify that the link is unique
    const linkExists = await Link.query()
      .where('url', iLink.url)
      .first();
    
    if (linkExists) {
      return response.badRequest('Link already exists');
    }
    
    const link = await Link.create(iLink);

    return response.ok(link);
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('id');

    const validatedLink = await request.validateUsing(updateLinkValidator);
    const iLink = validatedLink as ILink;

    const link = await Link.findOrFail(iLink.id);

    //verify that the user owns the link
    //fix when auth works
    //for now only verify on the frontend
    if(false) {
      return response.unauthorized('You can only update your own links');
    }
    
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

  async deleteAll({ response }: HttpContext) {
    await Link.truncate(true);

    return response.ok("All links deleted!");
  }


}