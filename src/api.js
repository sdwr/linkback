
import { createLinkDto, createTagDto } from "@/utils"

let mockLinks = [];
let mockTags = [];

let mockUser = {
  id: 1,
  username: "John Doe",
  email: "",
  history: [],
  submittedLinks: [],
  submittedTags: [],
  comments: [],
  votes: [],
  savedLinks: [],
  savedTags: [],
}

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
  async mockGetLinksByTag(tag){
    if(tag) {
      return mockLinks
    }
  },

  async fetchUser(id) {
    if(id) {
      return mockUser;
    }
  },
  async fetchRecentChanges(userId){
    if(userId) {
      return {links: mockLinks, tags: mockTags};
    }
  }
};

export default api;