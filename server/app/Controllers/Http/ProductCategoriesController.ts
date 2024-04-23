import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class ProductCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const categories =await ProductCategory.query().where('userid', id).select('userid','categoryname','categorydescription')
    return response.json({categories})
  }
 
  
  public async store({ request, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      userid: schema.number(),
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
      'userid.required': 'User ID is required',
      'categoryname.required': 'Category Name is required',
      'categoryname.unique': 'User already has a category with this name'
    }
    const data = request.only(['userid', 'categoryname', 'categorydescription'])
    console.log(data)
    try {
      const payload = await request.validate({ schema: newPostSchema, messages: msg });
      let category = new ProductCategory();
      category.merge(payload);
      await category.save();
  
      return response.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
      return response.status(404).json({ message: error.messages });  
    }



  }
  public async create({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
