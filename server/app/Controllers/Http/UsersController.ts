import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Expense from "App/Models/Expense";
import { loginUser } from '../../globals';
import Loginuser from "App/Models/Loginuser";
import { convertLength } from "@mui/material/styles/cssUtils";

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
      
      //Edit by Nahid update by Nimur
        const expense = await Expense.create({ id: data.userid, balance: 0 });
        expense.save();
      // End Edit by Nahid update by Nimur
      return ctx.response.json({ message: "Validation successful" });
    } catch (error) {
      return ctx.response.json(error.messages);
    }
  }
  // public async login({ request, response, auth }: HttpContextContract) {
  //   const { email, password } = request.only(["email", "password"]);
  //   console.log("hello");
  //   user.useremail = email;

  //   return response.json({ email, password });
  // }
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input("email");
    const inputpassword = request.input("password");
    const user = await User.findBy("email", email);
    if (user) {
      const password = user.password;
      if (password == inputpassword) {
        
        const data = { userid: user.userid, email: email }
        // const userData = await Loginuser.create(data);
        return userData;
      }
    }
    // if (await Hash.verify(hashedValue, password)) {
    //   // verified
    // }
    return {};
  }

  public async logout({ }: HttpContextContract) {
    await Loginuser.query().delete();
    return { message: "Logout successfully" };
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}


