import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormLabel,
    Input,
    FormControl,
    InputGroup,
    InputRightElement,
    Spinner,
    useToast,
    Textarea,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetMessages, SearchUser, SendMessage } from '../redux/actions/messages'


export default function NewChatModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { searchLoading } = useSelector(state => state.messages)
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()
    const toast = useToast()
    const [showMessageArea, setShowMessageArea] = useState(false)
    const { messages } = useSelector(state => state.messages)
    const [message, setMessage] = useState("")
    const findUsernameInMessages = () => {
        const found = messages.filter(e => e.member1 === username || e.member2 === username)
        if(found.length === 0) return false
        return true
    }
    const search_user = () => {
        if(findUsernameInMessages(username)) {
            toast({
                title: 'Already there',
                description: "You already have a chat with this person",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return;
        } 
        dispatch(SearchUser(username))
            .then(res => {
                if(res.type === "messages/searchUser/rejected"){
                    toast({
                        title: 'No user found.',
                        description: "Can't find a user with this username",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                } else if(res.type === "messages/searchUser/fulfilled"){
                   setShowMessageArea(true) 
                }  
            })
        
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault()
            search_user()
        }
    }

    const handleInputChange = (val) => {
        setUsername(val)
        if(showMessageArea) setShowMessageArea(false)
    }

    const send_message = () => {
        dispatch(SendMessage({message, username}))
            .then(res => {
                if(res.type === "messages/sendMessage/fulfilled"){
                    toast({
                        title: 'Message sent.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    dispatch(GetMessages())
                    onClose()
                    return;
                } 
                toast({
                    title: 'Message did not get sent.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                return;
            })
    }
    return (
      <>
        <Button onClick={onOpen} leftIcon={<AddIcon  />} colorScheme='teal' variant='solid'>
            New Chat
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl >
                    <FormLabel>Username</FormLabel>
                    <InputGroup onKeyPress={handleKeyPress}>
                        <Input onChange={(e) => handleInputChange(e.target.value)} placeholder="Username" />
                        {
                            searchLoading ? <InputRightElement children={<Spinner />} /> : <InputRightElement  cursor="pointer" onClick={search_user}  children={<SearchIcon/>} />
                        }
                    </InputGroup>
                    
                    </FormControl>
                    {
                        showMessageArea ? (
                            <FormControl my="1rem">
                                <Textarea my="1rem" onChange={(e) => setMessage(e.target.value) }>

                                </Textarea>
                                <Button onClick={() => send_message()} colorScheme="blue">Send</Button>
                            </FormControl>
                        ) : null
                    }
                    
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='red' onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}