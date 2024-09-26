import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Todo from "App/Models/Todo";
interface FormData {
  id:string 
  title: string;
  description: string;
  priority: string;
  tags: string;
}
export default class TodosController {

  public async index({ request, response ,auth }: HttpContextContract) {
    const userid=auth.user?.userid
    if(!userid){
      return [] ;//some how user id it  bull
    }
    const todos = await Todo.query().where('userid', userid)
    return response.json(todos);
  }

  public async show({ params, response }: HttpContextContract) {
    const todo = await Todo.find(params.id);
    return response.json(todo);
  }

  public async store({ request, response ,auth }: HttpContextContract) {
    // return auth.user;
    let data = await request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        priority: schema.string(),
        tags: schema.string.optional(),
        // userid: schema.number(),
      }),
      messages: {
        'title.required': 'Please provide a title for your todo',
        'description.required': 'Please provide a description for your todo',
        'priority.required': 'Please provide a priority for your todo',
      }
    });
 
    data["userid"] = auth.user?.userid;
    const todo = await Todo.create(data);
    const resData = {
      id:todo.id,
      title:todo.title,
      description:todo.description,
      priority:todo.priority,
      tags:todo.tags
    }

  
    return response.json(resData);
  }

  public async update({ params, request, response,auth }: HttpContextContract) {

    // return 'yes  in update todos'
    const todo = await Todo.findOrFail(params.id);

    if(todo.userid!==auth.user?.userid){{
    return 'userid is not match  with   auth user'
    }}
    return 'you have permision to  update  this'    

    const data = await request.validate({
      schema: schema.create({
        title: schema.string.optional(),
        description: schema.string.optional(),
        priority: schema.string(),
        tags: schema.string.optional(),
      })
    });

    todo.merge(data);
    await todo.save();
    return response.json(todo);
  }

  public async destroy({ params, response , auth }: HttpContextContract) {
    // return 'hit delete route'
    const todo = await Todo.find(params.id);
  
    if(todo?.userid!==auth.user?.userid){
      return { message: 'Todo delete operation  is fail' }
    }

    await todo?.delete();
    return { message: 'Todo deleted successfully' };
  }
}


// {
//     "userid":2,
//     "title":"study update .",
//     "description":"going to study with rohin korim ",
//     "priority":"Low",
//     "tags":"activitites"

// }


