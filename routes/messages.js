import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken"
import { v4 as uuidv4} from "uuid"
import { SendMessage } from "../controllers/index.js";
import login from "../middleware/index.js";


const router = Router()


router.post('/messages/:username', login, async(req, res) => {
    const { message} = req.body
    const reciever = req.params.username
    const token = req.cookies[process.env.COOKIE_NAME]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const room = uuidv4()
    const sendingMessage = await SendMessage(decoded.id, reciever, message, room)
    if(!sendingMessage){
        res.status(401).json("Message not sent")
        return;
    }
    res.status(200).json(sendingMessage.chat)
})

router.get('/chat/:username', login, async (req, res) => {
    try {
        const username = req.params.username
        const token = req.cookies[process.env.COOKIE_NAME]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        const messages = user.messages
        const found = await messages.find((conversation) => {
            if(conversation.member1 === user.username && conversation.member2 === username || conversation.member1 === username && conversation.member2 === user.username) return true
        })
        res.status(200).json({chat: found.chat, room: found.room})
    } catch (error) {
        res.status(500).json("Something went wrong")
    } 
})

router.get("/messages", login, async(req, res) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json("No token found")
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        res.status(200).json(user.messages)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


export default router