import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import User from "App/Models/User";

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    const users = await User.query()
      .where('userid', 1)
      .preload('category', (pc) => {
      pc.where('categoryname','Electronics')
    }).preload('product_u');
    
    return ctx.response.json({ users });
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
