import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import History from 'App/Models/History';

export default class HistoriesController {
  public async show({ params }: HttpContextContract) {
    const data = await History.query().select('description','amount','type').where('id',params.id);
    if (data.length > 0) return data[0];
		else return 0;
  }
  public async create({ request }: HttpContextContract) {
    const data = request.all()
    console.log(data)
    await History.create(data);
    return data
  }
}
