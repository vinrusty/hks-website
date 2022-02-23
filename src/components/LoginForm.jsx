import { Flex, Text, Input, FormLabel, Button, useMediaQuery, useToast, useDisclosure } from '@chakra-ui/react';
import React,{ useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"

function LoginForm({url,loadUser}) {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    let navigate = useNavigate()
    const [studentname, setStudentname] = useState('')
    const [studentphone, setStudentphone] = useState('')
    const [userid, setUserid] = useState('')
    const [studentpassword, setStudentPassword] = useState('')
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleStudentPhoneChange = (event) => {
        setStudentphone(event.target.value)
    }
    const handleUseridChange = (event) => {
        setUserid(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleStudentNameChange = (event) => {
        setStudentname(event.target.value)
    }

    const handleStudentPasswordChange = (event) => {
        setStudentPassword(event.target.value)
    }
    const handleSubmitForm = async() => {
        try{
            const data = await axios.post(url+'create-user',{
                name: studentname,
                userid: userid,
                phone: studentphone,
                password: studentpassword,
                role: "student"
            },
            {
                headers: {'Content-Type':'application/json'}
            })
            const fetchedStudent = await data.data
            if(fetchedStudent.name){
                toast({
                    title: 'Added Student successfully',
                    description: "",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
            else{
                toast({
                    title: 'Could not add Student',
                    description: "Re-enter the details carefully",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch(err){
            toast({
                title: 'Could not add prefect',
                description: "Re-enter the details carefully",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleSubmitLogin = async() => {
        try{
            const data = await axios.post(url+'login',{
                         userid: name,
                         password: password
                        },
                        {
                            headers:{'Content-Type':'application/json'}
                        }
                        )
            const message = await data.data
            if(message.userid){
                loadUser(message)
                if(message.role === 'manager'){
                    navigate(`/dashboard/${message.userid}`)
                }
                else if(message.role === 'prefect'){
                    navigate(`/prefect`)
                }
                else{
                    navigate(`/students`)
                }
            }
            else{
                toast({
                    title: 'Could not login',
                    description: "Please check your name and password",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
            }
        }
        catch(err){
            toast({
                title: 'Could not login',
                description: "Please check your name and password",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            loadUser(foundUser)
            navigate(`dashboard/${foundUser.userid}`)
        }
    },[])



    return (
        <div class='login-wrapper'>
        <Flex direction='column' padding='2em' alignItems='center' justifyContent='center'>
            <Flex alignItems='center' justifyContent='center' padding="1em">
                <img src='/images/logo.png' alt='logo' style={{width: "50%"}} />
            </Flex>
            <Flex direction='column' alignItems='center' justifyContent='center' width={islargerthan600 ? '30%':'100%'} background='#FFF' padding='2em' borderRadius='30px'>
                <Text fontSize='4xl'>Login</Text>
                <Flex direction='column' width='100%' marginTop='50px'>
                    <FormLabel htmlFor='name'>User ID</FormLabel>
                    <Input placeholder='Enter your User ID' type='text' variant='filled' onChange={handleNameChange} />
                </Flex>
                <Flex direction='column' width='100%' marginTop='10px'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input placeholder='password' type='password' variant='filled' onChange={handlePasswordChange} />
                </Flex>
                <Button marginTop='20px' width='50%' colorScheme='blue' onClick={handleSubmitLogin}>Login</Button>
                <Text mt={3}>Not yet Registered?</Text>
                <Button mt={1} colorScheme='pink' onClick={onOpen}>Create a student account</Button>
            </Flex>

        </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Prefect</ModalHeader>
                        <ModalCloseButton />
                            <ModalBody>
                            <Flex direction='column'>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                    <Input onChange={handleStudentNameChange} name='name' id='name' type='text' variant='outline' placeholder='Enter Student Name' mt={1}></Input>
                                <FormLabel htmlFor='phone-no'>Phone </FormLabel>
                                    <Input onChange={handleStudentPhoneChange} name='phone-no' id='phone-no' type='text' variant='outline' placeholder='Enter Prefect Phone No.' mt={2}></Input>
                                <FormLabel htmlFor='user-id'>User ID </FormLabel>
                                    <Input onChange={handleUseridChange} name='user-id' id='user-id' type='text' variant='outline' placeholder='Enter Prefect User ID' mt={2}></Input>
                                <FormLabel htmlFor='password'>Password </FormLabel>
                                    <Input onChange={handleStudentPasswordChange} name='password' id='password' type='password' variant='outline' placeholder='Password' mt={2}></Input>
                            </Flex>
                            </ModalBody>
                        <ModalFooter>
                        
                        <Flex justifyContent='center' width='100%'>
                            <Button colorScheme="blue" mr={3} width={islargerthan600?'50%':'100%'} onClick={handleSubmitForm}>Register</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    ); 
      
}

export default LoginForm;
