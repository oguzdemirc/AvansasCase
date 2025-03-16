import express from 'express';
import helmet from 'helmet';
import BookController from '../controllers/BookController';

const app = express();
app.use(helmet.hidePoweredBy());
/**
 * @swagger
 * definitions:
 *  CreateAgeBookRequest:
 *    type: object
 *    required:
 *      - content
 *      - page_number
 *    properties:
 *      title:
 *        type: string
 *        example: "Book Title"
 *      author:
 *        type: string
 *        example: "Book Author"
 *      isbn:
 *        type: string
 *        example: "123-456-789"
 *      price:
 *        type: number
 *        example: 19.99
 *      stock:
 *        type: integer
 *        example: 100
 *      category_id:
 *        type: integer
 *        example: 1
 *      publish_year:
 *        type: integer
 *        example: 2024
 */
/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - books
 *     summary: Create book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/CreateAgeBookRequest"
 *     responses:
 *       200:
 *         description: Get init information successfuly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessWithDataResponse"
*/
app.post('/',  BookController.create);
/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - books
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Get init information successfuly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessWithDataResponse"
*/
app.get('/',  BookController.get_all_data)


/**
 * @swagger
 * /books/search:
 *   get:
 *     tags:
 *       - books
 *     summary: Get book by id
 *     parameters:
 *       - name: title
 *         in: query
 *         schema:
 *           type: string
 *           default: "title"
 *       - name: author
 *         in: query
 *         schema:
 *           type: string
 *           default: "author"
 *       - name: isbn
 *         in: query
 *         schema:
 *           type: string
 *           default: "1111-1111-1111"
 *       - name: category_id
 *         in: query
 *         schema:
 *           type: number
 *           default: 1
 *       - name: isbnsss
 *         in: query
 *         schema:
 *           type: string
 *           default: "123"
 *     responses:
 *       200:
 *         description: Get book by query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessWithDataResponse"
*/
app.get('/search',  BookController.get_by_query)

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags:
 *       - books
 *     summary: Get book by id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Get init information successfuly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessWithDataResponse"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
*/
app.get('/:id',  BookController.get_by_id)



export default app;