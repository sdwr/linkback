import externalApi from "./externalApi";

import { 
  createUserDto, 
  createLinkDto, 
  createVoteDto,
  createCommentDto, 
  createSavedLinkDto, 
  createTagDto,
  createUserActionDto,
  createTagLinkDto,
  
} from "@/utils"

import { 
  ACTION_SUBMIT,
  ACTION_SAVE,
  ACTION_UNSAVE,
  ACTION_TAG,
  ACTION_CREATETAG,

 } from "@/consts"

import {
  mockLinkData,
  mockUserData,
} from "@/mockData";

let mockUsers = [];
let mockLinks = [];
let mockVotes = [];
let mockComments = [];
let mockSavedLinks = [];
let mockTags = [];
let mockTaggedLinks = [];
let mockUserActions = [];

let mockUser = {
  userId: 1,
  username: "John Doe",
  email: "test@test.com",
}

mockLinks = mockLinkData;
mockUsers = mockUserData;

const api = {
  mockUser: mockUser,

  //API adds
  addUser: async (data) => {
    const user = createUserDto(data);
    mockUsers.push(user);
    return user;
  },

  addLink: async (data) => {
    let link = createLinkDto(data);
    link = await externalApi.addSiteData(link);

    let duplicateUrl, duplicateContent;
    //dont add link if its a duplicate (same url or same contentId + domain)
    if(!link.isClip) {
      duplicateUrl = mockLinks.find(l => l.url === link.url);
      if(link.contentId && link.domain) {
        duplicateContent = mockLinks.find(l => l.contentId === link.contentId && l.domain === link.domain);
      }
    } else {
      // allow duplicate clips for now
    }

    if (duplicateUrl || duplicateContent) {
      console.log('duplicate link', link);
      return null;
    }

    mockLinks.push(link);
    await api.addUserAction({ userId: link.userId, actionType: ACTION_SUBMIT, itemId: link.linkId });

    return link;
  },

  updateLink: async (data) => {
    let linkId = parseInt(data.linkId);
    if(!linkId) {
      console.log("updateLink: invalid linkId", linkId, data)
      return null;
    }

    let linkIndex = mockLinks.findIndex(link => link.linkId === linkId);

    //reuse old linkId (create fn will generate new one)
    let link = createLinkDto(data);
    link.linkId = linkId

    if(linkIndex !== -1) {
      mockLinks[linkIndex] = link;
      return link;
    } else {
      console.log("updateLink: link not found", linkId, data)
      return null;
    }
  },

  addVote: async (data) => {
    const vote = createVoteDto(data);
    mockVotes.push(vote);
    return vote;
  },

  addComment: async (data) => {
    const comment = createCommentDto(data);
    mockComments.push(comment);
    return comment;
  },

  addSavedLink: async (data) => {
    //TODO: check if savedLink already exists
    const savedLink = createSavedLinkDto(data);

    mockSavedLinks.push(savedLink);
    await api.addUserAction({ userId: savedLink.userId, actionType: ACTION_SAVE, itemId: savedLink.linkId });


    return savedLink;
  },

  addTag: async (data) => {
    //tag names must be unique, check if tag already exists
    const oldTag = mockTags.find(tag => tag.name === data.name);
    if (oldTag) {
      console.log("addTag: tag already exists", oldTag);
      return oldTag;
    }
    const tag = createTagDto(data);

    mockTags.push(tag);
    await api.addUserAction({ userId: tag.userId, actionType: ACTION_CREATETAG, itemId: tag.tagId });

    return tag;
  },

  addTaggedLink: async (data) => {
    const taggedLink = createTagLinkDto(data);
    //check if tag already exists, after creating dto (for validation)
    let tagsByLink = await api.getTagsByLink(data.linkId);
    let oldTaggedLink = tagsByLink
      .filter(taggedLink => taggedLink.tagId === taggedLink.tagId)
      .find(taggedLink => taggedLink.linkId === taggedLink.linkId);

    if (oldTaggedLink) {
      console.log("addTaggedLink: taggedLink already exists", oldTaggedLink);
      return oldTaggedLink;
    }

    mockTaggedLinks.push(taggedLink);
    await api.addUserAction({ userId: taggedLink.userId, actionType: ACTION_TAG, itemId: taggedLink.linkId });
    
    return taggedLink;
  },

  addUserAction: async (data) => {
    const userAction = createUserActionDto(data);
    mockUserActions.push(userAction);
    return userAction;
  },

  //complex adds
  //save / unsave link
  saveLink: async (userId, linkId) => {
    // check if user has already saved link
    const savedLink = mockSavedLinks.find(savedLink => savedLink.userId === userId && savedLink.linkId === linkId);
    if (savedLink) {
      return savedLink;
    }
    const newSavedLink = await api.addSavedLink({ userId, linkId });

    return newSavedLink;
  },

  unsaveLink: async (userId, linkId) => {
    const savedLink = mockSavedLinks.find(savedLink => savedLink.userId === userId && savedLink.linkId === linkId);
    if (savedLink) {
      
      mockSavedLinks = mockSavedLinks.filter(savedLink => savedLink.userId !== userId || savedLink.linkId !== linkId);
      await api.addUserAction({ userId, actionType: ACTION_UNSAVE, itemId: linkId });

      return true;
    }
    return false;
  },

  //add tag to link - complexity here is that we need to create a new tag if it doesnt exist
  //means name must be unique
  addTagToLink: async (userId, linkId, tagName) => {
    let tag = mockTags.find(tag => tag.name === tagName);
    if (!tag) {
      tag = await api.addTag({ userId, name: tagName });
    }
    if (!tag) {
      console.log("addTagToLink: failed to create tag", tagName);
      return null;
    }
    const taggedLink = await api.addTaggedLink({ userId, linkId, tagId: tag.tagId });
    return taggedLink;
  },



  //API gets
  getUser: async (userId) => {
    let user = mockUsers.find(user => user.userId === userId);
    return user;
  },

  getUsers: async () => {
    return mockUsers;
  },

  getLink: async (linkId) => {
    linkId = parseInt(linkId);
    let result = mockLinks.find(link => link.linkId === linkId);
    return result;
  },

  getLinks: async () => {
    return mockLinks;
  },

  //copy to avoid modifying original data
  addUserDataToLinks: async (userId, links) => {
    let savedLinks = mockSavedLinks.filter(savedLink => savedLink.userId === userId).map(savedLink => savedLink.linkId);
    let linksCopy = JSON.parse(JSON.stringify(links));

    links = linksCopy.map(link => {
      if (savedLinks.includes(link.linkId)) {
        link.saved = true;
      }
      return link;
    });
    return links;
  },

  getLinksByUser: async (userId) => {
    return mockLinks.filter(link => link.userId === userId) || [];
  },

  getCommentsByLink: async (linkId) => {
    return mockComments.filter(comment => comment.linkId === linkId) || [];
  },

  getVotesByLink: async (linkId) => {
    return mockVotes.filter(vote => vote.linkId === linkId) || [];
  },

  getTagsByLink: async (linkId) => {
    return mockTaggedLinks.filter(taggedLink => taggedLink.linkId === linkId) || [];
  },

  getUserActions: async (userId) => {
    return mockUserActions.filter(userAction => userAction.userId === userId) || [];
  },

  // Complex Endpoints

  getSavedLinksByUser: async (userId) => {
    let savedLinks = mockSavedLinks.filter(savedLink => savedLink.userId === userId).map(savedLink => savedLink.linkId);
    let links = mockLinks.filter(link => savedLinks.includes(link.linkId));
    return links;
  },


  getNewLinks: async (limit = 10) => {
    return mockLinks.sort((a, b) => b.submitDate - a.submitDate).slice(0, limit);
  },

  getTopLinks: async (limit = 10) => {
    const linkVotes = mockLinks.map(link => {
      const votes = mockVotes.filter(vote => vote.linkId === link.linkId);
      const upvotes = votes.filter(vote => vote.voteType === 'upvote').length;
      return { ...link, voteCount: upvotes };
    });

    return linkVotes.sort((a, b) => b.voteCount - a.voteCount).slice(0, limit);
  },

  getTopLinksWithUserData: async (userId) => {
    let topLinks = await api.getTopLinks();
    topLinks = await api.addUserDataToLinks(userId, topLinks);

    return topLinks;
  },

  getNewLinksWithUserData: async (userId) => {
    let newLinks = await api.getNewLinks();
    newLinks = await api.addUserDataToLinks(userId, newLinks);

    return newLinks;
  },

  //check if user has saved link
  checkUserSavedLink: async (userId, linkId) => {
    const savedLink = mockSavedLinks.find(savedLink => savedLink.userId === userId && savedLink.linkId === linkId);
    return savedLink ? savedLink : false;
  },

  getTags: async () => {
    return mockTags;
  },

  getLinksByTag: async (data) => {
    let links = mockTaggedLinks.filter(taggedLink => taggedLink.tagId === data.tagId).map(taggedLink => taggedLink.linkId);
    links = mockLinks.filter(link => links.includes(link.linkId));
    return links;
  },


};

export default api;