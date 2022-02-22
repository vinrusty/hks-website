import {  Box, Flex, Text, useMediaQuery, useDisclosure, Button } from '@chakra-ui/react';
import React,{ useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"
import axios from 'axios';

function Navbar({url,user, loadUser}) {

    const [islargerthan600] = useMediaQuery('(min-width:600px)')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try{
            const res = axios.delete(url+'logout',{token: user.refreshToken})
            const message = await res.data
            loadUser({})
            navigate('/')
        }
        catch(err){
            console.log(err)
        }
        localStorage.clear();
    }

  return (
      <>
      {
          user.role !== undefined ?
        <div>
            <Flex width='100%' height='60px' bgGradient='linear(to-l, #7928CA, #FF0080)' alignItems='center' justifyContent='center' padding='2em' overflowY='hidden'>
                <img src='/images/logo.png' alt='sangha logo' style={{width:'60px'}} />
                <Flex marginLeft='auto' alignItems='center'>
                <Box as={NavLink} to='/dashboard'>
                    <Text fontSize={islargerthan600 ? 'xl':'1em'} m={3} color='white'>Home</Text>
                </Box>
                <Box>
                    <Button onClick={handleLogout} colorScheme='blue' fontSize={islargerthan600 ? 'xl':'1em'} m={3} color='white'>Sign Out</Button>
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
                <Flex direction='column' alignItems='center' height='100%' textAlign='center'>
                    {
                        user.role === 'manager' ?
                        <Box as={NavLink} to={`/dashboard/${user.userid}`} mt={6} height="50px" cursor='pointer' onClick={onClose} width="100%">
                        <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Membership</Text>
                        </Box>
                        :
                        <></>
                    }
                    {
                        user.role === 'prefect' || user.role === 'manager' ? 
                        <Box as={NavLink} to='/prefect' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%">
                        <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Prefect</Text>
                        </Box>
                        :
                        <></>
                    }
                    <Box as={NavLink} to='/students' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%">
                    <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Student</Text>
                    </Box>
                    <Box as={NavLink} to='/junior-prefect' mt={6}  height="50px" cursor='pointer' onClick={onClose} width="100%">
                    <Text fontSize='3xl' color='#FFF' fontWeight='bold' >Junior Prefect</Text>
                    </Box>
                </Flex>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
        :
        <></>
      }
      </>
  );
}

export default Navbar;
