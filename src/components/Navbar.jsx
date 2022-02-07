import {  Box, Flex, Text, useMediaQuery, useDisclosure, Heading } from '@chakra-ui/react';
import React,{ useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"

function Navbar() {

    const [islargerthan600] = useMediaQuery('(min-width:600px)')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

  return (
  <div>
    <Flex width='100%' height='60px' bgGradient='linear(to-l, #7928CA, #FF0080)' alignItems='center' justifyContent='center' padding='2em' overflowY='hidden'>
        <img src='/images/logo.png' alt='sangha logo' style={{width:'60px'}} />
        <Flex marginLeft='auto'>
        <Box as={NavLink} to='/dashboard'>
            <Text fontSize={islargerthan600 ? 'xl':'1em'} m={3} color='white'>Home</Text>
        </Box>
        <Box as={NavLink} to='/'>
            <Text fontSize={islargerthan600 ? 'xl':'1em'} m={3} color='white'>Sign Out</Text>
        </Box>
        {
            islargerthan600 ?
            <div></div>
            :
            <Box width='40px'>
                <Flex justifyContent='center' alignItems='center' height='100%'>
                <HamburgerIcon color='white' w={6} h={6} onClick={onOpen} />
                </Flex>
            </Box>
        }
        </Flex>
    </Flex>
    <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        
        >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody bgGradient='linear(to-l, #7928CA, #FF0080)'>
        <Flex direction='column' alignItems='center' justifyContent='center' marginTop='50px'>
        <img src='/images/logo.png' alt='sangha logo' style={{width:"70%"}} />
        </Flex>
        <Flex direction='column' alignItems='center' height='30%' textAlign='center'>
            <Box as={NavLink} to='/dashboard' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%">
            <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Membership</Text>
            </Box>
            <Box as={NavLink} to='/prefect' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%">
            <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Prefect</Text>
            </Box>
            <Box as={NavLink} to='/students' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%">
            <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Student</Text>
            </Box>
            <Box as={NavLink} to='/accounts' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%">
            <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Accounts</Text>
            </Box>
        </Flex>
        </DrawerBody>
        </DrawerContent>
    </Drawer>
  </div>
  );
}

export default Navbar;
