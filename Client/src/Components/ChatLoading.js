import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Skeleton, SkeletonCircle, SkeletonText, Textarea } from '@chakra-ui/react'
import React from 'react'
import { MdSend } from 'react-icons/md'

const ChatLoading = () => {
    const arr = new Array(5).fill("{}")
  return (
    <Card w="100%" h="100vh" maxH="100%"  boxShadow="base">
        <CardHeader as={Flex} alignItems="center" borderBottom="1px solid #dedede" py=".8rem">
            <Skeleton borderRadius="50%" w="50px" h="50px" mx=".5rem" />
            <Skeleton w="100px" h="20px" />
        </CardHeader>
        <CardBody overflowY="scroll" as={Flex} flexDirection="column" gap="1rem">
            {
                arr.map(e => (
                    <>
                    <Flex gap="1rem" alignItems="flex-start">
                        <Skeleton w="40px" h="40px" borderRadius="50%" />
                        <Flex h="50px" w="100%" flexDirection="column" gap="1rem">
                            <Skeleton w="90%" minH="100%" p=".5rem" bg="#eff3f6" />
                        </Flex>
                    </Flex>
                    <Flex justifyContent="flex-end" gap="1rem" alignItems="flex-end" h="80px">
                        <Skeleton w="90%" minH="100%" p=".5rem" bg="#eff3f6" />
                    </Flex>
                    </>
                ))
            }
        </CardBody>
        <CardFooter as={Flex} gap="1rem" alignItems="center">
        <Textarea rows="2" resize="none" />
        <Button colorScheme="blue">
            <MdSend />
        </Button>
        </CardFooter>
    </Card>
  )
}

export default ChatLoading