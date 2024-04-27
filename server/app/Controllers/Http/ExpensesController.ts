import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense'
import History from 'App/Models/History';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ExpensesController {

  public async show({ params }: HttpContextContract) {
    const balance = await Expense.query().select('balance').where('id', params.id);
    const history = await History.query().select('description', 'amount', 'type').where('id', params.id);
    const data = {
      balance: balance.length > 0 ? balance[0].balance : 0,
      history: history
    }
    return data;
  }

  public async showBalance({ params }: HttpContextContract) {
    const balance = await Expense.query().select('balance').where('id', params.id);
    return balance.length > 0 ? balance[0].balance : 0;
  }

  public async update({ request, params }: HttpContextContract) {
    const newPostSchema = schema.create({
      balance: schema.number()
    })
    const payload = await request.validate({ schema: newPostSchema })
    await Expense.query().where('id', params.id).update(payload);
    return payload;
  }
}