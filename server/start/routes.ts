/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});
Route.get("/users/:id", async () => {
  return "Show user";
})

Route.group(() => {

  Route.get('/show', 'BlogsController.index')
  Route.post('/post', 'BlogsController.store')
  Route.post('/:id/edit', 'BlogsController.edit')
  Route.post('/:id/delete', 'BlogsController.destroy')

}).prefix('/blog')
