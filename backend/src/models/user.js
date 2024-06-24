import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 40
    },
    // mobile: {
    //     type: String,
    //     required: false,
    //     minlength: 10,
    //     maxlength: 15
    // },
    // gender: {
    //     type: String,
    //     enum: ["MALE", "FEMALE"],
    //     required: false
    // },
    avatar: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/precieux/image/upload/v1677675293/Utilities/cjrana8po0nonquxailm.jpg"
    },
    coverImage: {
        type: String,
        required: false,
        default: ""
    },
    role: {
        type: String,
        enum: ["ADMIN", "NORMAL"],
        default: "NORMAL"
    },
    profileStatus: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    verification: {
        type: String
    },
    passwordReset: {
        type: String,
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: String,
        default: Date.now()
    }
})


const User = mongoose.model('user', UserSchema)
export default User