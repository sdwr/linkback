import externalApi from "./externalApi";
import backendApi from "@/api/backendApi";

import store from "@/store";

import { 
  createUserDto,
  updateUserDto,
  upgradeGuestUserDto,
  createLinkDto, 
  updateLinkDto,
  createVoteDto,
  createCommentDto, 
  createSavedLinkDto, 
  createTagDto,
  createUserActionDto,
  createTagLinkDto,

  encodeURIComponent,
  
} from "@/utils"

import { 
  SUBMIT,
  SAVE,
  UNSAVE,
  TAG,
  CREATETAG,
  VOTE,
  COMMENT,
  UNCOMMENT,
  UPGRADEACCOUNT,
  EDITACCOUNT,

  TOAST_TYPE,

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
let mockTagLinks = [];
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
// - check if tag link already exists
// - check if saved link already exists


const api = {
  //delete all
  tableList: [
    'users',
    'links',
    'votes',
    'comments',
    'savedlinks',
    'tags',
    'taglinks',
    'useractions'
  ],

  deleteAll: async () => {
    let results = [];
    for (let table of api.tableList) {
      let result = await api.deleteTable(table);
      results.push(result);
    }
    return results;

  },

  deleteTable: async (tableName) => {
    if (api.tableList.includes(tableName)) {
      backendApi.deleteTableData(tableName);
    } else {
      console.error("deleteTable: invalid table name", tableName);
      return null;
    }
  },

  //API adds

  upgradeGuestUser: async (data) => {
    try{
      let id = parseInt(data.id);
      if(!id) {
        console.log("upgradeGuestUser: invalid id", id, data)
        return null;
      }
      const userDto = upgradeGuestUserDto(data);
      userDto.id = id;
  
      let user = await backendApi.upgradeGuestUser(id, userDto);
      if(!user) {
        throw new Error("upgradeGuestUser: failed to upgrade user");
      }
      
      store.dispatch('saveUser', user);
      await api.addUserAction({ userId: user.id, actionType: UPGRADEACCOUNT, itemId: user.id }); 
      store.dispatch('saveToast', { text: 'User upgraded', type: TOAST_TYPE.SUCCESS });
      return user;

    } catch(error) {
      console.log("upgradeGuestUser: error", error);
      store.dispatch('saveToast', { text: 'Failed to upgrade user', type: TOAST_TYPE.ERROR });
      return null;
    }
  },
  updateUser: async (data) => {
    let id = parseInt(data.id);
    if(!id) {
      console.log("updateUser: invalid id", id, data)
      return null;
    }
    let userDto = updateUserDto(data);
    userDto.id = id;

    let user = await backendApi.updateUser(id, userDto);
    if(user) {
      store.dispatch('saveUser', user);
      store.dispatch('saveToast', { text: `User ${user.username} updated`, type: TOAST_TYPE.SUCCESS });
      await api.addUserAction({ userId: user.id, actionType: EDITACCOUNT, itemId: user.id }); 
    } else {
      store.dispatch('saveToast', { text: `Failed to update user ${userDto.username}`, type: TOAST_TYPE.ERROR });
    }
    return user;
  },
  
  addLink: async (data) => {
    let linkDto = createLinkDto(data);
    linkDto = await externalApi.addSiteData(linkDto);

    let link = await backendApi.createLink(linkDto);
    if (!link) {
      store.dispatch('saveToast', { text: 'Failed to add link', type: TOAST_TYPE.ERROR });
      return null;
    }

    store.dispatch('saveToast', { text: 'Link added', type: TOAST_TYPE.SUCCESS });
    await api.addUserAction({ userId: link.userId, actionType: SUBMIT, itemId: link.id });

    return link;
  },

  updateLink: async (data) => {
    let id = parseInt(data.id);
    if(!id) {
      console.log("updateLink: invalid id", id, data)
      return null;
    }

    let linkDto = updateLinkDto(data);
    linkDto.id = id;

    let link = await backendApi.updateLink(id, data);
    return link;
  },

  deleteLink: async (id) => {
    let link = await backendApi.deleteLink(id);
    return link;
  },
  //uses create or update so it will overwrite existing vote
  addVote: async (data) => {
    const voteDto = createVoteDto(data);

    let vote = await backendApi.createOrUpdateVote(voteDto);
    if (!vote) {
      console.log("addVote: failed to add vote", vote);
      return null;
    }
    await api.addUserAction({ userId: vote.userId, actionType: VOTE, itemId: vote.linkId });

    return vote;
  },

  addComment: async (data) => {
    const commentDto = createCommentDto(data);

    let comment = await backendApi.createComment(commentDto);
    if (!comment) {
      console.log("addComment: failed to create comment", comment);
      return null;
    }
    await api.addUserAction({ userId: comment.userId, actionType: COMMENT, itemId: comment.linkId });

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
    await api.addUserAction({ userId: savedLink.userId, actionType: SAVE, itemId: savedLink.linkId });


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
    await api.addUserAction({ userId: tag.userId, actionType: CREATETAG, itemId: tag.id });

    return tag;
  },

  addTagLink: async (data) => {
    const tagLinkDto = createTagLinkDto(data);
    //TODO: move to backend
    //check if tag already exists, after creating dto (for validation)
    // let tagLinks = await api.getTagLinks();
    // let oldtagLink = tagLinks
    //   .filter(t => t.tagId === tagLink.tagId)
    //   .find(t => t.linkId === tagLink.linkId);

    // if (oldtagLink) {
    //   console.log("addtagLink: tag link already exists", oldtagLink);
    //   return oldtagLink;
    // }

    let tagLink = await backendApi.createTagLink(tagLinkDto);
    if (!tagLink) {
      console.log("addtagLink: failed to create tag link", tagLink);
      return null;
    }
    await api.addUserAction({ userId: tagLink.userId, actionType: TAG, itemId: tagLink.linkId });
    
    return tagLink;
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
    await api.addUserAction({ userId, actionType: UNSAVE, itemId: linkId });

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
    const tagLink = await api.addTagLink({ userId, linkId, tagId: tag.id });
    if(tagLink) {
      store.dispatch('saveToast', { text: 'Tag added', type: TOAST_TYPE.SUCCESS });
    }
    return tagLink;
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

  getSubmittedLinksByUser: async (userId) => {
    let links = backendApi.getSubmittedLinksByUserId(userId);
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

  getTagLinks: async () => {
    let tagLinks = backendApi.getAllTagLinks();
    return tagLinks;
  },

  getTagLinksByLink: async (linkId) => {
    let tags = backendApi.getTagLinksByLinkId(linkId);
    return tags;
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

  getTopTags: async (limit = 10) => {
    let tags = await backendApi.getTopTags(limit);
    return tags;
  }, 

  //needs to get tag links and then get the tags
  getTagsByLink: async (linkId) => {
    let tags = await backendApi.getTagsByLinkId(linkId);
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

  getLinksByTagWithUserData: async (userId, tagId) => {
    let links = await api.getLinksByTag(tagId);
    links = await api.addUserDataToLinks(userId, links);

    return links;
  },

  getSavedLinksWithUserData: async (userId) => {
    let savedLinks = await api.getSavedLinksByUser(userId);
    savedLinks = await api.addUserDataToLinks(userId, savedLinks);

    return savedLinks;
  },

  getSubmittedLinksWithUserData: async (userId) => {
    let submittedLinks = await api.getSubmittedLinksByUser(userId);
    submittedLinks = await api.addUserDataToLinks(userId, submittedLinks);

    return submittedLinks;
  }




};

export default api;