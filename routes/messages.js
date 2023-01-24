import { Router } from "express";
import User from "../models/user.js";
import { v4 as uuidv4} from "uuid"
import { SendMessage } from "../controllers/index.js";

const router = Router()

router.post('/:username', async (req, res) => {
    const { sender, message} = req.body
    const reciever = req.params.username
    const room = uuidv4()
    const sendingMessage = await SendMessage(sender, reciever, message, room)
    if(!sendingMessage){
        res.status(401).json("Message not sent")
        return;
    }
    res.status(200).json("Message Sent")
})

router.get('/:client/messages/:username', async (req, res) => {
    const clientusername = req.params.client
    const chatusername = req.params.username
    User.findOne({username: clientusername})
        .then(user => {
            const messages = user.messages
            const found = messages.find((conversation) => {
                if(conversation.member1 === clientusername && conversation.member2 === chatusername || conversation.member1 === chatusername && conversation.member2 === clientusername) return true
            })
            res.json({chat: found.chat, room: found.room})
        }).catch(err => res.status(500)) 
})

export default router