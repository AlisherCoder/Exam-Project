import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
   login,
   register,
   resetPassword,
   sendOTP,
   verifyOTP,
} from "../controllers/auth.controller.js";
import {
   findAll,
   findOne,
   getAllSeos,
   getBySearch,
   getOneSeo,
   remove,
   update,
} from "../controllers/user.controller.js";
import rolePolice from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/send-otp", sendOTP);
userRoute.post("/verify-otp", verifyOTP);
userRoute.post("/login", login);
userRoute.post("/reset-password", resetPassword);

userRoute.get("/seos", getAllSeos);
userRoute.get("/seos/:id", getOneSeo);

userRoute.get("/search", verifyToken, getBySearch);
userRoute.get("/", verifyToken, rolePolice(["seo"]), findAll);
userRoute.get("/:id", verifyToken, selfPolice(["admin"]), findOne);
userRoute.delete("/:id", verifyToken, selfPolice(["admin"]), remove);
userRoute.patch("/:id", verifyToken, selfPolice(["admin"]), update);


export default userRoute;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's first name
 *           example: Alisher
 *         lastName:
 *           type: string
 *           description: User's last name
 *           example: Sharipov
 *         email:
 *           type: string
 *           format: email
 *           example: alishersharipov670@gmail.com
 *           description: User's email address
 *         phone:
 *           type: string
 *           example: 998953901313
 *           description: User's phone number
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           enum: [user, seo]
 *           example: seo
 *           description: User role in the system
 *         image:
 *            type: string
 *            example: image.jpg
 *            description: User image link
 *
 * tags:
 *   - name: Authentication
 *     description: Endpoints for user authentication
 *   - name: Users
 *     description: Endpoints for managing users
 *
 * /api/users/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully registered
 *       409:
 *         description: User already exists
 *
 * /api/users/send-otp:
 *   post:
 *     tags: [Authentication]
 *     summary: Send OTP to user email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alishersharipov670@gmail.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       500:
 *         description: Server error
 *
 * /api/users/verify-otp:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify user OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alishersharipov670@gmail.com
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account activated
 *       400:
 *         description: Invalid OTP or email
 *       404:
 *         description: User not found
 *
 * /api/users/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alishersharipov670@gmail.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 *
 * /api/users/reset-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alishersharipov670@gmail.com
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Invalid OTP or email
 *
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users with pagination and sorting
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of users to retrieve per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: firstName
 *         description: Field to sort users by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sorting order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *
  * /api/users/search:
 *   get:
 *     tags: [Users]
 *     summary: Search users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Number of records to fetch
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Sorting order (asc/desc)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *     responses:
 *       200:
 *         description: Users found
 *       404:
 *         description: No users found
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *
 *   patch:
 *     tags: [Users]
 *     summary: Update user data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Not allowed to update role
 *       404:
 *         description: User not found
 * 
 * /api/users/seos:
 *   get:
 *     tags: [Users]
 *     summary: Get all SEO users with filtering, pagination, and sorting
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of users to retrieve per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: firstName
 *         description: Field to sort users by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sorting order (ascending or descending)
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter by first name (substring match)
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter by last name (substring match)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by email (substring match)
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter by phone number (substring match)
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of SEO users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 * 
 * /api/users/seos/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get one SEO user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO user's unique ID
 *     responses:
 *       200:
 *         description: Found SEO user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found data
 *       500:
 *         description: Internal server error
 * 
 */
