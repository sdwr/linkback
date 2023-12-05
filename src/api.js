
import { createLinkDto } from "@/utils"

let mockLinks = [];

const api = {
  async mockGetLinks(){
    return mockLinks;
  },
  async mockAddLink(url){
    const link = createLinkDto(url);
    mockLinks.push(link);
    return link;
  }
};

export default api;