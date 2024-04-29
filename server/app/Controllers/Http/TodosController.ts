import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Todo from "App/Models/Todo";
export default class TodosController {

  public async index({ params, response }: HttpContextContract) {
    const { userid } = params;
    const todos = await Todo.query().where('userid', userid)
    return response.json(todos);
  }

  public async show({ params, response }: HttpContextContract) {
    const todo = await Todo.find(params.id);
    return response.json(todo);
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        priority: schema.string(),
        tags: schema.string.optional(),
        userid: schema.number(),
      }),
      messages: {
        'title.required': 'Please provide a title for your todo',
        'description.required': 'Please provide a description for your todo',
        'priority.required': 'Please provide a priority for your todo',
        'userid.required': 'Please provide a user id for your todo',
      }
    });

    const todo = await Todo.create(data);
    return response.json(todo);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id);

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

  public async destroy({ params, response }: HttpContextContract) {
   
    const todo = await Todo.find(params.id);
    await todo?.delete();
    return response.json({ message: 'Todo deleted successfully' });
  }
}


// {
//     "userid":2,
//     "title":"study update .",
//     "description":"going to study with rohin korim ",
//     "priority":"Low",
//     "tags":"activitites"

// }


