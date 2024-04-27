import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Blog from 'App/Models/Blog';

export default class BlogsController {

    public async index() {

        const blogs = await Blog.all();
        console.log(blogs)
        return { blogs };

    }

    public async store({ request, response }: HttpContextContract) {

        const newPostSchema = schema.create({
            title: schema.string(),
            description: schema.string(),
            author: schema.string(),
        })

        const msg = {
            "title.required": "Title is required",
            "description.required": "description is required",
            "author.required": "Your not a user",
        };

        try {
            const payload = await request.validate({
                schema: newPostSchema,
                messages: msg,
            });
            await Blog.create(payload);
            console.log(payload)

            return
        }
        catch (e) {
            console.log(e);
            return
        }
    }

    public async edit({ request, params }: HttpContextContract) {

        const editSchema = schema.create({
            description: schema.string(),
        })

        try {
            const payload = await request.validate({
                schema: editSchema,
            });
            await Blog.create(payload);
            await Blog.query().where('id', params.id).update(payload)
            console.log(payload)

            return
        }
        catch (e) {
            console.log(e);
            return
        }

        // const updatedData = await request.all();
        // await Blog.query().where('id', params.id).update(updatedData)

    }

    public async destroy({ response, params }: HttpContextContract) {

        const data = await Blog.find(params.id);
        data?.delete();
        
    }
}
