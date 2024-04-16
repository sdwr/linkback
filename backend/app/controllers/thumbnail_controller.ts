import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ThumbnailService from '#services/thumbnail_service';
import app from '@adonisjs/core/services/app'
const fs = require('fs/promises');


@inject()
export default class ThumbnailController {
  constructor(protected thumbnailService: ThumbnailService) {}
  //get all thumbnails
  async index({ response }: HttpContext) {
    //get all thumbnails (just metadata)
  }


  //try to get from folder, if not there, create it
  async getOne({ request, response }: HttpContext) {
    const id = request.param('id');
    if (!id || Number.isNaN(id) {
      return response.badRequest('No id provided');
    }

    let path = app.makePath('thumbnails/' + id + '.png');
    return response.download(path);
  }

  async createOrOverwrite({ request, response }: HttpContext) {
    let thumbnail = request.file('thumbnail', {
      size: '2mb',
      extnames: ['png'],
    });
    if (!thumbnail) {
      return response.badRequest('No thumbnail provided');
    }
    if (!thumbnail.isValid) {
      return response.badRequest({message: 'Invalid thumbnail', errors: thumbnail.errors});
    }

    const id = request.param('id');
    if (!id || Number.isNaN(id)) {
      return response.badRequest('No id provided');
    }

    await this.thumbnailService.createOrOverwrite(id,  thumbnail);

    return response.ok('Thumbnail created or overwritten');

  }
  
  async delete({ request, response }: HttpContext) {
    const id = request.param('id');
    if (!id || Number.isNaN(id) {
      return response.badRequest('No id provided');
    }

    let path = app.makePath('thumbnails/' + id + '.png');
    await fs.unlink(path);

    return response.ok('Thumbnail deleted');
  }

  async deleteAll({ response }: HttpContext) {
    //delete all thumbnails
  }
}