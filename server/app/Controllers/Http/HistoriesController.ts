import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import History from 'App/Models/History';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class HistoriesController {
  
  public async create({ request, params }: HttpContextContract) {
    const newPostSchema = schema.create({
      description : schema.string(),
      amount: schema.number(),
      type: schema.string()
    })
    try {
      const payload = await request.validate({ schema: newPostSchema })
      if (params.id <= 0) throw 'id is not valid';
      const history = { ...payload, id: params.id  }
      return await History.create(history);
   } 
   catch (error) {
     return error;
   }
  }
}