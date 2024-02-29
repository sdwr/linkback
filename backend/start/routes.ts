/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UserController from '#controllers/user_controller'
import LinkController from '#controllers/link_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// user routes
router.get('/users', [UserController, 'index'])


// link routes
router.get('/links', [LinkController, 'index'])
router.get('/links/:id', [LinkController, 'show'])