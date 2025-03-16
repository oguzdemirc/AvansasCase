import Joi, { types } from "joi";

import BookService from "../services/BookService";

class BookController{
    static async create(req,res){
        try {
            const {body} = req;

            const schema = Joi.object({
                title: Joi.string().required(),
                author: Joi.string().required(),
                isbn: Joi.string().required(),
                price: Joi.number().required(),
                stock: Joi.number().required(),
                category_id: Joi.number().required(),
                publish_year: Joi.number().required(),
            });
    
            const {error} = schema.validate(body);
            if (error) {
                // input data error, 400
                throw new Error(error.details[0].message);
            }
            const result = await BookService.create(body);
            return res.json({
                type:true,
                message:'Kitap oluşturuldu',
                data:result
            })
        } catch (error) {
            return res.json({
                type:false,
                message:'Beklenmedik bir hata oluştu.Lütfen daha sonra tekrar deneyiniz',
                error_detail:error.message
            })
        }
    }

    static async get_all_data(req,res){
        try {
            const result = await BookService.get_all_data();
            return res.json({
                type:true,
                message:'kitaplar getirildi',
                data:result
            });
        }  catch (error) {
            return res.json({
                type:false,
                message:'Beklenmedik bir hata oluştu.Lütfen daha sonra tekrar deneyiniz',
                error_detail:error.message
            })
        }
    }

    static async get_by_id(req,res){
        try {
            const result = await BookService.get_by_id(req.params.id);
            if (!result) {
                return res.status(404).json({
                    type:false,
                    message:'kitap bulunamadı',
                })
            }
            return res.json({
                type:true,
                message:'kitap getirildi',
                data:result
            })
        } catch (error) {
            return res.json({
                type:false,
                message:'Beklenmedik bir hata oluştu.Lütfen daha sonra tekrar deneyiniz',
                error_detail:error.message
            })
        }
    }

    static async get_by_query(req, res){
        try {
            const {query} = req;

            const schema = Joi.object({
                title: Joi.string(),
                author: Joi.string(),
                isbn: Joi.string(),
                category_id: Joi.number(),
                publish_year: Joi.number(),
            });
    
            const {error} = schema.validate(query);
            if (error) {
                throw new Error(error.details[0].message);
            }

            const result = await BookService.get_by_query(query);

            return res.json({
                type:true,
                message:'kitap getirildi',
                data:result
            })
        } catch (error) {
            console.log(error)
            return res.json({
                type:false,
                message:'Beklenmedik bir hata oluştu.Lütfen daha sonra tekrar deneyiniz',
                error_detail: error.message
            })
        }
    }
   
}
export default BookController;