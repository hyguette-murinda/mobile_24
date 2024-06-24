import express from 'express'
import { isLoggedIn } from '../middlewares/auth.middleware.js'
import authController from '../controllers/auth.controller.js'

const authRouter = express.Router()

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
authRouter.post('/login', authController.login)

/**
 * @swagger
 * /api/v1/auth/initiate-password-reset:
 *   post:
 *     summary: Initiates password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset initiated
 */
authRouter.post('/initiate-password-reset', authController.initiatePasswordReset)

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Resets a user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or password
 */
authRouter.post('/reset-password', authController.resetPassword)

/**
 * @swagger
 * /auth/initiate-email-verification:
 *   get:
 *     summary: Initiates email verification
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email verification initiated
 */
authRouter.get('/initiate-email-verification', isLoggedIn, authController.initiateEmailVerification)

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verifies a user's email
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid token
 */
authRouter.post('/verify-email', isLoggedIn, authController.verifyEmail)

export default authRouter
