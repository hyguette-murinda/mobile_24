import { config } from "dotenv"
import cloudinary from 'cloudinary'
config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadFile = async (fileString) => {
    try {
        const response = await cloudinary.v2.uploader.upload(fileString, {
            upload_preset: "your_preset"
        })
        const avatar = response.secure_url
        return avatar
    } catch (error) {
        console.log(error);
        return null;
    }
}