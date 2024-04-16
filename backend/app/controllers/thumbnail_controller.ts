import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ThumbnailService from '#services/thumbnail_service';

import Link from '#models/link';

@inject()
export default class ThumbnailController {
  constructor(protected thumbnailService: ThumbnailService) {}
  //get all thumbnails
  async index({ response }: HttpContext) {
    //get all thumbnails (just metadata)
  }


  //try to get from folder, if not there, create it
  async getOrFetch({ request, response }: HttpContext) {
    const id = request.param('id');
    if (!id || Number.isNaN(id)) {
      return response.badRequest('No id provided');
    }

    let link = await Link.find(id);
    
    if(!link || !link.url) {
      return response.status(400).json({ message: 'Could not find link in DB' });
    }

    let image =  await this.thumbnailService.getOrFetchThumbnail(link.url, id);
    if(!image) {
      return response.notFound('Thumbnail not found');
    }
    //response.setHeader('Content-Type', 'image/png');
    response.send(image);
  }


  async delete({ request, response }: HttpContext) {
    const id = request.param('id');
    if (!id || Number.isNaN(id)) {
      return response.badRequest('No id provided');
    }

    let deleted = await this.thumbnailService.deleteThumbnail(id);
    if (!deleted) {
      return response.notFound('Thumbnail not found');
    }

    return response.ok('Thumbnail deleted');
  }

  async deleteAll({ response }: HttpContext) {
    //delete all thumbnails
  }
}