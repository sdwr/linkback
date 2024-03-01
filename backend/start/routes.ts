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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// opengraph routers
router.get('/opengraph/fetchImage', [OpenGraphController, 'fetchImage'])

// user routes
router.get('/users', [UserController, 'index'])


// link routes
router.get('/links', [LinkController, 'index'])
router.get('/links/:id', [LinkController, 'getOne'])
router.post('/links', [LinkController, 'create'])
router.put('/links/:id', [LinkController, 'update'])
router.delete('/links/:id', [LinkController, 'delete'])