import { Button, Flex, useDisclosure, Input, FormLabel, useMediaQuery, useToast } from '@chakra-ui/react';
import React,{useState} from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from '@chakra-ui/react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import axios from 'axios';

function CreateUser({url}) {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [userid, setUserid] = useState('')
    const [password, setPassword] = useState('')
    const [prefect, setPrefect] = useState({})
    const toast = useToast()

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }
    const handleUseridChange = (event) => {
        setUserid(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmitForm = async() => {
        try{
            const data = await axios.post(url+'create-user',{
                name: name,
                userid: userid,
                phone: phone,
                password: password,
                role: "prefect"
            },
            {
                headers: {'Content-Type':'application/json'}
            })
            const fetchedPrefect = await data.data
            if(fetchedPrefect.name){
                setPrefect(fetchedPrefect)
                toast({
                    title: 'Added Prefect successfully',
                    description: "",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
            else{
                toast({
                    title: 'Could not add prefect',
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

  return (
      <>
      <Navbar />
      <Flex>
          <Sidebar />
          <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%'>
          <Table variant='simple' size={islargerthan600 ? 'md':'sm'}>
            <TableCaption>Prefect Information</TableCaption>
            <Thead>
                <Tr>
                <Th>Month</Th>
                <Th>Name</Th>
                <Th>Phone no.</Th>
                <Th>User ID</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Feb</Td>
                    <Td>{prefect.name}</Td>
                    <Td>{prefect.phone}</Td>
                    <Td>{prefect.userid}</Td>
                </Tr>
            </Tbody>
          </Table>
          <Button onClick={onOpen} width={islargerthan600?'20%':'100%'} colorScheme='pink'>Add</Button>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Prefect</ModalHeader>
                   <ModalCloseButton />
                    <ModalBody>
                    <Flex direction='column'>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input onChange={handleNameChange} name='name' id='name' type='text' variant='outline' placeholder='Enter Prefect Name' mt={1}></Input>
                        <FormLabel htmlFor='phone-no'>Phone </FormLabel>
                            <Input onChange={handlePhoneChange} name='phone-no' id='phone-no' type='text' variant='outline' placeholder='Enter Prefect Phone No.' mt={2}></Input>
                        <FormLabel htmlFor='user-id'>User ID </FormLabel>
                            <Input onChange={handleUseridChange} name='user-id' id='user-id' type='text' variant='outline' placeholder='Enter Prefect User ID' mt={2}></Input>
                        <FormLabel htmlFor='password'>Password </FormLabel>
                            <Input onChange={handlePasswordChange} name='password' id='password' type='password' variant='outline' placeholder='Password' mt={2}></Input>
                    </Flex>
                    </ModalBody>
                <ModalFooter>
                
                <Flex justifyContent='center' width='100%'>
                    <Button colorScheme="blue" mr={3} width={islargerthan600?'50%':'100%'} onClick={handleSubmitForm}>Register</Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
      </Modal>

      </Flex>
      </>
  );
}

export default CreateUser;
