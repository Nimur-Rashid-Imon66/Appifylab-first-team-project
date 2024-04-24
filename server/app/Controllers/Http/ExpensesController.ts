import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense'
export default class ExpensesController {

	public async show({ params }: HttpContextContract) {
		const balance = await Expense.query().select('balance').where('id', params.id);
		if (balance.length > 0) return balance[0].balance;
		else return 0;
	}
	public async create({ request }: HttpContextContract) {
		const data = request.all()
		console.log(data)
		await Expense.create(data);
		return data
	}
	public async update({ request, params }: HttpContextContract) {
		const data = request.all();
		await Expense.query().where('id', params.id).update(data);
	}
}
