import Route from "@ioc:Adonis/Core/Route";

//================================Ahsan Rout======================================
Route.get("/", async ({ view }) => {
 
  return view.render("welcome");
});

Route.get("/users", "UsersController.index");
Route.get("/usersget", "UsersController.alluserget");
Route.post("/usersset", "UsersController.alluserset");

Route.post("/login", "UsersController.login");
// Route.post("/logout", "AuthController.logout");

// Route.get("profile", "ProfileController.index")
 
//================================Ahsan Rout======================================




// ----------------------------falak start------------------------
Route.get('/todos', 'TodosController.index');
Route.get('/todos/:id', 'TodosController.show');
Route.post('/todos', 'TodosController.store');
Route.post('/todos/:id/update', 'TodosController.update');
Route.post('/todos/:id/delete', 'TodosController.destroy');
// Route.get('/fusers', 'TodosController.fusers');
// Route.get('/falak', 'TodosController.falak');
// ----------------------------falak end ------------------------

 
  Route.get("/product/:id", "ProductsController.index"); 
  Route.get("/category/:id", "ProductCategoriesController.index")  
  Route.get('/indproduct/:id',"ProductsController.individualProduct")
  
  Route.post("/addcategory", "ProductCategoriesController.store");
  Route.post("/addproduct", "ProductsController.store");
  Route.post("/editproduct/:id","ProductsController.update")
  Route.post("/deleteproduct/:id", "ProductsController.destroy");








////////////////////// NAHID 's Route ///////////////////////////

Route.group(() => {
  Route.get('/:id', 'ExpensesController.show');
  Route.get('/:id/balance','ExpensesController.showBalance')
  Route.post('/', 'ExpensesController.create');
  Route.post('/:id', 'ExpensesController.update');
}).prefix('/expenseManagement')

Route.group(() => {
  Route.get('/:id', 'HistoriesController.show');
  Route.post('/:id', 'HistoriesController.create');
}).prefix('/history')

//////////////////// END OF Nahid 's Route ///////////////////////