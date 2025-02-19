import { Router } from "express";
import { findAll, findBySorted, findOne, create, update ,remove} from "../controllers/likeds.controller.js";

const likedRouter = Router();

likedRouter.get("/", findAll);
likedRouter.get("/query", findBySorted);
likedRouter.get("/:id", findOne);
likedRouter.post("/", create);
likedRouter.patch("/:id", update);
likedRouter.delete("/:id", remove);

export default likedRouter




/**
 * @swagger
 * tags:
 *   name: Liked
 *   description: liked management endpoints
 */

/**
 * @swagger
 * /api/liked:
 *   get:
 *     summary: Get all Liked
 *     tags: [Liked]
 *     responses:
 *       200:
 *         description: All Liked
 *       404:
 *         description: Not 
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /api/liked/query:
 *   get:
 *     summary: "Get all Liked"
 *     tags: [Liked]
 *     description: "Query orqali filter, sort va pagination bilan"
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [createdAt]
 *         description: "liked bo‘yicha filtr"
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
 *       - in: query
 *         name: dey
 *         schema:
 *           type: integer
 *           example: 10
 *         description: "dey liked"
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
 * /api/liked/{id}:
 *   get:
 *     summary: Get one Liked
 *     tags: [Liked]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Liked ID
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
 * /api/liked:
 *   post:
 *     summary: Liked
 *     tags: [Liked]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - centerId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               centerId:
 *                 type: integer
 *                 example: 1
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
 * /api/liked/{id}:
 *   patch:
 *     summary: Update a reception
 *     tags: [Liked]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the liked to update
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
 *               centerId:
 *                 type: integer
 *                 example: 1
 *             optional:
 *               - userId
 *               - centerId
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
 * /api/liked/{id}:
 *   delete:
 *     summary: Get one Liked
 *     tags: [Liked]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Liked ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found filed
 *       500:
 *         description: Server error
 */
