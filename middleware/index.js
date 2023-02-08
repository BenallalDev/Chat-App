import jwt from "jsonwebtoken"
import User from "../models/user.js";


const login = async(req, res, next) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json("No token auth denied")
            return;
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        if(!user.confirmed){
            res.status(401).json("Please confirm your account first")
            return;
        }
        next()
    } catch (error) {
        res.status(500).json("Invalid auth")
    }
}

export default login