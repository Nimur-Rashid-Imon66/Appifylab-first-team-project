import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
   return 'server is running   🏃 🏃 🏃 🏃 🏃 '
});


Route.post('/register', 'AuthController.register');
Route.post('/login', 'AuthController.login');
Route.post('/logininfo', 'AuthController.logininfo').middleware('auth:api')


// Route.get('/todos', 'TodosController.index');
// Route.get('/todos/:id', 'TodosController.show');
// Route.post('/todos', 'TodosController.store');
// Route.post('/todos/:id/update', 'TodosController.update');
// Route.post('/todos/:id/delete', 'TodosController.destroy');

// Route.get('/todos/:userid', 'TodosController.index').middleware('auth:api');
Route.get('/todos/:userid', 'TodosController.index')
Route.get('/todos/:id', 'TodosController.show');
Route.post('/todos', 'TodosController.store');
Route.post('/todos/:id/update', 'TodosController.update');
Route.post('/todos/:id/delete', 'TodosController.destroy');



Route.get('/av', 'ProductCategoriesController.index');



// {
//   "userid":6,
//   "title":"check for get  updattttttt.",
//   "description":"going to study with rohin korim ",
//   "priority":"Low",
//   "tags":"activitites"

// }


// Authorization
// Bearer MTQ.sB1V_dNfVGzhB8jIU3C07A5A6_XM1MtFirqgyLM06o9a7LPt9ZTDdx1dpyTD