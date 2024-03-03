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

// user routes
router.get('/users', [UserController, 'index'])
router.get('/users/:id', [UserController, 'getOne'])
router.post('/users', [UserController, 'create'])
router.put('/users/:id', [UserController, 'update'])
router.delete('/users/:id', [UserController, 'delete'])

// user action routes
router.get('/useractions', [UserActionController, 'index'])
router.get('/useractions/:id', [UserActionController, 'getOne'])
router.get('/useractions/user/:userId', [UserActionController, 'getUserActionsByUser'])
router.post('/useractions', [UserActionController, 'create'])
router.put('/useractions/:id', [UserActionController, 'update'])
router.delete('/useractions/:id', [UserActionController, 'delete'])

// link routes
router.get('/links', [LinkController, 'index'])
router.get('/links/:id', [LinkController, 'getOne'])
router.get('/links/user/:userId', [LinkController, 'getLinksByUser'])
router.post('/links', [LinkController, 'create'])
router.put('/links/:id', [LinkController, 'update'])
router.delete('/links/:id', [LinkController, 'delete'])

// comment routes
router.get('/comments', [CommentController, 'index'])
router.get('/comments/:id', [CommentController, 'getOne'])
router.get('/comments/link/:linkId', [CommentController, 'getCommentsByLink'])
router.get('/comments/user/:userId', [CommentController, 'getCommentsByUser'])
router.post('/comments', [CommentController, 'create'])
router.put('/comments/:id', [CommentController, 'update'])
router.delete('/comments/:id', [CommentController, 'delete'])

// tag routes
router.get('/tags', [TagController, 'index'])
router.get('/tags/:id', [TagController, 'getOne'])
router.get('/tags/link/:linkId', [TagController, 'getTagsByLink'])
router.get('/tags/user/:userId', [TagController, 'getTagsByUser'])
router.post('/tags', [TagController, 'create'])
router.put('/tags/:id', [TagController, 'update'])
router.delete('/tags/:id', [TagController, 'delete'])

// vote routes
router.get('/votes', [VoteController, 'index'])
router.get('/votes/:id', [VoteController, 'getOne'])
router.get('/votes/link/:linkId', [VoteController, 'getVotesByLink'])
router.get('/votes/user/:userId', [VoteController, 'getVotesByUser'])
router.post('/votes', [VoteController, 'create'])
router.put('/votes/:id', [VoteController, 'update'])
router.delete('/votes/:id', [VoteController, 'delete'])

// tagLink routes
router.get('/taglinks', [TagLinkController, 'index'])
router.get('/taglinks/:id', [TagLinkController, 'getOne'])
router.get('/taglinks/link/:linkId', [TagLinkController, 'getTagLinksByLink'])
router.get('/taglinks/tag/:tagId', [TagLinkController, 'getTagLinksByTag'])
router.get('/taglinks/user/:userId', [TagLinkController, 'getTagLinksByUser'])
router.post('/taglinks', [TagLinkController, 'create'])
router.put('/taglinks/:id', [TagLinkController, 'update'])
router.delete('/taglinks/:id', [TagLinkController, 'delete'])

// savedLink routes
router.get('/savedlinks', [SavedLinkController, 'index'])
router.get('/savedlinks/:id', [SavedLinkController, 'getOne'])
router.get('/savedlinks/user/:userId', [SavedLinkController, 'getSavedLinksByUser'])
router.post('/savedlinks', [SavedLinkController, 'create'])
router.post('/savedlinks/delete', [SavedLinkController, 'deleteByUserAndLink'])
router.put('/savedlinks/:id', [SavedLinkController, 'update'])
router.delete('/savedlinks/:id', [SavedLinkController, 'delete'])
