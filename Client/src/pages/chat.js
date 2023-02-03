import { CloseIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { MdSend } from "react-icons/md"
import ChatLoading from '../Components/ChatLoading'
import { useDispatch, useSelector } from 'react-redux'
import { GetChat} from '../redux/actions/messages'
import { SendMessage} from "../redux/actions/messages"
import { socket } from "../socket.io"
import { recieve_message } from '../redux/messages'
import Reacting from '../Components/ReactingBtn' 
import { useMediaQuery } from '@chakra-ui/react'

const Chat = () => {
    const { username } = useParams()
    const { chatLoading, chat, room } = useSelector(state => state.messages)
    const [newChat, setnewChat] = useState([])
    const [message, setMessage] = useState("")
    const [senderTyping, setSenderTyping] = useState(false)
    const dispatch = useDispatch()
    const chatRef = useRef(null);
    const [isSmallerThan515] = useMediaQuery('(max-width: 550px)')
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;
        }
    }, [newChat, chatRef]);
    useEffect(() => {
        dispatch(GetChat(username))
        socket.on("new-message", message => {
            if(typeof message === 'string'){
                dispatch(recieve_message(message))
            }
        })
        socket.on("sender-start-typing", () => {
            setSenderTyping(true)

        })
        socket.on("sender-stop-typing", () => {
            setSenderTyping(false)
            
        })
    }, [])
    useEffect(() => {
        socket.emit("join-room", room)
    }, [room])

    const getEmoji = (emojiName) => {
        const reactions = ["angry", "sad", "fire", "laugh"];
        if(reactions.includes(emojiName)){
            
        }
        return `/assets/${emojiName}.png`
    } 
    
    function groupMessages(messages) {
        let result = [];
        let currentGroup = {};
    
        messages.forEach((message) => {
        let sender = Object.keys(message)[0];
    
        if (!currentGroup.sender) {
            currentGroup = {
            sender: sender,
            messages: [{
                message: message[sender],
                date: message.date,
                reaction:message.reaction
            }]
            };
        } else if (currentGroup.sender === sender) {
            currentGroup.messages.push({
            message: message[sender],
            date: message.date,
            reaction:message.reaction
            });
        } else {
            result.push(currentGroup);
            currentGroup = {
            sender: sender,
            messages: [{
                message: message[sender],
                date: message.date,
                reaction:message.reaction
            }]
            };
        }
        });
    
        result.push(currentGroup);
        return result;
    }
    
    useEffect(() => {
        setnewChat(groupMessages(chat))
    }, [chat])
    const send_message = () => {
        socket.emit("stop-typing", room)
        dispatch(SendMessage({username, message}))
            .then(res => {
                socket.emit("send-message", room, message)
            })
        setMessage("")
        
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault()
            send_message()
        }
    }
    
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
      
    const f = new Intl.DateTimeFormat("en-us", options)

    const typing = (val) => {
        if(message === ""){
            socket.emit("start-typing", room)
        }
        else if (val === "" && message.length > 0){
            socket.emit("stop-typing", room)
        }
        setMessage(val)
    }
    
    return (
        <Flex minH="100vh" maxH="100vh" w="full"  p={isSmallerThan515 ? 0 : "3rem"}>
            <Link to="/">
                <CloseIcon color="black"  position="absolute" zIndex="99" top={isSmallerThan515 ? "1.7rem" : "1rem"} right={isSmallerThan515 ? "1.7rem" : "1rem"} cursor="pointer" />
            </Link>
            {
                chatLoading ? (
                    <ChatLoading />
                ) : (
                    <Card w="100%" maxH="100%" boxShadow="base">
                        <CardHeader as={Flex} alignItems="center" borderBottom="1px solid #dedede" py=".8rem">
                            <Image borderRadius="50%" src="https://images.pexels.com/photos/8199679/pexels-photo-8199679.jpeg?auto=compress&cs=tinysrgb&w=1600" w="50px" h="50px" mx=".5rem" />
                            <Text>{username}</Text>
                            {
                                senderTyping ? <Text mx="1rem" p=".5rem 1rem" fontWeight="bold" color="blackAlpha.500" bg="blackAlpha.50">Typing...</Text> : null
                            }
                        </CardHeader>
                        <CardBody ref={chatRef} overflowY="scroll" as={Flex} flexDirection="column" gap="1rem">
                            {
                                newChat.map((e, index) => (
                                    e.sender === "him" ? (
                                        <Flex key={index} gap="1rem" alignItems="flex-start">
                                            <Image src="https://images.pexels.com/photos/8199679/pexels-photo-8199679.jpeg?auto=compress&cs=tinysrgb&w=1600" w="40px" h="40px" borderRadius="50%" />
                                            <Flex w="100%" flexDirection="column" gap="1rem">
                                                {
                                                    e.messages?.map((message, ix) => (
                                                        ix === e.messages.length - 1 ? (
                                                            <Flex flexWrap="wrap" key={ix} justifyContent="flex-start" maxW="100%" minH="100%">
                                                                <Flex maxW="80%" flexDirection="column">
                                                                    <Text position="relative" minW="fit-content" p=".5rem" mb="0" bg="#eff3f6">
                                                                        {message.message}
                                                                        {message.reaction ? <Image  w="30px" h="30px" position="absolute" top="-15px" right="-15px" src={getEmoji(message.reaction)} /> : null}
                                                                    </Text>
                                                                    <Text  fontWeight="bold" color="grey" my=".3rem" fontSize=".8rem">{f.format(new Date(message.date))}</Text>
                                                                </Flex>
                                                                <Reacting msgDate={new Date(message.date).toISOString()} username={username} />
                                                            </Flex> 

                                                            
                                                        ) : (
                                                            <Flex key={ix} flexWrap="wrap">
                                                                <Text position="relative" key={ix} w="fit-content" maxW="90%" minH="100%" p=".5rem" bg="#eff3f6">
                                                                    {message.message}
                                                                    {message.reaction ? <Image  w="30px" h="30px" position="absolute" top="-15px" right="-15px" src={getEmoji(message.reaction)} /> : null}
                                                                </Text>
                                                                <Reacting msgDate={new Date(message.date).toISOString()} username={username} />
                                                            </Flex>
                                                        )
                                                        
                                                    ))
                                                }
                                            </Flex>
                                        </Flex>
                                    ) : (
                                        <Flex w="100%" alignSelf="flex-end" flexDirection="column" key={index} gap="1rem">
                                            
                                            {
                                                e.messages?.map((message, i) => (
                                                    i === e.messages.length - 1 ? (
                                                        <Flex flexDirection="column" key={i}>
                                                            <Text position="relative" key={i} alignSelf="flex-end" w="fit-content" maxW="90%" p=".5rem" color="white" bg="black">{message.message}
                                                            {message.reaction ? <Image  w="30px" h="30px" position="absolute" top="-15px" left="-15px" src={getEmoji(message.reaction)} /> : null}
                                                            </Text>
                                                            <Text  fontWeight="bold" alignSelf="flex-end" color="grey" my=".5rem" fontSize=".8rem">{f.format(new Date(message.date))}</Text>
                                                            
                                                        </Flex>
                                                    ) : (
                                                        <Text key={i} position="relative" alignSelf="flex-end" w="fit-content" maxW="90%" p=".5rem" color="white" bg="black">{message.message}
                                                            {message.reaction ? <Image  w="30px" h="30px" position="absolute" top="-15px" left="-15px" src={getEmoji(message.reaction)} /> : null}  
                                                        </Text>
                                                    )
                                                    
                                                ))
                                            }
                                        </Flex>
                                    )
                                    
                                    
                                ))
                            }
                            
                            
                        </CardBody>
                        <CardFooter as={Flex} gap="1rem" alignItems="center">
                            <Textarea onKeyPress={handleKeyPress} value={message}  onChange={(e) => typing(e.target.value)} rows="2" resize="none" />
                            <Button h="90%" w="60px" colorScheme="blue">
                                <MdSend onClick={send_message} style={{fontSize:"1.5rem"}} />
                            </Button>
                        </CardFooter>
                    </Card> 
                )
            }
        </Flex>
    )
}

export default Chat