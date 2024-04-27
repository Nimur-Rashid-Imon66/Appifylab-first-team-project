import Loginuser from "App/Models/Loginuser";



export const getlogUser = async () => {
  const user = await Loginuser.query().first();
  if (user) return user.$attributes;
  return {userid: 0, email: ''};
}








// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class AuthController {
  // public async login({ request, response }: HttpContextContract) {
  //   // const { email, password } = request.only(["email", "password"]);
  //   // try {
  //   //   await auth.attempt(email, password);
  //   //   return response.ok({ message: "Login successful" });
  //   // } catch (error) {
  //   //   return response.badRequest({ message: "Invalid credentials" });
  //   // }
  //   return response.json("hello");
  // }

  //   public async logout({ auth, response }: HttpContextContract) {
  //     await auth.logout();
  //     return response.ok({ message: "Logout successful" });
  //   }
}
