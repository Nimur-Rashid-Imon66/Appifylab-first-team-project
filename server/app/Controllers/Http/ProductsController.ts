import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ProductCategory from 'App/Models/ProductCategory';

export default class ProductsController {
  public async index({ request,response }: HttpContextContract) {
    const id = request.param('id')
    const products = (await Product.query().where('userid', id).select('prouductid','userid','productname','productdescription','productprice','productcategory','productstatus'));
    return response.json({products})
  }
  public async individualProduct({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const product = (await Product.query().where('prouductid', id).select('prouductid','userid','productname','productdescription','productprice','productcategory','productstatus'));
    return response.json({product})
  }
  public async store({request,response }: HttpContextContract) {
    const newPostSchema = schema.create({
      userid: schema.number([rules.exists({ table: 'users', column: 'userid' })]),
      productname: schema.string(),
      productdescription: schema.string(),
      productprice: schema.number(),
      productcategory: schema.string({}, [
         rules.exists({ table: 'product_categories', column: 'categoryname' })
      ]),
      productstatus: schema.string()
    });
    const msg = {
      'userid.required': 'User ID is required',
      'productname.required': 'Product Name is required',
      'productdescription.required': 'Product Description is required',
      'productprice.required': 'Product Price is required',
      'productcategory.required': 'Product Category is required',
      'productstatus.required': 'Product Status is required',
      'productcategory.exists': 'The product category does not exist',
      'userid.exists': 'The user does not exist'
     }

    try {
      const payload = await request.validate({ schema: newPostSchema, messages: msg });
      let product = new Product();
      product.merge(payload);
      await product.save();
  
      return response.status(201).json({ message: 'product add successfully' });
    } catch (error) {
      return response.status(404).json({ message: error.messages });  
    }
  }


  public async update({ request,response}: HttpContextContract) {
    const id = request.param('id')
    const newPostSchema = schema.create({
      productname: schema.string(),
      productdescription: schema.string(),
      productprice: schema.number(),
      productcategory: schema.string({}, [
         rules.exists({ table: 'product_categories', column: 'categoryname' })
      ]),
      productstatus: schema.string()
    });
    const msg = {
      'productname.required': 'Product Name is required',
      'productdescription.required': 'Product Description is required',
      'productprice.required': 'Product Price is required',
      'productcategory.required': 'Product Category is required',
      'productstatus.required': 'Product Status is required',
      'productcategory.exists': 'The product category does not exist',
     }
    try {
      await request.validate({ schema: newPostSchema, messages: msg });
      let product = await Product.find(id)
      const data = request.only(['productname', 'productdescription', 'productprice', 'productcategory', 'productstatus'])
      if (product) {
        product.productname =  data.productname,
        product.productdescription =  data.productdescription,
        product.productprice = data.productprice,
        product.productcategory =  data.productcategory,
        product.productstatus =  data.productstatus
        await product.save()
      }
    }catch (error) {
      return response.status(404).json({ message: error.messages });  
    }
  }

  public async destroy({request,response }: HttpContextContract) {
    const id = request.param('id')
    const product = await Product.find(id);
    if(product){
      await product.delete();
      return response.json({message: 'product deleted successfully'});
    }
    return response.json({message: 'product not found'});
  }

  public async create({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}
}
