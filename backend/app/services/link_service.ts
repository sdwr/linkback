import Link from '#models/link';

export default class LinkService {

  async getAllLinks() {
    let links = await Link.all();
    return links;
  }

  async getLinkById(id: number) {
    let link = await Link.find(id);
    return link;
  }

  async createLink(data: any) {
    let link = new Link();
    link.url = data.url;
    link.title = data.title;
    link.description = data.description;
    link.save();
    return link;
  }

  async updateLink(id: number, data: any) {
    let link = await Link.find(id);
    link.url = data.url;
    link.title = data.title;
    link.description = data.description;
    link.save();
    return link;
  }

  async deleteLink(id: number) {
    let link = await Link.find(id);
    link.delete();
    return link;
  }

  
}