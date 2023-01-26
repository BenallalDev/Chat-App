import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { MdSend } from "react-icons/md"
import ChatLoading from '../Components/ChatLoading'
const Chat = () => {
    const [loading, setLoading] = useState(true)
    setTimeout(() => setLoading(false), 5000)
    return (
        <Flex h="100vh" maxH="100vh" w="full" p="3rem">
            <Link to="/">
                <CloseIcon color="black"  position="absolute" top="1rem" right="1rem" cursor="pointer" />
            </Link>
            {
                loading ? (
                    <ChatLoading />
                ) : (
                    <Card w="100%" maxH="100%" boxShadow="base">
                        <CardHeader as={Flex} alignItems="center" borderBottom="1px solid #dedede" py=".8rem">
                            <Image borderRadius="50%" src="https://images.pexels.com/photos/8199679/pexels-photo-8199679.jpeg?auto=compress&cs=tinysrgb&w=1600" w="50px" h="50px" mx=".5rem" />
                            <Text>Username</Text>
                        </CardHeader>
                        <CardBody overflowY="scroll" as={Flex} flexDirection="column" gap="1rem">
                            <Flex gap="1rem" alignItems="flex-start">
                                <Image src="https://images.pexels.com/photos/8199679/pexels-photo-8199679.jpeg?auto=compress&cs=tinysrgb&w=1600" w="40px" h="40px" borderRadius="50%" />
                                <Flex flexDirection="column" gap="1rem">
                                    <Text w="90%" minH="100%" p=".5rem" bg="#eff3f6">Reprehenderit voluptate fugiat sunt voluptate consectetur laboris laboris fugiat elit sint do. Proident cupidatat cillum ea anim proident ipsum fugiat incididunt. Voluptate duis adipisicing ullamco ut reprehenderit cupidatat ipsum aliquip laboris minim eu. Do aliquip cupidatat fugiat nisi cupidatat nulla Lorem eu laboris fugiat proident est nulla.</Text>
                                    <Text w="90%" h="fit-content" p=".5rem" bg="#eff3f6">Reprehenderit voluptate fugiat sunt voluptate consectetur laboris laboris fugiat elit sint do. Proident cupidatat cillum ea anim proident ipsum fugiat incididunt. Voluptate duis adipisicing ullamco ut reprehenderit cupidatat ipsum aliquip laboris minim eu. Do aliquip cupidatat fugiat nisi cupidatat nulla Lorem eu laboris fugiat proident est nulla.</Text>
                                </Flex>
                                
                            
                            </Flex>
                            
                            <Flex justifyContent="flex-end" gap="1rem" alignItems="flex-end">
                                <Text w="90%" minH="100%" p=".5rem" color="white" bg="black">Reprehenderit voluptate fugiat sunt voluptate consectetur laboris laboris fugiat elit sint do. Proident cupidatat cillum ea anim proident ipsum fugiat incididunt. Voluptate duis adipisicing ullamco ut reprehenderit cupidatat ipsum aliquip laboris minim eu. Do aliquip cupidatat fugiat nisi cupidatat nulla Lorem eu laboris fugiat proident est nulla.</Text>
                            </Flex>
                            
                        </CardBody>
                        <CardFooter as={Flex} gap="1rem" alignItems="center">
                            <Textarea rows="2" resize="none" />
                            <Button h="90%" w="60px" colorScheme="blue">
                                <MdSend style={{fontSize:"1.5rem"}} />
                            </Button>
                        </CardFooter>
                    </Card> 
                )
            }
        </Flex>
    )
}

export default Chat