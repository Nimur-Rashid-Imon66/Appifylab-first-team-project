import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { Hash } from "@adonisjs/hash";
export default class UsersController {
  public async index({ auth, response }) {
    try {
      const res = await auth.use("api").authenticate();
      // console.log('hejr',auth.user!.email)
      return response.json(auth.user!);
    } catch (error) {
      // console.log(error)
      return  error;
    }
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
      const user = await User.findBy("email", payload.email);
      // console.log(user);
      if (user) return ctx.response.json(user.email);
      const data = await User.create(payload);
      data.save();
      return {};
    } catch (error) {
      return ctx.response.json(error.messages);
    }
  }
  public async login({ request, response, auth }: HttpContextContract) {
    // const incomingData = request.all();
    // console.log('data',incomingData);
    const newUserSchema = schema.create({
      email: schema.string([
        rules.unique({ table: "users", column: "userid" }),
      ]),
      password: schema.string(),
    });
    const msg = {
      "email.required": "User email is required",
      "password.required": "User password is required",
    };
    try {
      // console.log(request.input("email"), request.input("password"));
      const payload = await request.validate({
        schema: newUserSchema,
        messages: msg,
      });

      const email = request.input("email");
      const inputpassword = request.input("password");
      const user = await User.findBy("email", email);

      // await auth.use("api").attempt(email, inputpassword);
      // await auth.use("api").login(user!);
      // await auth.use("web").authenticate();
      // console.log(auth.use("web").user!);
      const token = await auth.use("api").attempt(email, inputpassword);
      return response.json({ user, token });
    } catch (e) {
      console.log(e);
    }
  }
  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
