import { VStack, Flex, Text, Input, FormLabel, Button, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

function LoginForm() {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

    return (
        <div style={{background:"linear-gradient(45deg, blue, purple, skyblue"}}>
        <VStack padding='2em'>
            <Flex alignItems='center' justifyContent='center' padding="2em">
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
                <Button marginTop='20px' width='50%' colorScheme='blue'>Login</Button>
            </Flex>
        </VStack>
        </div>
    ); 
      
}

export default LoginForm;
