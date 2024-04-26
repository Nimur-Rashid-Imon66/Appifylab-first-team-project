import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Todo from "App/Models/Todo";
import User from "App/Models/User";

export default class TodosController {
  public async index({ response }: HttpContextContract) {
<<<<<<< HEAD
    return "index";
=======
    // return "index";
>>>>>>> 833ba027e7aa500ebf2e4e842450543c39eb508f
    const todos = await Todo.all();
    return response.json(todos);
  }

  public async store({ request, response }: HttpContextContract) {
<<<<<<< HEAD
=======
    // return request;
>>>>>>> 833ba027e7aa500ebf2e4e842450543c39eb508f
    const validationSchema = schema.create({
      userid: schema.number(),
      title: schema.string({}, [rules.required(), rules.maxLength(255)]),
      description: schema.string({}, [rules.required()]),
      priority: schema.string(),
      tags: schema.string({}, [rules.required()]),
    });
<<<<<<< HEAD

    try {
      const payload = await request.validate({ schema: validationSchema });
      //   return payload;
=======
    const data =  request.only(['title','description','priority','tags','userid']);
    console.log(data)
    try {
      const payload = await request.validate({ schema: validationSchema });
      //   return payload;
      
>>>>>>> 833ba027e7aa500ebf2e4e842450543c39eb508f

      let todo = new Todo();
      todo.merge(payload);

      await todo.save();
      return response.status(200).json({ message: "Todo add successfully", data: todo });
    } catch (error) {
      return error;
    }
  }

  public async show({ params, response }: HttpContextContract) {
<<<<<<< HEAD
    return "show";
=======
    // return "show";
>>>>>>> 833ba027e7aa500ebf2e4e842450543c39eb508f
    const todo = await Todo.findOrFail(params.id);
    return response.json(todo);
  }

  public async update({ params, request, response }: HttpContextContract) {
    
    const validationSchema = schema.create({
      userid: schema.number(),
      title: schema.string.optional({}, [rules.maxLength(255)]),
      description: schema.string.optional(),
      priority: schema.string.optional(),
      tags: schema.string.optional(),
    });


    try {
      const payload = await request.validate({ schema: validationSchema });

      const todo = await Todo.findOrFail(params.id);
      if(todo.userid!==payload.userid){
         return 'userid should be same!'
      }
      todo.merge(payload);
      await todo.save();
      
      return response.status(200).json({ message: "Todo updated successfully", data: todo });
    } catch (error) {
      return response.status(422).json({ message: "Validation failed", errors: error.messages });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    
    try {
        const todo = await Todo.findOrFail(params.id);    
    // const deletedData=todo;
    await todo.delete();
    return "Todo deleted successfully";
    } catch (error) {
         return "No id match "
    }
    
  }
  public async fusers() {
    return await User.all();
  }
  public async falak() {
    const users = await User.query().preload('todos',(todo)=>{
       todo.select('title')
    });
    return users;
 
  }
}

// {
//     "userid":2,
//     "title":"study update .",
//     "description":"going to study with rohin korim ",
//     "priority":"Low",
//     "tags":"activitites"

// }