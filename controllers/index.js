import User from "../models/user.js";


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
                        date: new Date()
                    }
                ]
            }
            senderConversation = {
                ...senderConversation,
                chat: [
                    ...senderConversation.chat,
                    {
                        me: message,
                        date: new Date()
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
                    date: new Date()
                }]
            }
            let newSenderConversation = {
                room: room,
                member1: reciever,
                member2: sender,
                chat: [{
                    me: message,
                    date: new Date()
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