
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) return res.status(401).json({ message: "No token sent in headers!!!" })
        const response = jwt.verify(token, JWT_SECRET_KEY, {})
        if (!response) return res.status(401).json({ message: "You are not logged in" })
        req.user = response
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error 500." })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(401).json({ message: "You are not an admin" })
        const response = await jwt.verify(token, JWT_SECRET_KEY, {})
        if (response.role !== "ADMIN") return res.status(401).json({ message: "You are not an admin" })
        req.user = response
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error 500." })
    }
}

export {
    isAdmin,
    isLoggedIn
}