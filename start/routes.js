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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'JobController.home');

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');

Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');

Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});


Route.get('/post-a-job', 'JobController.userIndex');
Route.post('/post-a-job', 'JobController.create').validator('CreateJob');

Route.group(() => {
    Route.get('/delete/:id', 'JobController.delete');
    Route.get('/edit/:id', 'JobController.edit');
    Route.post('/update/:id', 'JobController.update').validator('CreateJob');
}).prefix('/post-a-job');
