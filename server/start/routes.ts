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
let loginUser = {
  id: 0,
  email: "",
}
export default loginUser;

//================================Ahsan Rout======================================
Route.get("/", async ({ view }) => {
  return view.render("welcome");
});
Route.post("/profile", "UsersController.index").middleware('auth:api') 
Route.get("/usersget", "UsersController.alluserget");
Route.post("/usersset", "UsersController.alluserset");
Route.post("/login", "UsersController.login");
Route.post("/logout", async ({ auth, response }) => {
  await auth.use("api").revoke();
  return {
    revoked: true,
  };
});
// Route.post("/logout", "AuthController.logout");

// Route.get("profile", "ProfileController.index")

// ----------------------------falak start------------------------
Route.get("/todos", "TodosController.index");
Route.get("/todos/:id", "TodosController.show");
Route.post("/todos", "TodosController.store");
Route.post("/todos/:id/update", "TodosController.update");
Route.post("/todos/:id/delete", "TodosController.destroy");
// Route.get('/fusers', 'TodosController.fusers');
// Route.get('/falak', 'TodosController.falak');
// ----------------------------falak end ------------------------
Route.group(() => {
  Route.get("/product/:id", "ProductsController.index");
  Route.get("/category/:id", "ProductCategoriesController.index");
  Route.get("/indproduct/:id", "ProductsController.individualProduct");

  Route.post("/addcategory", "ProductCategoriesController.store");
  Route.post("/addproduct", "ProductsController.store");
  Route.post("/editproduct/:id", "ProductsController.update");
  Route.post("/deleteproduct/:id", "ProductsController.destroy");
}).middleware('auth:api')

// }).middleware('auth', { guards: ['basic'] })
////////////////////// NAHID 's Route ///////////////////////////

Route.group(() => {
  Route.get('/:id', 'ExpensesController.show');
  Route.post('/', 'ExpensesController.create');
  Route.post('/:id', 'ExpensesController.update');
}).prefix('/expenseManagement')

Route.group(() => {
  Route.get('/:id', 'HistoriesController.show');
  Route.post('/:id', 'HistoriesController.create');

}).prefix('/history')

////////////////////////////////////////////////////////////////