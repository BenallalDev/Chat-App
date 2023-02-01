import { Box, Button, Card, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import MessagesLoading from '../Components/MessagesLoading'
import { GetMessages } from '../redux/actions/messages'
import { Logout } from '../redux/actions/auth'

const Messages = () => {
    const { messagesLoading, messages} = useSelector(state => state.messages)
    const { username } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(GetMessages())
    }, [])
    console.log(messages)
    
  return (
    <Flex minH="100vh" w="full" p="2rem" flexDirection="column">
        <Text my="1rem" color="blackAlpha.800" fontWeight="semibold" fontSize="1.5rem">
            Messages:
        </Text>
        {
            messagesLoading ? (
                <MessagesLoading />
            ) : (
                messages.map(e => (
                    <Flex key={e} cursor="pointer" transition="all ease 0.3s" _hover={{opacity: "0.6", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} position="relative" as={Link} to={`/chat/${e.member1 === username ? e.member2 : e.member1}`} flexDirection="row" alignItems="center" maxW="3xl" p=".5rem" boxShadow="base" borderRadius="1px">
                        <Box position="relative">
                            <Image border="1px solid #4299E1" borderRadius="50%" w="60px" h="60px" src="https://images.pexels.com/photos/8199679/pexels-photo-8199679.jpeg?auto=compress&cs=tinysrgb&w=1600" />
                            <Box w="20px" h="20px" bg="green.300" position="absolute" bottom="0" right="0" borderRadius="50%">
                            </Box>
                        </Box>
                        <Flex mx="2rem" flexDirection="column" justifyContent="flex-start">
                            <Text color="blue.400" fontWeight="semibold" >{e.member1 === username ? e.member2 : e.member1}</Text>
                            <Text fontSize=".8rem" color="blackAlpha.800" fontWeight="bold">
                                {
                                    e.unseenMessages ? e.unseenMessages[e.unseenMessages.length - 1] : (e.chat[e.chat.length - 1].him  ? e.chat[e.chat.length - 1].him  : e.chat[e.chat.length - 1].me)
                                }
                            </Text>
                        </Flex>
                        {
                            !e.unseenMessages || e.unseenMessages.length === 0 ? null : (
                                <Box borderRadius="50%" as={Flex} alignItems="center" justifyContent="center" position="absolute" right=".5rem" w="30px" h="30px" bg="blue.500" color="white" fontWeight="bold">
                                    {e.unseenMessages.length}
                                </Box>
                            )
                        }
                        
                    </Flex>
                ))
            )
        }
        <Button onClick={() => dispatch(Logout())}  my="1rem" w="100px" colorScheme="blue">Logout</Button>
    </Flex>
  )
}

export default Messages