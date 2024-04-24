import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

// Route.get("/users", "UsersController.index"); 

// Route.get("/", async ({ view }) => {
//   return view.render("welcome");
// });

Route.get("/users", "UsersController.index");
Route.get("/product/:id", "ProductsController.index");
Route.get("/category/:id", "ProductCategoriesController.index")

Route.post("/addcategory", "ProductCategoriesController.store");
Route.post("/addproduct", "ProductsController.store");





////////////////////// NAHID 's Route ///////////////////////////

Route.group(() => {
  Route.get('/:id', 'ExpensesController.show');
  Route.post('/', 'ExpensesController.create');
  Route.post('/:id', 'ExpensesController.update');
}).prefix('/expenseManagement')

Route.group(() => {
  Route.get('/:id', 'HistoriesController.show');
  Route.post('/', 'HistoriesController.create');
}).prefix('/history')

////////////////////////////////////////////////////////////////