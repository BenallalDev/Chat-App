import User from "../models/user.js";
import { v4 as uuid} from "uuid"

export const SendMessage = async(senderID, reciever, message, room) => {
    try {
        const senderUser = await User.findById(senderID)
        const sender = senderUser.username
        const recieverUser = await User.findOne({username: reciever})
        let recieverMessages = recieverUser.messages
        let senderMessages = senderUser.messages
        let recieverConversation = recieverMessages.find((conversation) => {
            if(conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender) return true
        })
        let senderConversation =  senderMessages.find((conversation) => {
            if(conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender) return true
        })
        if(recieverConversation && senderConversation){
            recieverConversation = {
                ...recieverConversation,
                chat: [
                    ...recieverConversation.chat,
                    {
                        him: message,
                        date: new Date(),
                    }
                ]
            }
            senderConversation = {
                ...senderConversation,
                chat: [
                    ...senderConversation.chat,
                    {
                        me: message,
                        date: new Date(),
                    }
                ]
            }
            const recieverNewMessages = recieverMessages.map(c => {
                if(c.member1 === senderUser.username || c.member2 === senderUser.username) return recieverConversation
                return c
            })
            const senderNewMessages = senderMessages.map(c => {
                if(c.member1 === recieverUser.username || c.member2 === recieverUser.username) return senderConversation
                return c
            })
            recieverUser.messages = recieverNewMessages
            senderUser.messages = senderNewMessages
            await recieverUser.save()
            await senderUser.save()
            return senderUser.messages.find((conversation) => conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender)
        }
        else{ 
            let newRecieverConversation =  {
                room: room,
                member1: reciever,
                member2: sender,
                chat: [{
                    him: message,
                    date: new Date(),
                }]
            }
            let newSenderConversation = {
                room: room,
                member1: reciever,
                member2: sender,
                chat: [{
                    me: message,
                    date: new Date(),
                }]
            }
            recieverMessages.push(newRecieverConversation);
            senderMessages.push(newSenderConversation);
            recieverUser.messages = recieverMessages
            senderUser.messages = senderMessages
            await recieverUser.save()
            await senderUser.save()
            return senderUser.messages.find((conversation) => conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender)
        }
    } catch (error) {
        return false
    }
}


export const reactToMessage = async (reaction, messageDate, reacterID, username) => {
    try {
        const user = await User.findOne({username})
        const reacterConversation = reacterUser.messages.find((conversation) => {
            if(conversation.member1 === reacterUser.username && conversation.member2 === username || conversation.member1 === username && conversation.member2 === reacterUser.username) return true
        })
        const recieverConversation =  user.messages.find((conversation) => {
            if(conversation.member1 === reacterUser.username && conversation.member2 === username || conversation.member1 === username && conversation.member2 === reacterUser.username) return true
        })
        if(recieverConversation && reacterConversation){
            reacterConversation = {
                ...reacterConversation,
                chat: reacterConversation.map(msg => {
                    if(msg.date.toISOString() === messageDate){
                        return {...msg, reaction}
                    }
                    return msg
                })
                
            }
            recieverConversation = {
                ...recieverConversation,
                chat: recieverConversation.map(msg => {
                    if(msg.date.toISOString() === messageDate){
                        return {...msg, reaction}
                    }
                    return msg
                })
            } 
        }


    } catch (error) {
        
    }
}