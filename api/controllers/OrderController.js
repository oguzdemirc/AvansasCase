import Joi, { types } from "joi";

import OrderService from "../services/OrderService";

class OrderController {
    static async create(req, res){
        try{

            const {body} = req;

             const schema = Joi.object({
                total_price: Joi.number().required(),
                order_details: Joi.array().items(
                    Joi.object({
                        book_id: Joi.number().required(),
                        quantity: Joi.number().required(),
                        price: Joi.number().required(),
                        total_price: Joi.number().required(),
                    })
                ).required(),
            });
    
            const {error} = schema.validate(body);
            if (error) {
                throw new Error(error.details[0].message);
            }

            const result = await OrderService.create(body)
            return res.status(201).json({
                type: true,
                message: 'siparis olusturuldu',
                data: result
            })
        }
        catch(error){
            return res.json({
                type:false,
                message:'Beklenmedik bir hata oluştu.Lütfen daha sonra tekrar deneyiniz',
                error_detail:error.message
            })
        }
    }

    static async order_detail(req, res){
        try {
            const {params} = req;

            const result = await OrderService.order_detail_by_id(params.id);
    
            return res.json({
                type: true,
                message: "siparis detayi getirildi",
                data: result
            })
        } catch (error) {
            return res.json({
                type:false,
                message:'Beklenmedik bir hata oluştu.Lütfen daha sonra tekrar deneyiniz',
                error_detail:error.message
            })
        }
       
    }

    static async update_order_status(req, res){
        try {
            const {params, body} = req;
            const schema = Joi.object({
                id: Joi.number().min(1).required(),
                status_id: Joi.number().min(1).max(3).required(),
            });
    
            const {error} = schema.validate({...params, ...body});
            if (error) {
                throw new Error(error.details[0].message);
            }

            await OrderService.update_order_status(params.id, body);
    
            return res.json({
                type: true,
                message: "siparis guncellendi",
            })
        } catch (error) {
            return res.json({
                type:false,
                message:'Beklenmedik bir hata oluştu.Lütfen daha sonra tekrar deneyiniz',
                error_detail:error.message
            })
        }
       
    }
}

export default OrderController;