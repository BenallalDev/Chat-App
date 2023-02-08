import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { ReactToMessage } from '../redux/actions/messages'
import { socket } from '../socket.io'

const Reacting = ({msgDate, username, room}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const [reactionChosen, setreactionChosen] = useState("")


  const react = (reaction) => {
    const reactions = ["angry", "sad", "fire", "laugh"];

    if(reactions.includes(reaction)) {
      setreactionChosen(reaction)
      dispatch(ReactToMessage({reaction, msgDate, username}))
        .then(res => {
          if(res.type === "messages/react/fulfilled"){
            socket.emit("react", room, reaction, msgDate)
          }
        })
      onClose()
      
    }
    else {
      Swal.fire({
        icon:"error",
        title: "Invalid Reaction"
      })
    }
    return;
  }


  return (
    <>
      {
        isOpen ? (
          <Flex mx=".5rem" gap="5px" my=".2rem" h="fit-content" borderRadius="20px" alignItems="center">
            <Image cursor="pointer" onClick={() => react("angry")} w="30px" h="30px" src="/assets/angry.png" />
            <Image cursor="pointer" onClick={() => react("sad")} w="30px" h="30px" src="/assets/sad.png" />
            <Image cursor="pointer" onClick={() => react("fire")} w="30px" h="30px" src="/assets/fire.png" />
            <Image cursor="pointer" onClick={() => react("laugh")} w="30px" h="30px" src="/assets/laugh.png" />
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