'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.group(() => {
    Route.get('me' ,'UserController.me')
    Route.post('auth/login', 'UserController.attempt')
    Route.get('auth/me', 'UserController.me').middleware('auth')
    Route.get('posts', 'PostsController.list')
}).prefix('api/v1');

Route.get('*', 'NuxtController.render')
