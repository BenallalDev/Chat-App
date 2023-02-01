import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FiHeart } from "react-icons/fi"

import { BsEmojiAngry, BsEmojiLaughing } from  "react-icons/bs"
import { TfiFaceSad } from "react-icons/tfi"
const Reacting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex onClick={() => isOpen ? onClose() : onOpen()} m=".5rem" bg="blackAlpha.50" cursor="pointer" w="30px" h="20px" borderRadius="10px" justifyContent="center" gap="2px" alignItems="center">
        <Box h="5px" w="5px" bg="blackAlpha.400" borderRadius="50%"></Box>
        <Box h="5px" w="5px" bg="blackAlpha.400" borderRadius="50%"></Box>
        <Box h="5px" w="5px" bg="blackAlpha.400" borderRadius="50%"></Box>
      </Flex>
      {
        isOpen ? (
          <Flex bg="blackAlpha.50" gap="5px" p='10px' h="fit-content" borderRadius="20px">
            <FiHeart cursor="pointer" />
            <BsEmojiLaughing cursor="pointer" />
            <BsEmojiAngry cursor="pointer" />
            <TfiFaceSad cursor="pointer" />
          </Flex>
        ) : null
      }
    </>
    
  )
}

export default Reacting