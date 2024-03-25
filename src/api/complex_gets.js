
//fake the complex calls for now by getting the entire table and filtering it in the frontend
//will need to optimize this later

const complex_requests = {
  //complex get requests

  //already handled by findBy in backend?
  getSubmittedLinksByUser: null,
  getCommmentsByLink: null,
  getVotesByLink: null,
  getTagsByLink: null,
  getUserActionsByUser: null,

  getSavedLinksByUser: null,

  //not handled yet
  getNewLinks: null,
  getTopLinks: null,
  checkUserSavedLink: null,

  addUserDataToLinks: null,
  
  getTopLinksWithUserData: null,
  getNewLinksWithUserData: null,
  getLinksByTagWithUserData: null,
  getSavedLinksWithUserData: null,
  getSubmittedLinksWithUserData: null,

  //complex post/put requests
  addUserDataToLinks: null,

}