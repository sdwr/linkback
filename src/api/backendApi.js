import store from "@/store";
import { TOAST_TYPE } from "@/consts";

import { 
  createUserDto,
  createGuestUserDto,
  createLinkDto, 
  createVoteDto,
  createCommentDto, 
  createSavedLinkDto, 
  createTagDto,
  createUserActionDto,
  createTagLinkDto,

  encodeURIComponent,
  buildAuthHeader,
  requestWrapper,

} from "@/utils"

import {
  USERS_PATH,
  USER_SESSIONS_PATH,
  USER_ACTIONS_PATH,
  COMMENTS_PATH,
  LINKS_PATH,
  TAGS_PATH,
  VOTES_PATH,
  TAG_LINKS_PATH,
  SAVED_LINKS_PATH,
  THUMBNAIL_PATH,
  } from "./api_routes";

//load the backend url from environment variables
let backendUrl;
if (import.meta.env.PROD) {
  backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
} else {
  backendUrl = import.meta.env.VITE_BACKEND_URL_DEV;
}

const BACKEND_URL = backendUrl;


const backendApi = {

  // Thumbnails
  fetchImage: async (id) => {
    const url = `${BACKEND_URL}${THUMBNAIL_PATH}/getOrFetch/${id}`;
    try {
      const response = await requestWrapper(url, "GET", null, 'image/png');
      if (!response.ok) {
        throw new Error(`Failed to fetch the OG image, status code: ${response.status}`);
      }
      let data = await response.blob();
      //turn the blob into a data url
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(data);

      return imageUrl;
    } catch (error) {
      console.error('Error fetching thumbnail:', error.message);
      return null;
    }
  },

  // Delete table data
  deleteTableData: async (tableName) => {
    const url = `${BACKEND_URL}/${tableName}/deleteAll`;
    try {
      const response = await requestWrapper(url, "DELETE");
      if (!response.ok) {
        throw new Error(`Failed to delete table data, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error deleting table data for ${tableName}:`, error.message);
      return null;
    }
  },

  // User
  getAllUsers: async () => {
    const url = `${BACKEND_URL}${USERS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch users, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      return null;
    }
  },
  getUserById: async (id) => {
    const url = `${BACKEND_URL}${USERS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch user, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
  },
  createUser: async (userData) => {
    const url = `${BACKEND_URL}${USERS_PATH}`;
    let body = createUserDto(userData);
    try {  
      const response = await requestWrapper(url, "POST", body);  
      if (!response.ok) {
        throw new Error(`Failed to create user, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating user:', error.message);
      return null;
    }
  },
  createGuestUser: async (userData) => {
    const url = `${BACKEND_URL}${USERS_PATH}/createGuest`;
    let body = createGuestUserDto(userData);
    try {
      const response = await requestWrapper(url, "POST", body);
      if (!response.ok) {
        store.dispatch('saveToast', { text: `Failed to create guest user`, type: TOAST_TYPE.ERROR });
        throw new Error(`Failed to create guest user, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating guest user:', error.message);
      return null;
    }
  },
  upgradeGuestUser: async (id, userData) => {
    const url = `${BACKEND_URL}${USERS_PATH}/upgradeGuest/${id}`;
    let body = userData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to upgrade guest user, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error upgrading guest user:', error.message);
      return null;
    }
  },
  updateUser: async (id, userData) => {
    const url = `${BACKEND_URL}${USERS_PATH}/${id}`;
    let body = userData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update user, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating user:', error.message);
      return null;
    }
  },
  deleteUser: async (id) => {
    const url = `${BACKEND_URL}${USERS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");
      if (!response.ok) {
        throw new Error(`Failed to delete user, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return null;
    }
  },
  // User Session
  getAllUserSessions: async () => {
    const url = `${BACKEND_URL}${USER_SESSIONS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch user sessions, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user sessions:', error.message);
      return null;
    }
  },
  // User Action
  getAllUserActions: async () => {
    const url = `${BACKEND_URL}${USER_ACTIONS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch user actions, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user actions:', error.message);
      return null;
    }
  },
  getUserActionsById: async (id) => {
    const url = `${BACKEND_URL}${USER_ACTIONS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch user action, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user action:', error.message);
      return null;
    }
  },
  getUserActionsByUserId: async (userId) => {
    const url = `${BACKEND_URL}${USER_ACTIONS_PATH}/user/${userId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch user actions, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user actions:', error.message);
      return null;
    }
  },
  createUserAction: async (userActionData) => {
    const url = `${BACKEND_URL}${USER_ACTIONS_PATH}`;
    let body = createUserActionDto(userActionData);
    try {
      const response = await requestWrapper(url, "POST", body);
      if (!response.ok) {
        throw new Error(`Failed to create user action, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating user action:', error.message);
      return null;
    }
  },
  updateUserAction: async (id, userActionData) => {
    const url = `${BACKEND_URL}${USER_ACTIONS_PATH}/${id}`;
    let body = userActionData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update user action, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating user action:', error.message);
      return null;
    }
  },
  deleteUserAction: async (id) => {
    const url = `${BACKEND_URL}${USER_ACTIONS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");
      if (!response.ok) {
        throw new Error(`Failed to delete user action, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting user action:', error.message);
      return null;
    }
  },

  // Link
  getAllLinks: async () => {
    const url = `${BACKEND_URL}${LINKS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching links:', error.message);
      return null;
    }
  },
  //this will be the only request tracked for page views
  getLinkById: async (id) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching link:', error.message);
      return null;
    }
  },
  getSubmittedLinksByUserId: async (userId) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/user/${userId}/submitted`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching links:', error.message);
      return null;
    }
  },
  getLinksByTag: async (tagId) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/tag/${tagId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching links:', error.message);
      return null;
    }
  },
  getNewLinks: async (amount) => {
    //check amount is a number
    if (isNaN(amount)) {
      console.error('Error fetching new links: amount is not a number');
      return null;
    }
    let url = `${BACKEND_URL}${LINKS_PATH}/new`;
    url = url + '?amount=' + amount;

    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch new links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching new links:', error.message);
      return null;
    }
  },
  getTopLinks: async (amount) => {
    //check amount is a number
    if (isNaN(amount)) {
      console.error('Error fetching top links: amount is not a number');
      return null;
    }

    let url = `${BACKEND_URL}${LINKS_PATH}/top`;
    url = url + '?amount=' + amount;

    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch top links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top links:', error.message);
      return null;
    }
  },
  createLink: async (linkData) => {
    const url = `${BACKEND_URL}${LINKS_PATH}`;
    let body = createLinkDto(linkData);
    try {
      const response = await requestWrapper(url, "POST", body);
      if (!response.ok) {
        throw new Error(`Failed to create link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating link:', error.message);
      return null;
    }
  },
  updateLink: async (id, linkData) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/${id}`;
    let body = linkData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating link:', error.message);
      return null;
    }
  },
  deleteLink: async (id) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");

      if (!response.ok) {
        throw new Error(`Failed to delete link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting link:', error.message);
      return null;
    }
  },

  // Comment
  getAllComments: async () => {
    const url = `${BACKEND_URL}${COMMENTS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch comments, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return null;
    }
  },
  getCommentById: async (id) => {
    const url = `${BACKEND_URL}${COMMENTS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch comment, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comment:', error.message);
      return null;
    }
  },
  getCommentsByUserId: async (userId) => {
    const url = `${BACKEND_URL}${COMMENTS_PATH}/user/${userId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch comments, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return null;
    }
  },
  getCommentsByLinkId: async (linkId) => {
    const url = `${BACKEND_URL}${COMMENTS_PATH}/link/${linkId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch comments, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return null;
    }
  },
  createComment: async (commentData) => {
    const url = `${BACKEND_URL}${COMMENTS_PATH}`;
    let body = createCommentDto(commentData);
    try {
      const response = await requestWrapper(url, "POST", body);
      if (!response.ok) {
        throw new Error(`Failed to create comment, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating comment:', error.message);
      return null;
    }
  },
  updateComment: async (id, commentData) => {
    const url = `${BACKEND_URL}${COMMENTS_PATH}/${id}`;
    let body = commentData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update comment, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating comment:', error.message);
      return null;
    }
  },
  deleteComment: async (id) => {
    const url = `${BACKEND_URL}${COMMENTS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");

      if (!response.ok) {
        throw new Error(`Failed to delete comment, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      return null;
    }
  },
  
  // Tag
  getAllTags: async () => {
    const url = `${BACKEND_URL}${TAGS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tags, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tags:', error.message);
      return null;
    }
  },
  getTopTags: async (amount) => {
    //check amount is a number
    if (isNaN(amount)) {
      console.error('Error fetching top tags: amount is not a number');
      return null;
    }
    const url = `${BACKEND_URL}${TAGS_PATH}/top?amount=${amount}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch top tags, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top tags:', error.message);
      return null;
    }
  },

  getTagById: async (id) => {
    const url = `${BACKEND_URL}${TAGS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tag, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tag:', error.message);
      return null;
    }
  },
  getTagsByLinkId: async (linkId) => {
    const url = `${BACKEND_URL}${TAGS_PATH}/link/${linkId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tags, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tags:', error.message);
      return null;
    }
  },
  getTagsByUserId: async (userId) => {
    const url = `${BACKEND_URL}${TAGS_PATH}/user/${userId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tags, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tags:', error.message);
      return null;
    }
  },
  createTag: async (tagData) => {
    const url = `${BACKEND_URL}${TAGS_PATH}`;
    let body = createTagDto(tagData);
    try {
      const response = await requestWrapper(url, "POST", body);

      if (!response.ok) {
        throw new Error(`Failed to create tag, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating tag:', error.message);
      return null;
    }
  },
  updateTag: async (id, tagData) => {
    const url = `${BACKEND_URL}${TAGS_PATH}/${id}`;
    let body = tagData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update tag, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating tag:', error.message);
      return null;
    }
  },
  deleteTag: async (id) => {
    const url = `${BACKEND_URL}${TAGS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");
      if (!response.ok) {
        throw new Error(`Failed to delete tag, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting tag:', error.message);
      return null;
    }
  },

  // Vote
  getAllVotes: async () => {
    const url = `${BACKEND_URL}${VOTES_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch votes, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching votes:', error.message);
      return null;
    }
  },
  getVoteById: async (id) => {
    const url = `${BACKEND_URL}${VOTES_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch vote, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vote:', error.message);
      return null;
    }
  },
  getVotesByLinkId: async (linkId) => {
    const url = `${BACKEND_URL}${VOTES_PATH}/link/${linkId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch votes, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching votes:', error.message);
      return null;
    }
  },
  getVotesByUserId: async (userId) => {
    const url = `${BACKEND_URL}${VOTES_PATH}/user/${userId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch votes, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching votes:', error.message);
      return null;
    }
  },
  createVote: async (voteData) => {
    const url = `${BACKEND_URL}${VOTES_PATH}`;
    let body = createVoteDto(voteData);
    try {
      const response = await requestWrapper(url, "POST", body);

      if (!response.ok) {
        throw new Error(`Failed to create vote, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating vote:', error.message);
      return null;
    }
  },
  createOrUpdateVote: async (voteData) => {
    const url = `${BACKEND_URL}${VOTES_PATH}/createOrUpdate`;
    let body = createVoteDto(voteData);
    try {
      const response = await requestWrapper(url, "POST", body);
      if (!response.ok) {
        throw new Error(`Failed to create or update vote, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating or updating vote:', error.message);
      return null;
    }
  },
  updateVote: async (id, voteData) => {
    const url = `${BACKEND_URL}${VOTES_PATH}/${id}`;
    let body = voteData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update vote, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating vote:', error.message);
      return null;
    }
  },
  deleteVote: async (id) => {
    const url = `${BACKEND_URL}${VOTES_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");

      if (!response.ok) {
        throw new Error(`Failed to delete vote, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting vote:', error.message);
      return null;
    }
  },

  // Tag Link
  getAllTagLinks: async () => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tag links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tag links:', error.message);
      return null;
    }
  },
  getTagLinkById: async (id) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tag link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tag link:', error.message);
      return null;
    }
  },
  getTagLinksByTagId: async (tagId) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}/tag/${tagId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tag links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tag links:', error.message);
      return null;
    }
  },
  getTagLinksByLinkId: async (linkId) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}/link/${linkId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tag links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tag links:', error.message);
      return null;
    }
  },
  getTagLinksByTagId: async (tagId) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}/tag/${tagId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tag links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tag links:', error.message);
      return null;
    }
  },
  getTagLinksByUserId: async (userId) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}/user/${userId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch tag links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tag links:', error.message);
      return null;
    }
  },
  createTagLink: async (tagLinkData) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}`;
    let body = createTagLinkDto(tagLinkData);
    try {
      const response = await requestWrapper(url, "POST", body);
      if (!response.ok) {
        throw new Error(`Failed to create tag link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating tag link:', error.message);
      return null;
    }
  },
  updateTagLink: async (id, tagLinkData) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}/${id}`;
    let body = tagLinkData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update tag link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating tag link:', error.message);
      return null;
    }
  },
  deleteTagLink: async (id) => {
    const url = `${BACKEND_URL}${TAG_LINKS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");
      if (!response.ok) {
        throw new Error(`Failed to delete tag link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting tag link:', error.message);
      return null;
    }
  },

  // Saved Link
  getAllSavedLinks: async () => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch saved links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching saved links:', error.message);
      return null;
    }
  },
  getSavedLinkById: async (id) => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch saved link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching saved link:', error.message);
      return null;
    }
  },
  getSavedLinkByUserIdAndLinkId: async (userId, linkId) => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}/user/${userId}/link/${linkId}`;
    try {
      const response = await requestWrapper(url, "GET");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if(response.status === 404) {
        return null;
      } else {
        throw new Error(`Failed to fetch saved link, status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching saved link:', error.message);
      return null;
    }
  },
  getSavedLinksByUserId: async (userId) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/user/${userId}/saved`;
    try {
      const response = await requestWrapper(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch saved links, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching saved links:', error.message);
      return null;
    }
  },
  createSavedLink: async (savedLinkData) => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}`;
    let body = createSavedLinkDto(savedLinkData);
    try {
      const response = await requestWrapper(url, "POST", body);
      if (!response.ok) {
        throw new Error(`Failed to create saved link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating saved link:', error.message);
      return null;
    }
  },
  updateSavedLink: async (id, savedLinkData) => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}/${id}`;
    let body = savedLinkData;
    try {
      const response = await requestWrapper(url, "PUT", body);
      if (!response.ok) {
        throw new Error(`Failed to update saved link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating saved link:', error.message);
      return null;
    }
  },
  deleteSavedLink: async (id) => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}/${id}`;
    try {
      const response = await requestWrapper(url, "DELETE");
      if (!response.ok) {
        throw new Error(`Failed to delete saved link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting saved link:', error.message);
      return null;
    }
  },
  deleteSavedLinkByUserAndLinkId: async (userId, linkId) => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}/user/${userId}/link/${linkId}`;
    try {
      const response = await requestWrapper(url, "DELETE");
      if (!response.ok) {
        throw new Error(`Failed to delete saved link, status code: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting saved link:', error.message);
      return null;
    }
  },


}

export default backendApi;