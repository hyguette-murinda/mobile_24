import express from 'express'
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware.js'
import userController from '../controllers/user.controller.js'

const userRouter = express.Router()

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
userRouter.post('/register', userController.registerUser)

/**
 * @swagger
 * /api/v1/user/update:
 *   put:
 *     summary: Updates user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.put('/update', isLoggedIn, userController.updateUser)

/**
 * @swagger
 * /api/v1/user/update-status:
 *   put:
 *     summary: Updates user profile status
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile status updated successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.put('/update-status', isLoggedIn, userController.updateProfileStatus)

/**
 * @swagger
 * /api/v1/user/all:
 *   get:
 *     summary: Retrieves all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 */
userRouter.get('/all', isLoggedIn, userController.getAllUsers)

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Retrieves a user by ID
 *     tags: [User]
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
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', isLoggedIn, userController.getUserById)

/**
 * @swagger
 * /api/v1/user/delete/{id}:
 *   delete:
 *     summary: Deletes a user by admin
 *     tags: [User]
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
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete('/delete/:id', isLoggedIn, isAdmin, userController.deleteUserByAdmin)

/**
 * @swagger
 * /api/v1/user/delete:
 *   post:
 *     summary: Deletes the logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/delete', isLoggedIn, userController.deleteUser)

/**
 * @swagger
 * /api/v1/user/report/{id}:
 *   get:
 *     summary: Retrieves a user report by ID
 *     tags: [User]
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
 *         description: User report retrieved successfully
 *       404:
 *         description: User report not found
 */
userRouter.get("/report/:id", isLoggedIn, userController.getUserReport)

/**
 * @swagger
 * /api/v1/user/search/{query}:
 *   get:
 *     summary: Searches users by query
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
userRouter.get("/search/:query", isLoggedIn, userController.searchUser)

/**
 * @swagger
 * /api/v1/user/update-avatar:
 *   post:
 *     summary: Updates the user's avatar
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 */
userRouter.post("/update-avatar", isLoggedIn, userController.updateAvatar)

export default userRouter
