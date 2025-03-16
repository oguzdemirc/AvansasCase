import db from '../db/models'
import ENUM from '../../src/enums'

class OrderService{

    static async create(body){
		const result = await db.sequelize.transaction(async (t) => {
            const {order_details, total_price} = body;

            let total_price_counter = 0; let total_quantity = 0
            const order_details_create_body = []
            for (const order_detail of order_details) {
                const {book_id, quantity, price, total_price: order_detail_total_prcie} = order_detail;
                const book_control = await db.Books.findOne({
                    where: {
                        id: book_id,
                        is_removed: false,
                    }
                });
                if(!book_control){
                    throw new Error("Kitap bulunamadi");
                }

                if(book_control.stock < quantity){
                    // Insufficient stock error
                    throw new Error("Stok hatasi, siparisinizi gozden geciriniz");
                }

                await db.Books.update(
                    {
                        stock: book_control.stock - quantity
                    },
                    {
                        where: {
                            id: book_id,
                        },
                        transaction: t
                    }
                );

                const order_detail_total_price_counter = quantity * book_control.price;
                if(order_detail_total_price_counter !== order_detail_total_prcie){
                    throw new Error("Siparis tutar hatasi, lutfen sistem yoneticisi ile iletisime geciniz");
                }
    
                total_price_counter += order_detail_total_prcie
                total_quantity += quantity
                order_details_create_body.push({
                    book_id: book_id,
                    quantity,
                    price: book_control.price,
                    total_price: order_detail_total_prcie,
                    is_removed: false
                });
            }
    
            if(total_price_counter !== total_price){
                throw new Error("Siparis toplam tutar hatasi, lutfen sistem yoneticisi ile iletisime geciniz");
            }
    
            const order_create_body = {
                total_price: total_price_counter,
                total_quantity,
                status_id: ENUM.OrderStatuses.PENDING,
                order_details: order_details_create_body,
            }
            
            const created_result = await db.Orders.create(
                order_create_body,
                {
                    include: [{
                        model: db.OrderDetails,
                        as: 'order_details'
                    }],
                    transaction: t
                }
            );

            return created_result;
		});

        return result
    }

    static async order_detail_by_id(id){
        const order_detail = await db.Orders.findOne({
            where: {
                id,
                is_removed: false,
            },
            attributes: [
                'total_price',
                'total_quantity',
                [db.Sequelize.col('Orders.createdAt'), "order_date"]
            ],
            include: [
                {
                    as: 'order_status',
                    model: db.OrderStatuses,
                    attributes: [
                        'name'
                    ]
                },
                {
                    as: "order_details",
                    model: db.OrderDetails,
                    attributes: [
                        'quantity',
                        'price',
                        'total_price'
                    ],
                    include: [{
                        as: 'book',
                        model: db.Books,
                        attributes: [
                            'title',
                            'author',
                            'isbn',
                            'publish_year',
                        ]
                    }]
                }
            ]
        });

        return order_detail
    }

    static async update_order_status(id, body){
	    await db.sequelize.transaction(async (t) => {
            const order_control = await db.Orders.findOne({
                where: {
                    id
                },
                transaction: t,
            });
            if(!order_control){
                // not found error
                throw new Error("Siparis bulunamadi");
            }

            await db.Orders.update(
                {
                    status_id: body.status_id
                },
                {
                    where: {
                        id
                    },
                    transaction: t,
                }
            );
        return null
    });
    return null

    }

}

export default OrderService;