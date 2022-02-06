import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Button, useMediaQuery } from '@chakra-ui/react'

function Sidebar() {

  const [islargerthan600] = useMediaQuery("(min-width: 600px)")

  return (
    <>
    {
      islargerthan600 ?

    <Box textAlign='center' width="250px" bgGradient='linear(to-l, #7928CA, #FF0080)' height='90%' position="fixed" m={1} borderRadius={10} boxShadow='lg'>
         <Flex direction='column' alignItems='center' height="75%" marginTop='2em'>
            <Flex mt='auto' alignItems='center' justifyContent='center'>
                <img src='/images/logo.png' alt='sangha logo' style={{width:"70%"}} />
            </Flex>
            
            <Box as={NavLink} activeClassName='nav-active' to='/dashboard' mt={6}  height="50px" cursor='pointer'  width="95%" borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Membership</Text>
            </Box>
            <Box as={NavLink} mt={2} to='/prefect' activeClassName='nav-active' height='50px' cursor='pointer'  width="95%" borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Prefect</Text>
            </Box>
            <Box as={NavLink} activeClassName='nav-active' to='/students' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Students</Text>
            </Box>
            <Box as={NavLink} activeClassName='nav-active' to='/accounts' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
            <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Accounts</Text>
            </Box>
            <Flex mt={4} width='100%' mt='auto' alignItems='center' justifyContent='center'>
            <Button as={NavLink} to='/' m={1} width='100px' colorScheme='blue' width='80%'>Sign Out</Button>
            </Flex>
            
        </Flex>
    </Box>
    :
    <div></div>
    }

    </>
    
  );
}

export default Sidebar;
