import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const Reacting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {
        isOpen ? (
          <Flex gap="5px" my=".2rem" h="fit-content" borderRadius="20px" alignItems="center">
            <Image cursor="pointer" w="30px" h="30px" src="/assets/angry.png" />
            <Image cursor="pointer" w="30px" h="30px" src="/assets/sad.png" />
            <Image cursor="pointer" w="30px" h="30px" src="/assets/atouchia.png" />
            <Image cursor="pointer" w="30px" h="30px" src="/assets/laugh.png" />
            <CloseIcon onClick={onClose} cursor="pointer" mx=".3rem" w="10px" h="10px" />
          </Flex>
        ) : (
          <Flex mx="1rem" onClick={() => isOpen ? onClose() : onOpen()} m=".5rem" bg="blackAlpha.50" cursor="pointer" w="30px" h="20px" borderRadius="10px" justifyContent="center" gap="2px" alignItems="center">
            <Box h="5px" w="5px" bg="blackAlpha.400" borderRadius="50%"></Box>
            <Box h="5px" w="5px" bg="blackAlpha.400" borderRadius="50%"></Box>
            <Box h="5px" w="5px" bg="blackAlpha.400" borderRadius="50%"></Box>
            
          </Flex>
        )
      }
    </>
    
  )
}


export default Reacting