import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/AddOrUpdateProductValidator'

export default class ProductsController {
  
  public async index({ request, response,auth }: HttpContextContract) {
    const check = await auth.use('api').authenticate()
    if (check) {
      const id = parseInt(request.param('id'))
      if (typeof id !== 'number') return response.status(404).json({ message: 'Invalid user id' });
      const products = (await Product.query().where('userid', id).select('prouductid','userid','productname','productdescription','productprice','productcategory','productstatus'));
      return response.json({products})
    }
    
  }
  public async store({ request, response,auth}: HttpContextContract) {
    const check = await auth.use('api').authenticate();
    if (!check) return response.status(404).json({ message: 'Invalid user id' });
    try {
      let payload = await request.validate(ProductValidator);
      payload['userid'] = check.userid;
      let product = new Product();
      product.merge(payload);
      await product.save();
  
      return response.status(201).json({ message: 'product add successfully' });
    } catch (error) {
      return response.status(404).json({ message: error.messages });  
    }
  }


  public async update({ request, response,auth }: HttpContextContract) {
  
    const id = parseInt(request.param('id'))
    if (typeof id !== 'number') return response.status(404).json({ message: 'Invalid product id' });
    
    let product = await Product.find(id)
    if(product && product.userid != auth.user!.userid) return response.status(404).json({ message: 'Invalid user id' });

    try {
      await request.validate(ProductValidator)
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
      console.log(error)
      return response.status(404).json({ message: error.messages });  
    }
  }

  public async destroy({ request, response,auth }: HttpContextContract) {
    const id = parseInt(request.param('id'))
    if (typeof id !== 'number') return response.status(404).json({ message: 'Invalid product id' });

    const product = await Product.find(id);
    if (product && product.userid != auth.user!.userid)
      return response.status(404).json({ message: 'Invalid user id' });

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
