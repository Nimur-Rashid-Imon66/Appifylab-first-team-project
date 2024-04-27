import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Cauth {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    try {
      // Check if user is authenticated
      await auth.check();
      console.log(auth.user)
      await next();
    } catch (error) {
      // If user is not authenticated, send 401 Unauthorized response
      return response.status(401).send({ error: "Unauthorized" });
    }
  }
}
