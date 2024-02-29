import LinkService from '#services/link_service';
import { createLinkValidator } from '#validators/link_validator';
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
    const payload = await request.validateUsing(createLinkValidator);
    let link = await this.linkService.createLink(payload);
    
    return link;
  }

  async update({ request }: HttpContext) {
    const data = request.all();
    const payload = await createLinkValidator.validate(data);

    let link = await this.linkService.updateLink(payload);
    return link;
  }

  async delete({ request }: HttpContext) {
    let link = await this.linkService.deleteLink(request.param('id'));
    return link;
  }


}