import externalApi from "./externalApi";
import backendApi from "@/api/backendApi";

import { 
  createUserDto, 
  createLinkDto, 
  createVoteDto,
  createCommentDto, 
  createSavedLinkDto, 
  createTagDto,
  createUserActionDto,
  createTagLinkDto,

  encodeURIComponent,
  
} from "@/utils"

import { 
  ACTION_SUBMIT,
  ACTION_SAVE,
  ACTION_UNSAVE,
  ACTION_TAG,
  ACTION_CREATETAG,
  ACTION_VOTE,
  ACTION_COMMENT,
  ACTION_UNCOMMENT,

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

//TODO: check that all id names going to backend are correct 
//  - just id for primary key, linkId, userId, tagId, etc for foreign keys
//TODO: check that deletes return what is expected from backend
// - deleted item or null
//TODO: move adding user actions to backend
//TODO: move checking for duplicates to backend (including returning the duplicate)
// - check if link already exists
// - check if tag already exists
// - check if tagged link already exists
// - check if saved link already exists


const api = {
  mockUser: mockUser,
  //debug
  createDBDump: async () => {
    let dump = {
      mockUsers,
      mockLinks,
      mockVotes,
      mockComments,
      mockSavedLinks,
      mockTags,
      mockTaggedLinks,
      mockUserActions,
    }
    let json = JSON.stringify(dump);
    localStorage.setItem('dbDump', json);
    console.log('db dump created');
  },

  restoreDBDump: async () => {
    let json = localStorage.getItem('dbDump');
    let dump = JSON.parse(json);

    console.log("restoring db dump", dump)

    mockUsers = dump.mockUsers;
    mockLinks = dump.mockLinks;
    mockVotes = dump.mockVotes;
    mockComments = dump.mockComments;
    mockSavedLinks = dump.mockSavedLinks;
    mockTags = dump.mockTags;
    mockTaggedLinks = dump.mockTaggedLinks;
    mockUserActions = dump.mockUserActions;
  },

  //API adds
  addUser: async (data) => {
    const user = createUserDto(data);
    mockUsers.push(user);
    return user;
  },

  addLink: async (data) => {
    let linkDto = createLinkDto(data);
    linkDto = await externalApi.addSiteData(linkDto);

    let duplicateUrl, duplicateContent;
    //dont add link if its a duplicate (same url or same contentId + domain)
    //TODO: MOVE TO BACKEND
    // if(!link.isClip) {
    //   duplicateUrl = mockLinks.find(l => l.url === link.url);
    //   if(link.contentId && link.domain) {
    //     duplicateContent = mockLinks.find(l => l.contentId === link.contentId && l.domain === link.domain);
    //   }
    // } else {
    //   // allow duplicate clips for now
    // }

    if (duplicateUrl || duplicateContent) {
      console.log('duplicate link', linkDto);
      return null;
    }

    let link = await backendApi.createLink(linkDto);
    if (!link) {
      console.log("addLink: failed to create link", link);
      return null;
    }

    await api.addUserAction({ userId: link.userId, actionType: ACTION_SUBMIT, itemId: link.id });

    return link;
  },

  updateLink: async (data) => {
    let id = parseInt(data.id);
    if(!id) {
      console.log("updateLink: invalid id", id, data)
      return null;
    }

    let linkDto = createLinkDto(data);
    linkDto.id = id;

    let link = await backendApi.updateLink(data);
    return link;
  },

  addVote: async (data) => {
    const voteDto = createVoteDto(data);

    let vote = await backendApi.createVote(voteDto);
    if (!vote) {
      console.log("addVote: failed to create vote", vote);
      return null;
    }
    await api.addUserAction({ userId: vote.userId, actionType: ACTION_VOTE, itemId: vote.linkId });

    return vote;
  },

  addComment: async (data) => {
    const commentDto = createCommentDto(data);

    let comment = await backendApi.createComment(commentDto);
    if (!comment) {
      console.log("addComment: failed to create comment", comment);
      return null;
    }
    await api.addUserAction({ userId: comment.userId, actionType: ACTION_COMMENT, itemId: comment.linkId });

    return comment;
  },

  addSavedLink: async (data) => {
    //TODO: check if savedLink already exists
    const savedLinkDto = createSavedLinkDto(data);

    let savedLink = await backendApi.createSavedLink(savedLinkDto);
    if (!savedLink) {
      console.log("addSavedLink: failed to create saved link", savedLink);
      return null;
    }
    await api.addUserAction({ userId: savedLink.userId, actionType: ACTION_SAVE, itemId: savedLink.linkId });


    return savedLink;
  },

  addTag: async (data) => {
    //TODO: move to backend
    //tag names must be unique, check if tag already exists
    // const oldTag = mockTags.find(tag => tag.name === data.name);
    // if (oldTag) {
    //   console.log("addTag: tag already exists", oldTag);
    //   return oldTag;
    // }
    const tagDto = createTagDto(data);

    let tag = await backendApi.createTag(tagDto);
    if (!tag) {
      console.log("addTag: failed to create tag", tag);
      return null;
    }
    await api.addUserAction({ userId: tag.userId, actionType: ACTION_CREATETAG, itemId: tag.id });

    return tag;
  },

  addTaggedLink: async (data) => {
    const taggedLinkDto = createTagLinkDto(data);
    //TODO: move to backend
    //check if tag already exists, after creating dto (for validation)
    // let taggedLinks = await api.getTaggedLinks();
    // let oldTaggedLink = taggedLinks
    //   .filter(t => t.tagId === taggedLink.tagId)
    //   .find(t => t.linkId === taggedLink.linkId);

    // if (oldTaggedLink) {
    //   console.log("addTaggedLink: tagged link already exists", oldTaggedLink);
    //   return oldTaggedLink;
    // }

    let taggedLink = await backendApi.createTagLink(taggedLinkDto);
    if (!taggedLink) {
      console.log("addTaggedLink: failed to create tagged link", taggedLink);
      return null;
    }
    await api.addUserAction({ userId: taggedLink.userId, actionType: ACTION_TAG, itemId: taggedLink.linkId });
    
    return taggedLink;
  },

  addUserAction: async (data) => {
    const userActionDto = createUserActionDto(data);

    let userAction = await backendApi.createUserAction(userActionDto);
    
    return userAction;
  },

  //complex adds
  //save / unsave link
  saveLink: async (userId, linkId) => {
    //TODO: move to backend
    //TODO: remove after moving to backend, unnecessary
    // // check if user has already saved link
    // const savedLink = mockSavedLinks.find(savedLink => savedLink.userId === userId && savedLink.linkId === linkId);
    // if (savedLink) {
    //   return savedLink;
    // }
    const newSavedLink = await api.addSavedLink({ userId, linkId });

    return newSavedLink;
  },

  unsaveLink: async (userId, linkId) => {

    let savedLink = backendApi.deleteSavedLinkByUserAndLinkId(userId, linkId);
    if (!savedLink) {
      console.log("unsaveLink: failed to unsave link", savedLink);
      return false;
    }
    await api.addUserAction({ userId, actionType: ACTION_UNSAVE, itemId: linkId });

    return true;
  },

  //add tag to link - complexity here is that we need to create a new tag if it doesnt exist
  //means name must be unique
  addTagToLink: async (userId, linkId, tagName) => {
    // create tag should return existing tag if it already exists
    let tag = await api.addTag({ userId, name: tagName });
    if (!tag) {
      console.log("addTagToLink: failed to create tag", tagName);
      return null;
    }
    const taggedLink = await api.addTaggedLink({ userId, linkId, tagId: tag.id });
    
    return taggedLink;
  },



  //API gets
  getUser: async (userId) => {
    let user = await backendApi.getUserById(userId);
    return user;
  },

  getUsers: async () => {
    let users = await backendApi.getAllUsers();
    return users;
  },

  getLink: async (linkId) => {
    linkId = parseInt(linkId);
    let link = await backendApi.getLinkById(linkId);
    return link;
  },

  getLinks: async () => {
    let links = await backendApi.getAllLinks();
    return links;
  },

  //copy to avoid modifying original data
  addUserDataToLinks: async (userId, links) => {
    let savedLinks = await api.getSavedLinksByUser(userId) || [];
    let savedLinkIds = savedLinks.map(savedLink => savedLink.linkId);

    let linksCopy = structuredClone(links) || [];

    let updatedLinks = linksCopy.map(link => {
      if (savedLinkIds.includes(link.id)) {
        link.saved = true;
      }
      return link;
    });
    return updatedLinks;
  },

  getLinksByUser: async (userId) => {
    let links = backendApi.getLinksByUserId(userId);
    return links;
  },

  getCommentsByLink: async (linkId) => {
    let comments = backendApi.getCommentsByLinkId(linkId);
    return comments;
  },

  getVotesByLink: async (linkId) => {
    let votes = backendApi.getVotesByLinkId(linkId);
    return votes;
  },

  getTagsByLink: async (linkId) => {
    let tags = backendApi.getTagsByLinkId(linkId);
    return tags;
  },

  getTaggedLinks: async () => {
    let taggedLinks = backendApi.getAllTagLinks();
    return taggedLinks;
  },

  getSavedLinks: async () => {
    let savedLinks = backendApi.getAllSavedLinks();
    return savedLinks;
  },

  getUserActions: async () => {
    let userActions = backendApi.getAllUserActions();
    return userActions;
  },

  getUserActionsByUser: async (userId) => {
    let userActions = backendApi.getUserActionsByUserId(userId);
    return userActions;
  },

  getComments: async () => {
    let comments = backendApi.getAllComments();
    return comments;
  },

  getVotes: async () => {
    let votes = backendApi.getAllVotes();
    return votes;
  },

  // Complex Endpoints

  getSavedLinksByUser: async (userId) => {
    let savedLinks = backendApi.getSavedLinksByUserId(userId);
    return savedLinks;
  },


  getNewLinks: async (limit = 10) => {
    let links = await backendApi.getNewLinks(limit);
    return links;
  },

  getTopLinks: async (limit = 10) => {
    let links = await backendApi.getTopLinks(limit);
    return links;
  },

  //check if user has saved link
  checkUserSavedLink: async (userId, linkId) => {
    let savedLink = await backendApi.getSavedLinkByUserIdAndLinkId(userId, linkId);
    return savedLink ? true : false;
  },

  getTag: async (tagId) => {
    tagId = parseInt(tagId);
    let tag = await backendApi.getTagById(tagId);
    return tag;
  },
  
  getTags: async () => {
    let tags = await backendApi.getAllTags();
    return tags;
  },

  getLinksByTag: async (data) => {
    let links = await backendApi.getLinksByTag(data);
    return links;
  },

  //get with user data (saved)

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

  getLinksByTagWithUserData: async (userId, data) => {
    let links = await api.getLinksByTag(data);
    links = await api.addUserDataToLinks(userId, links);

    return links;
  },

  getSavedLinksWithUserData: async (userId) => {
    let savedLinks = await api.getSavedLinksByUser(userId);
    savedLinks = await api.addUserDataToLinks(userId, savedLinks);

    return savedLinks;
  },

  getSubmittedLinksWithUserData: async (userId) => {
    let submittedLinks = await api.getLinksByUser(userId);
    submittedLinks = await api.addUserDataToLinks(userId, submittedLinks);

    return submittedLinks;
  }




};

export default api;