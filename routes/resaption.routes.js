import {Router} from "express"
import { create, findAll, findBySorted, findOne, remove, update } from "../controllers/reception.controller.js"


const reseptionRouter = Router()

reseptionRouter.get("/", findAll);
reseptionRouter.get("/query", findBySorted);
reseptionRouter.get("/:id", findOne);
reseptionRouter.post("/", create);
reseptionRouter.patch("/:id", update);
reseptionRouter.delete("/:id", remove);

export default reseptionRouter



/**
 * @swagger
 * tags:
 *   name: Reseption
 *   description: reseption management endpoints
 */

/**
 * @swagger
 * /api/reseption:
 *   get:
 *     summary: Get all Reseption
 *     tags: [Reseption]
 *     responses:
 *       200:
 *         description: All Reseption
 *       404:
 *         description: Not 
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /api/reseption/query:
 *   get:
 *     summary: "Get all Reseption"
 *     tags: [Reseption]
 *     description: "Query orqali filter, sort va pagination bilan"
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [status]
 *         description: "reseption bo‘yicha filtr"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: "search" 
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: "Saralash tartibi: o'sish (asc) yoki kamayish (desc)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Nechta natija qaytarish"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: "Nechanchi natijadan boshlash (pagination)"
 *     responses:
 *       200:
 *         description: "data"
 *       404:
 *         description: "Not Fount"
 *       500:
 *         description: "Server error"
 */



/**
 * @swagger
 * /api/reseption/{id}:
 *   get:
 *     summary: Get one Reseption
 *     tags: [Reseption]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Reseption ID
 *     responses:
 *       200:
 *         description: data
 *       404:
 *         description: Not Fount
 *       500: 
 *         description: Server error  
 */



/**
 * @swagger
 * /api/reseption:
 *   post:
 *     summary: Reseption
 *     tags: [Reseption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - filialId
 *               - majorId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               filialId:
 *                 type: integer
 *                 example: 1
 *               major:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: server error
 */



/**
 * @swagger
 * /api/reseption/{id}:
 *   patch:
 *     summary: Update a reception
 *     tags: [Reseption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reception to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               filialId:
 *                 type: integer
 *                 example: 1
 *               majorId:
 *                 type: integer
 *                 example: 5
 *               status:
 *                 type: string
 *                 enum: ["pending", "study", "finished"]
 *                 example: "pending"
 *             optional:
 *               - userId
 *               - filialId
 *               - majorId
 *               - status
 *     responses:
 *       200:
 *         description: Reception updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /api/reseption/{id}:
 *   delete:
 *     summary: Get one Reseption
 *     tags: [Reseption]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Reseption ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found filed
 *       500:
 *         description: Server error
 */
