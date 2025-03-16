import express from 'express';
import helmet from 'helmet';
import OrderController from '../controllers/OrderController';

const app = express();
app.use(helmet.hidePoweredBy());

/**
 * @swagger
 * definitions:
 *   CreateOrderRequest:
 *     type: object
 *     required:
 *       - total_price
 *       - order_details
 *     properties:
 *       total_price:
 *         type: number
 *         example: 99.99
 *       order_details:
 *         type: array
 *         items:
 *           type: object
 *           required:
 *             - book_id
 *             - quantity
 *             - price
 *             - total_price
 *           properties:
 *             book_id:
 *               type: number
 *               example: 1
 *             quantity:
 *               type: number
 *               example: 2
 *             total_price:
 *               type: number
 *               example: 99.98
 *   UpdateOrderStatusRequest:
 *     type: object
 *     required:
 *       - status_id
 *     properties:
 *       status_id:
 *         type: number
 *         example: 1
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - orders
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/CreateOrderRequest"
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessWithDataResponse"
 */
app.post('/', OrderController.create);


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags:
 *       - orders
 *     summary: Get order details by id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Get order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessWithDataResponse"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
*/
app.get('/:id', OrderController.order_detail);


/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     tags:
 *       - orders
 *     summary: Update order status by id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/UpdateOrderStatusRequest"
 *     responses:
 *       200:
 *         description: Get order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessWithDataResponse"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
*/
app.put('/:id/status', OrderController.update_order_status);

export default app;