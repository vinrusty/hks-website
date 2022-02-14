import { Flex, Text, Input, FormLabel, Button, useMediaQuery, useToast } from '@chakra-ui/react';
import React,{ useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    let navigate = useNavigate()

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    // const handleSubmitLogin = async() => {
    //     try{
    //         const data = await axios.post('http://localhost:3001/login',{
    //                      userid: name,
    //                      password: password
    //                     },
    //                     {
    //                         headers:{'Content-Type':'application/json'}
    //                     }
    //                     )
    //         const message = await data.data
    //         if(message){
    //             navigate(`/dashboard`)
    //         }
    //         else{
    //             toast({
    //                 title: 'Could not login',
    //                 description: "Please check your name and password",
    //                 status: 'error',
    //                 duration: 3000,
    //                 isClosable: true,
    //               })
    //         }
    //     }
    //     catch(err){
    //         toast({
    //             title: 'Could not login',
    //             description: "Please check your name and password",
    //             status: 'error',
    //             duration: 3000,
    //             isClosable: true,
    //           })
    //     }
    // }


    return (
        <div class='login-wrapper'>
        <Flex direction='column' padding='2em' alignItems='center' justifyContent='center'>
            <Flex alignItems='center' justifyContent='center' padding="1em">
                <img src='/images/logo.png' alt='logo' style={{width: "50%"}} />
            </Flex>
            <Flex direction='column' alignItems='center' justifyContent='center' width={islargerthan600 ? '30%':'100%'} background='#FFF' padding='2em' borderRadius='30px'>
                <Text fontSize='4xl'>Login</Text>
                <Flex direction='column' width='100%' marginTop='50px'>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input placeholder='Enter your name' type='text' variant='filled' onChange={handleNameChange} />
                </Flex>
                <Flex direction='column' width='100%' marginTop='10px'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input placeholder='password' type='password' variant='filled' onChange={handlePasswordChange} />
                </Flex>
                <Button as={NavLink} to='/dashboard' marginTop='20px' width='50%' colorScheme='blue'>Login</Button>
            </Flex>
        </Flex>
        </div>
    ); 
      
}

export default LoginForm;
