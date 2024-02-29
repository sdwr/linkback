import Link from '#models/link';
import { ILink } from '#types';
export default class LinkService {

  async getAllLinks() {
    let links = await Link.all();
    return links;
  }

  async getLinkById(id: number) {
    let link = await Link.find(id);
    return link;
  }

  async createLink(data: ILink) {
    let link = new Link();
    link.url = data.url;
    link.title = data.title;
    link.description = data.description;
    link.save();
    return link;
  }

  async updateLink(data: Link) {
    data.save();

    return data;
  }

  async deleteLink(data: Link) {
    let link = await Link.find(data.id);
    if(link) {
      link.delete();
    } else {
      throw new Error('Link not found');
    }
    return link;
  }


}