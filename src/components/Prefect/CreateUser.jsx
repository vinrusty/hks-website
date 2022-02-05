import { Button, Flex, useDisclosure, Input, FormLabel, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
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

function CreateUser() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

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
                            <Input name='name' id='name' type='name' variant='outline' placeholder='Enter Prefect Name' mt={1}></Input>
                        <FormLabel htmlFor='phone-no'>Phone </FormLabel>
                            <Input name='phone-no' id='phone-no' type='text' variant='outline' placeholder='Enter Prefect Phone No.' mt={2}></Input>
                        <FormLabel htmlFor='user-id'>User ID </FormLabel>
                            <Input name='user-id' id='user-id' type='text' variant='outline' placeholder='Enter Prefect User ID' mt={2}></Input>
                        <FormLabel htmlFor='password'>Password </FormLabel>
                            <Input name='password' id='password' type='text' variant='outline' placeholder='Password' mt={2}></Input>
                    </Flex>
                    </ModalBody>
                <ModalFooter>
                
                <Flex justifyContent='center' width='100%'>
                    <Button colorScheme="blue" mr={3} width={islargerthan600?'50%':'100%'}>Register</Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
      </Modal>

      </Flex>
      </>
  );
}

export default CreateUser;
