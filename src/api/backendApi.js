import externalApi from "@/externalApi";

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
} from "@/consts"

import {
  mockLinkData,
  mockUserData,
} from "@/mockData";

import { 
  OPEN_GRAPH_PATH, 
  USERS_PATH,
  USER_ACTIONS_PATH,
  COMMENTS_PATH,
  LINKS_PATH,
  TAGS_PATH,
  VOTES_PATH,
  TAG_LINKS_PATH,
  SAVED_LINKS_PATH,
  } from "./api_routes";
  


let mockUsers = [];
let mockLinks = [];
let mockVotes = [];
let mockComments = [];
let mockSavedLinks = [];
let mockTags = [];
let mockTaggedLinks = [];
let mockUserActions = [];

let mockUser = {
  id: 1,
  username: "John Doe",
  email: "test@test.com",
}

const BACKEND_URL = "http://localhost:3333";

const backendApi = {

  // Open Graph
  fetchImage: async (inputUrl) => {
    const url = `${BACKEND_URL}${OPEN_GRAPH_PATH}/fetch-image?url=${encodeURIComponent(inputUrl)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch the OG image, status code: ${response.status}`);
      }
      const data = await response.json();
      return data.image;
    } catch (error) {
      console.error('Error fetching OG image:', error.message);
      return null;
    }
  },

  // User
  getAllUsers: async () => {
    const url = `${BACKEND_URL}${USERS_PATH}`;
    try {
      const response = await fetch(url);
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
      const response = await fetch(url);
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createUserDto(userData))
      });
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
  updateUser: async (id, userData) => {
    const url = `${BACKEND_URL}${USERS_PATH}/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
  // User Action
  getAllUserActions: async () => {
    const url = `${BACKEND_URL}${USER_ACTIONS_PATH}`;
    try {
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createUserActionDto(userActionData))
      });
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
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userActionData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
      const response = await fetch(url);
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
  getLinkById: async (id) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/${id}`;
    try {
      const response = await fetch(url);
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
  getLinksByUserId: async (userId) => {
    const url = `${BACKEND_URL}${LINKS_PATH}/user/${userId}`;
    try {
      const response = await fetch(url);
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
      const response = await fetch(url);
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
    const url = new URL(`${BACKEND_URL}${LINKS_PATH}/new`);
    url.searchParams.append('amount', amount);
    try {
      const response = await fetch(url.toString());
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
    const url = new URL(`${BACKEND_URL}${LINKS_PATH}/top`);
    url.searchParams.append('amount', amount);
    try {
      const response = await fetch(url.toString());
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createLinkDto(linkData))
      });
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
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(linkData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createCommentDto(commentData))
      });
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
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
      const response = await fetch(url);
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
  getTagById: async (id) => {
    const url = `${BACKEND_URL}${TAGS_PATH}/${id}`;
    try {
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createTagDto(tagData))
      });
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
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createVoteDto(voteData))
      });
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
  updateVote: async (id, voteData) => {
    const url = `${BACKEND_URL}${VOTES_PATH}/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createTagLinkDto(tagLinkData))
      });
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
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagLinkData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
      const response = await fetch(url);
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
  getSavedLinksByUserId: async (userId) => {
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}/user/${userId}`;
    try {
      const response = await fetch(url);
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
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createSavedLinkDto(savedLinkData))
      });
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
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(savedLinkData)
      });
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
      const response = await fetch(url, {
        method: 'DELETE'
      });
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
    const url = `${BACKEND_URL}${SAVED_LINKS_PATH}/delete`;
    try {
      const response = await fetch(url, {
        method: 'POST'
      });
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