import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
export default class UsersController {
  public async index(ctx: HttpContextContract) {
    return ctx.response.json(await User.all());
  }
  public async alluserget(ctx: HttpContextContract) {
    return ctx.response.json(await User.all());
  }
  public async alluserset(ctx: HttpContextContract) {
    const userRegistrationData = ctx.request.all();

    const newUserSchema = schema.create({
      username: schema.string(),
      email: schema.string([
        rules.unique({ table: "users", column: "userid" }),
      ]),
      password: schema.string(),
    });
    const msg = {
      "username.required": "User Name is required",
      "email.required": "User email is required",
      "password.required": "User password is required",
    };
    try {
      const payload = await ctx.request.validate({
        schema: newUserSchema,
        messages: msg,
      });
      const data = await User.create(payload);
      data.save();
      return ctx.response.json({ message: "Validation successful" });
    } catch (error) {
      return ctx.response.json(error.messages);
    }
  }
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);
    console.log("hello");

    return response.json({ email, password });
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
