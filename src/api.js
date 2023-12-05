
import { createLinkDto, createTagDto } from "@/utils"

let mockLinks = [];
let mockTags = [];

const api = {
  async mockGetLinks(){
    return mockLinks;
  },
  async mockAddLink(url){
    const link = createLinkDto(url);
    mockLinks.push(link);
    return link;
  },
  async mockGetTags(){
    return mockTags;
  },
  async mockAddTag(name){
    let tag = createTagDto(name);
    mockTags.push(tag);
    return tag;
  },
};

export default api;