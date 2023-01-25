import { Box, Button, Card, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MessagesLoading from '../Components/MessagesLoading'

const Messages = () => {
    const [loading, setLoading] = useState(true)

    setTimeout(() => setLoading(false), 5000)
  return (
    <Flex w="full" p="2rem" flexDirection="column">
        <Text my="1rem" color="blackAlpha.800" fontWeight="semibold" fontSize="1.5rem">
            Messages:
        </Text>
        {
            loading ? (
                <MessagesLoading />
            ) : (
                <Flex cursor="pointer" transition="all ease 0.3s" _hover={{opacity: "0.6", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} position="relative" as={Link} to="/chat/username" flexDirection="row" alignItems="center" w="3xl" p=".5rem" boxShadow="base" borderRadius="1px">
                    <Box position="relative">
                        <Image border="1px solid #4299E1" borderRadius="50%" w="60px" h="60px" src="https://images.pexels.com/photos/8199679/pexels-photo-8199679.jpeg?auto=compress&cs=tinysrgb&w=1600" />
                        <Box w="20px" h="20px" bg="green.300" position="absolute" bottom="0" right="0" borderRadius="50%">
                        </Box>
                    </Box>
                    <Flex mx="2rem" flexDirection="column" justifyContent="flex-start">
                        <Text color="blue.400" fontWeight="semibold" >Username</Text>
                        <Text fontSize=".8rem" color="blackAlpha.800" fontWeight="bold">Hello how are you doing ?</Text>
                    </Flex>
                    <Box borderRadius="50%" as={Flex} alignItems="center" justifyContent="center" position="absolute" right=".5rem" w="30px" h="30px" bg="blue.500" color="white" fontWeight="bold">
                        5
                    </Box>
                </Flex>
            )
        }
        <Button as={Link} my="1rem" w="100px" colorScheme="blue">Logout</Button>
    </Flex>
  )
}

export default Messages