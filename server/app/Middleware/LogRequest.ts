import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    console.log(`Inside middleware ${ctx.request.url()}`);
    {
      ctx.response.json({ eror: 'somethin wrong' })
      return
    }
    await next()
  }
}
