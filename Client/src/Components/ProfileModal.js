import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Image,
    Flex,
    Text
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../redux/actions/auth'
import ChangeProfilePic from "../Components/ChangeProfilePic"

const ProfileModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const { profilePic, username } = useSelector(state => state.auth)
    
    return (
        <>
            <Button colorScheme="red" onClick={onOpen}>Profile</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody position="relative" as={Flex} flexDirection="column" alignItems="center" gap="1rem">

                <Image minW="90%" maxW="90%" bgSize="cover" src={profilePic} borderRadius="50%" />
                <ChangeProfilePic />
                
                <Text>{username}</Text>
            </ModalBody>

            <ModalFooter>
            <Button mx="1rem" colorScheme="red" onClick={() => dispatch(Logout())} w="100px">Logout</Button>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
        
    )
}

export default ProfileModal