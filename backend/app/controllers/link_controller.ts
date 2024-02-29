import LinkService from '#services/link_service';
import type { HttpContext } from '@adonisjs/core/http'

export default class LinkController {
  constructor(protected linkService: LinkService) {}
  //get all links
  async index({ request }: HttpContext) {
    let links = await this.linkService.getAllLinks();
    return links;
  }
  

  async getOne({ request }: HttpContext) {
    let link = await this.linkService.getLinkById(request.param('id'));
    return link;
  }

  async create({ request }: HttpContext) {
    let link = await this.linkService.createLink(request.body());
    return link;
  }

  async update({ request }: HttpContext) {
    let link = await this.linkService.updateLink(request.param('id'), request.body());
    return link;
  }

  async delete({ request }: HttpContext) {
    let link = await this.linkService.deleteLink(request.param('id'));
    return link;
  }


}