import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
   return 'server is running   🏃 🏃 🏃 🏃 🏃 '
});


Route.post('/register', 'AuthController.register');
Route.post('/login', 'AuthController.login');
Route.post('/logout', 'AuthController.logout').middleware('auth:api');
Route.post('/logininfo', 'AuthController.logininfo').middleware('auth:api')



Route.get('/todos', 'TodosController.index').middleware('auth:api')
Route.post('/todos', 'TodosController.store').middleware('auth:api')
Route.post('/todos/:id/update', 'TodosController.update').middleware('auth:api')
Route.post('/todos/:id/delete', 'TodosController.destroy').middleware('auth:api')






// {
//   "userid":6,
//   "title":"check for get  updattttttt.",
//   "description":"going to study with rohin korim ",
//   "priority":"Low",
//   "tags":"activitites"

// }


