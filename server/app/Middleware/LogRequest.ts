import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {

    await next()
  }
}

