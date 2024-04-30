import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import {getlogUser} from './AuthController'

export default class ProductCategoriesController {
  public async index({ request, response,auth}: HttpContextContract) {
    // const user = await getlogUser();
    // if (user.userid === 0) return response.status(404).json({ message: 'Please login first' });
    
    const check = await auth.use('api').authenticate()
    if (check) {
      const id = parseInt(request.param('id'))
      if (typeof id !== 'number') return response.status(404).json({ message: 'Invalid user id' });
      const categories = (await ProductCategory.query().where('userid', id).select('categoryname'));
      return response.json({ categories })
    }
    return response.status(404).json({ message: 'Please login first' });
  }
 
  
  public async store({ request, response,auth }: HttpContextContract) {
    // const user = await getlogUser();
    // if (user.userid === 0) return response.status(404).json({ message: 'Please login first' });
    
    const check = await auth.use('api').authenticate()
    if (check) {
      const newPostSchema = schema.create({
        categoryname: schema.string({}, [
          rules.unique({
            table: 'product_categories',
            column: 'categoryname',
            where: {
              userid: request.input('userid')
            }
          })
        ]),
        categorydescription: schema.string.nullable(),
      });
      const msg = {
        'categoryname.required': 'Category Name is required',
        'categoryname.unique': 'User already has a category with this name'
      }
      // const data = request.only(['userid', 'categoryname', 'categorydescription'])
      // console.log(data)
      try {
        const payload = await request.validate({ schema: newPostSchema, messages: msg });
        payload['userid'] = check.userid;
        let category = new ProductCategory();
        category.merge(payload);
        await category.save();
        return response.status(201).json({ message: 'Category created successfully' });
      } catch (error) {
        console.log(error.messages.errors[0].message)
        return response.status(404).json({ message: error.messages.errors[0].message });
      }
    }
    return response.status(404).json({ message: 'Please login first' });
  }
  public async create({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
