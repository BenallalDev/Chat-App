import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const MessagesLoading = () => {
    const arr = new Array(7).fill("{}")
  return (
    <Flex w="full" flexDirection="column">
        {
            arr.map((e, index) => <Skeleton key={index} maxW="3xl" my="1rem" h="76px" />)
        }
    </Flex>
  )
}

export default MessagesLoading