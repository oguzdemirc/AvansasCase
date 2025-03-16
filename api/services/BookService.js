import { Op } from 'sequelize';
import db from '../db/models'
class BookService{
    static async create(body){
        const category_control = await db.Categories.findOne({
            where:{
                is_removed:false,
                id:body.category_id
            }
        })
        
        if (!category_control) {
            // not found exeption error
            throw new Error("Kategori bulunmadı");
            
        }
        const created_book = await db.Books.create({
            title: body.title,
            author: body.author,
            isbn: body.isbn,
            price: body.price,
            stock: body.stock,
            category_id: body.category_id,
            publish_year: body.publish_year
        });
        return created_book;
    }

    static async get_all_data(){
        const books = await db.Books.findAll({
            where:{is_removed:false},
            attributes:[
                'id',
                'title',
                'author',
                'isbn',
                'price',
                'stock',
                'publish_year'
            ],
            include:[{
                model:db.Categories,
                as:'category',
                attributes:['name']
            }]
        });
        return books
    }

    static async get_by_id(id){
        const book = await db.Books.findOne({
            where:{
                is_removed:false,
                id:id
            },
            attributes:[
                'id',
                'title',
                'author',
                'isbn',
                'price',
                'stock',
                'publish_year'
            ],
            include:[{
                model:db.Categories,
                as:'category',
                attributes:['name']
            }]
        })
        return book;
    }

    static async get_by_query(query){
        const whereQuery = {
            is_removed: false
        };

        if(query?.title){
            whereQuery['title'] = {
                [Op.iLike]: `%${query.title}%`
            }
        }

        if(query?.author){
            whereQuery['author'] = {
                [Op.iLike]: `%${query.author}%`
            }
        }

        if(query?.isbn){
            whereQuery['isbn'] = {
                [Op.iLike]: `%${query.isbn}%`
            }
        }

        if(query?.category_id){
            whereQuery['category_id'] = category_id
        }

        if(query?.publish_year){
            whereQuery['publish_year'] = publish_year
        }

        const books = await db.Books.findAll({
            where: whereQuery,
            attributes:[
                'id',
                'title',
                'author',
                'isbn',
                'price',
                'stock',
                'publish_year'
            ],
            include:[{
                model:db.Categories,
                as:'category',
                attributes:['name']
            }],
        })
        return books;
    }

   
}
export default BookService;