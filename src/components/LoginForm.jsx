import { VStack, Flex, Text, Input, FormLabel, Button, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function LoginForm() {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

    return (
        <div class='login-wrapper'>
        <Flex direction='column' padding='2em' alignItems='center' justifyContent='center'>
            <Flex alignItems='center' justifyContent='center' padding="1em">
                <img src='/images/logo.png' alt='logo' style={{width: "50%"}} />
            </Flex>
            <Flex direction='column' alignItems='center' justifyContent='center' width={islargerthan600 ? '30%':'100%'} background='#FFF' padding='2em' borderRadius='30px'>
                <Text fontSize='4xl'>Login</Text>
                <Flex direction='column' width='100%' marginTop='50px'>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input placeholder='xyz@example.com' type='email' variant='filled' />
                </Flex>
                <Flex direction='column' width='100%' marginTop='10px'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input placeholder='password' type='password' variant='filled' />
                </Flex>
                <Button as={NavLink} to='/dashboard' marginTop='20px' width='50%' colorScheme='blue'>Login</Button>
            </Flex>
        </Flex>
        </div>
    ); 
      
}

export default LoginForm;
