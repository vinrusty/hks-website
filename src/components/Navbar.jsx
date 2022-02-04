import {  Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
  <div>
    <Flex width='100%' height='60px' bgGradient='linear(to-l, #7928CA, #FF0080)' alignItems='center' justifyContent='center' padding='2em'>
        <Flex padding='2em'>
            <Text color='white' fontSize='1.5rem'>Hoysala Karnataka Sangha</Text>
        </Flex>
        <Flex marginLeft='auto'>
        <Box as={NavLink} to='/membership'>
            <Text fontSize='xl' m={3} color='white'>Home</Text>
        </Box>
        <Box as={NavLink} to='/register'>
            <Text fontSize='xl' m={3} color='white'>Register</Text>
        </Box>
        <Box as={NavLink} to='/'>
            <Text fontSize='xl' m={3} color='white'>Sign Out</Text>
        </Box>
        </Flex>
    </Flex>
  </div>
  );
}

export default Navbar;
