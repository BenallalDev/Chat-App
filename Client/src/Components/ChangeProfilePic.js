import React, { useEffect, useState } from 'react'
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
    Input
} from '@chakra-ui/react'
import { createAvatar} from "@dicebear/core"
import { adventurer } from "@dicebear/collection"
import { useDispatch } from 'react-redux'
import { ChangeProfilePic } from '../redux/actions/auth'
import { EditIcon } from '@chakra-ui/icons'

const ChangeProfilePictureComp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [avatar, setAvatar] = useState("")
    const [seed, setSeed] = useState(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    const [avatarBg, setAvatarBg] = useState("")
    const dispatch = useDispatch()
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const generateAvatar = () => {
        
        setSeed(seed => {
            const randomSeed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            const randomBg = getRandomColor()
            const generatedAvatar = createAvatar(adventurer, {seed:randomSeed, size: 96, radius: 50,  backgroundColor:[randomBg]}).toDataUriSync()
            setAvatar(generatedAvatar)
            setAvatarBg(randomBg)
            return randomSeed
        })
    }

    useEffect(() => {
      generateAvatar()
    }, [])

    const change_profile_pic = () => {
        dispatch(ChangeProfilePic(`https://api.dicebear.com/5.x/adventurer/svg?seed=${seed}&backgroundColor=${avatarBg}`))
            .then(res => onClose())
    }
    
    
    return (
        <>
            
            <EditIcon position="absolute" top="1rem" right="1rem" onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Select an avatar</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Flex} flexDirection="column" alignItems="center" gap="1rem">

                <Image minW="90%" maxW="90%" bgSize="cover" src={avatar} />
                
                <Image w="50px" cursor="pointer" onClick={() => generateAvatar()} src="/assets/shuffle.png" />  
                   
                <Button colorScheme="red" onClick={change_profile_pic} >Select</Button>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ChangeProfilePictureComp