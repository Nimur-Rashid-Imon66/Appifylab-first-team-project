import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async register ({ request, response }: HttpContextContract) {
   
    const validationSchema = schema.create({
      username: schema.string(),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' })
      ]),
      password: schema.string({}, [
        rules.minLength(4)
      ])
    })

    const userDetails = await request.validate({
      schema: validationSchema
    })

    const user = await User.create(userDetails)

    return response.status(201).json(user)
  }

  public async login ({ request, auth, response }: HttpContextContract) {
   
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.findBy("email", email);
      const token = await auth.use("api").attempt(email, password );
      const resUser = {
        username: user?.username,
        email: user?.email,
        // userid:user?.userid
      }
      return response.json({ user:resUser, token });
      
    } catch (error) {
      console.error(error.message) 
      return response.status(401).json({ message: 'Invalid credentials' })
    }
  }
  public async logininfo ({ auth, response }: HttpContextContract) {
    console.log(auth)
    return auth.user
    

  }
}