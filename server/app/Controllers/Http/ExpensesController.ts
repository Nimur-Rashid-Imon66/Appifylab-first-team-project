import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ExpensesController {

public async show({ params }: HttpContextContract) {
const balance = await Expense.query().select('balance').where('id', params.id);
if (balance.length > 0) return balance[0].balance;
else return 0;
}
public async create({ request }: HttpContextContract) {
const data = request.all()
if (data.id <= 0 || data.balance !=0) return;
await Expense.create(data);
return data
}

public async update({ request, params }: HttpContextContract) {
const newPostSchema = schema.create({
balance : schema.number()
  })
// const data = request.all();
const payload = await request.validate({ schema: newPostSchema })
await Expense.query().where('id', params.id).update(payload);
return payload;
}
}