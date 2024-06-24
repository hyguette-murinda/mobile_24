import mongoose, { Schema } from "mongoose";

const PasswordResetSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"user",
        required: true,
    },
    passwordResetToken: {
        type: String,
    },
    expiresAt: {
        type: String
    },
    lastResetAt: {
        type: String,
    }
})

const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema)
export default PasswordReset