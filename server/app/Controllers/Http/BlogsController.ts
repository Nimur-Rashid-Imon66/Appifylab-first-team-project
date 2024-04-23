import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Blog from 'App/Models/Blog';

export default class BlogsController {

    public async index({ response }: HttpContextContract) {

        const blogs = await Blog.all();
        console.log(blogs)
        return response.json({ blogs });

    }

    public async store({ request }: HttpContextContract) {

        const postData = await request.all();
        await Blog.create(postData);

    }

    public async edit({ request, params }: HttpContextContract) {

        const updatedData = await request.all();
        await Blog.query().where('id', params.id).update(updatedData)
        console.log(updatedData);

    }

    public async destroy({ params }: HttpContextContract) {

        const data = await Blog.find(params.id);
        data?.delete();
    }
}
