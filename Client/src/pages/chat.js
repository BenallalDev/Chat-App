import { CloseIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { MdSend } from "react-icons/md"
import ChatLoading from '../Components/ChatLoading'
import { useDispatch, useSelector } from 'react-redux'
import { GetChat } from '../redux/actions/messages'
import { SendMessage } from "../redux/actions/messages"
import { io } from "socket.io-client"
const Chat = () => {
    const { username } = useParams()
    const { chatLoading, chat, room } = useSelector(state => state.messages)
    const [newChat, setnewChat] = useState([])
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const chatRef = useRef(null);
    
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;
        }
    }, [newChat, chatRef]);
    useEffect(() => {
    dispatch(GetChat(username))
    }, [])
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
                date: message.date
            }]
            };
        } else if (currentGroup.sender === sender) {
            currentGroup.messages.push({
            message: message[sender],
            date: message.date
            });
        } else {
            result.push(currentGroup);
            currentGroup = {
            sender: sender,
            messages: [{
                message: message[sender],
                date: message.date
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
        dispatch(SendMessage({username, message}))
        setMessage("")
        socket.emit("new-message", room, message)
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            send_message()
            socket.emit("new-message", room, message)
        }
    }
    
    return (
        <Flex h="100vh" maxH="100vh" w="full" p="3rem">
            <Link to="/">
                <CloseIcon color="black"  position="absolute" top="1rem" right="1rem" cursor="pointer" />
            </Link>
            {
                chatLoading ? (
                    <ChatLoading />
                ) : (
                    <Card w="100%" maxH="100%" boxShadow="base">
                        <CardHeader as={Flex} alignItems="center" borderBottom="1px solid #dedede" py=".8rem">
                            <Image borderRadius="50%" src="https://images.pexels.com/photos/8199679/pexels-photo-8199679.jpeg?auto=compress&cs=tinysrgb&w=1600" w="50px" h="50px" mx=".5rem" />
                            <Text>Username</Text>
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
                                                        <Text key={ix} w="fit-content" maxW="90%" minH="100%" p=".5rem" bg="#eff3f6">{message.message}</Text>
                                                    ))
                                                }
                                            </Flex>
                                        </Flex>
                                    ) : (
                                        <Flex w="100%" alignSelf="flex-end" flexDirection="column" key={index} gap="1rem">
                                            {
                                                e.messages?.map((message, i) => (
                                                    <Text key={i} alignSelf="flex-end" w="fit-content" maxW="90%" p=".5rem" color="white" bg="black">{message.message}</Text>
                                                ))
                                            }
                                        </Flex>
                                    )
                                    
                                    
                                ))
                            }
                            
                        </CardBody>
                        <CardFooter as={Flex} gap="1rem" alignItems="center">
                            <Textarea onKeyPress={handleKeyPress} value={message} onChange={(e) => setMessage(e.target.value)} rows="2" resize="none" />
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