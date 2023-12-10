
import { 
  createUserDto, 
  createLinkDto, 
  createVoteDto,
  createCommentDto, 
  createSavedLinkDto, 
  createTagDto, 
  
  processLink } from "@/utils"

let mockUsers = [];
let mockLinks = [];
let mockVotes = [];
let mockComments = [];
let mockSavedLinks = [];
let mockTags = [];

let mockUser = {
  userId: 1,
  username: "John Doe",
  email: "test@test.com",
}

mockUsers.push(mockUser);

const api = {
  mockUser: mockUser,

  //API adds
  addUser: async (data) => {
    const user = createUserDto(data);
    mockUsers.push(user);
    return user;
  },

  addLink: async (data) => {
    data.url = processLink(data.url);

    const link = createLinkDto(data);
    mockLinks.push(link);
    return link;
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
    const savedLink = createSavedLinkDto(data);
    mockSavedLinks.push(savedLink);
    return savedLink;
  },

  addTag: async (data) => {
    const tag = createTagDto(data);
    mockTags.push(tag);
    return tag;
  },

  //API gets
  getUser: async (userId) => {
    console.log(mockUsers, 'mockUsers')
    return mockUsers.find(user => user.userId === userId);
  },

  getUsers: async () => {
    return mockUsers;
  },

  getLink: async (linkId) => {
    return mockLinks.find(link => link.linkId === linkId);
  },

  getLinks: async () => {
    return mockLinks;
  },

  getLinksByUser: async (userId) => {
    return mockLinks.filter(link => link.userId === userId);
  },

  getCommentsByLink: async (linkId) => {
    return mockComments.filter(comment => comment.linkId === linkId);
  },

  getVotesByLink: async (linkId) => {
    return mockVotes.filter(vote => vote.linkId === linkId);
  },

  getTagsByLink: async (linkId) => {
    return mockTags.filter(tag => tag.linkId === linkId);
  },

  getSavedLinksByUser: async (userId) => {
    return mockSavedLinks.filter(savedLink => savedLink.userId === userId);
  },

  // Complex Endpoints

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

  getUserHistory: async (userId) => {
    const userLinks = mockLinks.filter(link => link.userId === userId);
    const userComments = mockComments.filter(comment => comment.userId === userId);
    return { links: userLinks, comments: userComments };
  },


};

export default api;