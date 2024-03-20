/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import OpenGraphController from '#controllers/open_graph_controller'
import UserSessionController from '#controllers/userSession_controller'
import UserController from '#controllers/user_controller'
import LinkController from '#controllers/link_controller'
import TagController from '#controllers/tag_controller'
import CommentController from '#controllers/comment_controller'
import UserActionController from '#controllers/userAction_controller'
import VoteController from '#controllers/vote_controller'
import TagLinkController from '#controllers/tagLink_controller'
import SavedLinkController from '#controllers/savedLink_controller'

router.get('/', async () => {
  return `<html>
    <head><title>Server Status</title></head>
    <body>
      <h1>Server Online</h1>
      <p>Hello, World! The server is up and running.</p>
    </body>
  </html>`;
});


// opengraph routers
router.get('/opengraph/fetchImage', [OpenGraphController, 'fetchImage'])

// user session routes
router.post('/usersessions/logout', [UserSessionController, 'logout'])
router.post('/usersessions/login', [UserSessionController, 'login'])
router.get('/usersessions', [UserSessionController, 'index'])



// user routes
router.get('/users/:id', [UserController, 'getOne'])
router.get('/users', [UserController, 'index'])

router.post('/users', [UserController, 'create'])
router.post('/users/createGuest', [UserController, 'createGuest'])

router.put('/users/:id', [UserController, 'update'])

router.delete('/users/deleteAll', [UserController, 'deleteAll'])
router.delete('/users/:id', [UserController, 'delete'])

// user action routes
router.get('/useractions/user/:userId', [UserActionController, 'getUserActionsByUser'])
router.get('/useractions/:id', [UserActionController, 'getOne'])
router.get('/useractions', [UserActionController, 'index'])

router.post('/useractions', [UserActionController, 'create'])

router.put('/useractions/:id', [UserActionController, 'update'])

router.delete('/useractions/deleteAll', [UserActionController, 'deleteAll'])
router.delete('/useractions/:id', [UserActionController, 'delete'])

// link routes
router.get('/links/user/:userId', [LinkController, 'getLinksByUser'])
//query params: amount
router.get('/links/new', [LinkController, 'getNewLinks'])
//query params: amount
router.get('/links/top', [LinkController, 'getTopLinks'])
router.get('/links/tag/:tagId', [LinkController, 'getLinksByTag'])
router.get('/links/:id', [LinkController, 'getOne'])
router.get('/links', [LinkController, 'index'])

router.post('/links', [LinkController, 'create'])

router.put('/links/:id', [LinkController, 'update'])

router.delete('/links/deleteAll', [LinkController, 'deleteAll'])
router.delete('/links/:id', [LinkController, 'delete'])

// comment routes
router.get('/comments/user/:userId', [CommentController, 'getCommentsByUser'])
router.get('/comments/link/:linkId', [CommentController, 'getCommentsByLink'])
router.get('/comments/:id', [CommentController, 'getOne'])
router.get('/comments', [CommentController, 'index'])

router.post('/comments', [CommentController, 'create'])

router.put('/comments/:id', [CommentController, 'update'])

router.delete('/comments/deleteAll', [CommentController, 'deleteAll'])
router.delete('/comments/:id', [CommentController, 'delete'])

// tag routes
router.get('/tags/user/:userId', [TagController, 'getTagsByUser'])
router.get('/tags/link/:linkId', [TagController, 'getTagsByLink'])
router.get('/tags/top', [TagController, 'getTopTags'])
router.get('/tags', [TagController, 'index'])
router.get('/tags/:id', [TagController, 'getOne'])

router.post('/tags', [TagController, 'createOrGet'])

router.put('/tags/:id', [TagController, 'update'])

router.delete('/tags/deleteAll', [TagController, 'deleteAll'])
router.delete('/tags/:id', [TagController, 'delete'])

// vote routes
router.get('/votes/user/:userId', [VoteController, 'getVotesByUser'])
router.get('/votes/link/:linkId', [VoteController, 'getVotesByLink'])
router.get('/votes/:id', [VoteController, 'getOne'])
router.get('/votes', [VoteController, 'index'])

router.post('/votes/createOrUpdate', [VoteController, 'createOrUpdate'])
router.post('/votes', [VoteController, 'create'])

router.put('/votes/:id', [VoteController, 'update'])

router.delete('/votes/deleteAll', [VoteController, 'deleteAll'])
router.delete('/votes/:id', [VoteController, 'delete'])

// tagLink routes
router.get('/taglinks/link/:linkId', [TagLinkController, 'getTagLinksByLink'])
router.get('/taglinks/tag/:tagId', [TagLinkController, 'getTagLinksByTag'])
router.get('/taglinks/user/:userId', [TagLinkController, 'getTagLinksByUser'])
router.get('/taglinks/:id', [TagLinkController, 'getOne'])
router.get('/taglinks', [TagLinkController, 'index'])

router.post('/taglinks', [TagLinkController, 'createOrGet'])

router.put('/taglinks/:id', [TagLinkController, 'update'])

router.delete('/taglinks/deleteAll', [TagLinkController, 'deleteAll'])
router.delete('/taglinks/:id', [TagLinkController, 'delete'])

// savedLink routes
router.get('/savedlinks/user/:userId/link/:linkId', [SavedLinkController, 'getSavedLinkByUserAndLink'])
router.get('/savedlinks/user/:userId', [SavedLinkController, 'getSavedLinksByUser'])
router.get('/savedlinks/:id', [SavedLinkController, 'getOne'])
router.get('/savedlinks', [SavedLinkController, 'index'])

router.post('/savedlinks', [SavedLinkController, 'create'])
router.post('/savedlinks/delete', [SavedLinkController, 'deleteByUserAndLink'])

router.put('/savedlinks/:id', [SavedLinkController, 'update'])

router.delete('/savedlinks/deleteAll', [SavedLinkController, 'deleteAll'])
router.delete('/savedlinks/:id', [SavedLinkController, 'delete'])
