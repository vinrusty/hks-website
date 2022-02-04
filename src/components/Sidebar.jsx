import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Button } from '@chakra-ui/react'

function Sidebar() {
  return (
    <Box width="250px" bgGradient='linear(to-l, #7928CA, #FF0080)' height="99vh" position="fixed" m={1} borderRadius={10} boxShadow='lg'>
        <Flex direction='column' alignItems='center' height="75%" marginTop='2em'>
            <Box as={NavLink} activeClassName='nav-active' to='/membership' mt={6}  height="50px" cursor='pointer'  width="95%" borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Membership</Text>
            </Box>
            <Box as={NavLink} mt={2} activeClassName='nav-active' to='/m1' height='50px' cursor='pointer'  width="95%" borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>M1</Text>
            </Box>
            <Box as={NavLink} activeClassName='nav-active' to='/m2' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>M2</Text>
            </Box>
            <Box as={NavLink} activeClassName='nav-active' to='/m3' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>M3</Text>
            </Box>
            <Flex mt={4}>
            <Button as={NavLink} to='/' m={1} width='100px' colorScheme='blue'>Sign Out</Button>
            </Flex>
            <Flex mt='auto' alignItems='center' justifyContent='center'>
                <img src='/images/logo.png' alt='sangha logo' style={{width:"70%"}} />
            </Flex>
        </Flex>
    </Box>
  );
}

export default Sidebar;
