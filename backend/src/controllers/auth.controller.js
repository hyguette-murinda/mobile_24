import { config } from "dotenv"
import User from "../models/user.js"
import PasswordReset from "../models/passwordReset.js"
import Verification from "../models/verification.js"
import { sendAccountVerificationEmail, sendPaswordResetEmail } from "../utils/mail.util.js"
import bcrypt from 'bcryptjs'
import { LoginUserSchema } from "../validations/app.validation.js"
import jwt from 'jsonwebtoken'
import { ApiResponse } from "../responses/api.response.js"
import crypto from 'crypto'

config()
const HASH_SALT = process.env.HASH_SALT
const JWT_SECRET_KEY = process.env.JWT_SECRET
const login = async (req, res) => {
    try {
        const { error } = LoginUserSchema.validate(req.body)
        if (error) return res.status(400).json(new ApiResponse(false, error.details[0].message, null))
        const { email, password } = req.body
        console.log("Here in auth")
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json(new ApiResponse(false, "Incorrect credentials", null))
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(404).json(new ApiResponse(false, "Incorrect credentials", null))
        const token = await jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, { expiresIn: "31d" })
        const verification = await Verification.findOne({ user: user._id })
        const users = await User.find({})
        return res.status(200).json(new ApiResponse(true, "Login successful", { user, token, verification, users }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(false, "Internal Server Error", null))
    }
}

const initiateEmailVerification = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json(new ApiResponse(false, "User not found", null))

        const verification = await Verification.findOne({ user: user._id })
        if (verification.verified) return res.status(400).json(new ApiResponse(false, "Account already verified", null))

        const verificationToken = crypto.randomBytes(32).toString("hex")
        const verificationExpiry = Date.now() + 3600000

        verification.verificationToken = verificationToken
        verification.expiresAt = verificationExpiry
        await verification.save()
        const email = await sendAccountVerificationEmail(user.email, user.fullname, verificationToken)
        return res.status(200).json(new ApiResponse(true, "Verification email sent", { email }))

    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(false, "Internal Server Error", null))
    }
}

const initiatePasswordReset = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json(new ApiResponse(false, "User not found", null))

        const passwordReset = await PasswordReset.findOne({ user: user._id })
        if (!passwordReset) {
            const newReset = new PasswordReset({
                user: user._id
            })
            await newReset.save()
        }

        const passwordResetToken = crypto.randomBytes(32).toString("hex")
        const passwordResetExpiry = Date.now() + 3600000

        passwordReset.passwordResetToken = passwordResetToken
        passwordReset.expiresAt = passwordResetExpiry

        await passwordReset.save()
        const sentMail = await sendPaswordResetEmail(user.email, user.fullname, passwordResetToken)
        return res.status(200).json(new ApiResponse(true, "Password reset email email sent", { passwordResetToken, sentMail }))

    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(false, "Internal Server Error", null))
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { verificationToken } = req.body
        const verification = await Verification.findOne({ verificationToken, verified: false, expiresAt: { $gt: Date.now() } })
        if (!verification) return res.status(404).json(new ApiResponse(false, "Invalid or expired token", null))
        const user = await User.findById(verification.user)
        if (!user) return res.status(404).json(new ApiResponse(false, "User not found", null))
        verification.verified = true
        verification.verifiedAt = Date.now()
        verification.expiresAt = null
        verification.verificationToken = null
        await verification.save()
        return res.status(200).json(new ApiResponse(true, "Account verified", { user, verification }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(false, "Internal Server Error", null))
    }
}

const resetPassword = async (req, res) => {
    try {
        const { passwordResetToken, password } = req.body
        const passwordReset = await PasswordReset.findOne({ passwordResetToken, expiresAt: { $gt: Date.now() } })
        if (!passwordReset) return res.status(404).json(new ApiResponse(false, "Password reset token not found", null))
        passwordReset.passwordResetToken = null
        passwordReset.expiresAt = null
        passwordReset.lastResetAt = Date.now()
        await passwordReset.save()
        const user = await User.findById(passwordReset.user)
        if (!user) return res.status(404).json(new ApiResponse(false, "User not found", null))
        user.password = await bcrypt.hash(password, 8)
        user.save()
        return res.status(200).json(new ApiResponse(true, "Password reset successful", { user }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse(false, "Internal Server Error", null))
    }
}

const authController = {
    login,
    initiateEmailVerification,
    initiatePasswordReset,
    verifyEmail,
    resetPassword
}
export default authController