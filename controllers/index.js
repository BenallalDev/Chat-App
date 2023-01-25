import User from "../models/user.js";


export const SendMessage = async(sender, reciever, message, room) => {
    try {
        const senderUser = await User.findOne({username:sender})
        const recieverUser = await User.findOne({username: reciever})
        let messages = recieverUser.messages
        let messages2 = senderUser.messages
        let found = messages.find((conversation) => {
            if(conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender) return true
        })
        let found2 =  messages.find((conversation) => {
            if(conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender) return true
        })
        if(found){
            const index = messages.indexOf(found)
            const index2 = messages.indexOf(found2)
            const newChat = [...messages[index].chat, {
                him: message,
                date: new Date()}
            ]
            const newChat2 = 
            [...messages[index2].chat, {
                me: message,
                date: new Date()}
            ]
            messages[index] = {...messages[index], chat: newChat}
            messages2[index2] = {...messages2[index2], chat: newChat2}
            recieverUser.messages = messages
            senderUser.messages = messages2 
            await recieverUser.save()
            await senderUser.save()
            return senderUser.messages
        }
        else{
            messages.push({
                room: room,
                member1: reciever,
                member2: sender,
                chat: [{
                    him: message,
                    date: new Date()
                }]
            })
            messages2.push({
                room: room,
                member1: reciever,
                member2: sender,
                chat: [{
                    me: message,
                    date: new Date()
                }]
            })
            recieverUser.messages = messages
            senderUser.messages = messages2
            await recieverUser.save()
            await senderUser.save()
            return senderUser.messages
        }
    } catch (error) {
        return false
    }
}