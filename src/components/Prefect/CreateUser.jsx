import { Button, Flex, useDisclosure, Input, FormLabel } from '@chakra-ui/react';
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

  return (
      <>
      <Navbar />
      <Flex>
          <Sidebar />
          <Flex marginLeft='260px' direction='column' justifyContent='center' width='100%' padding='2em'>
          <Table variant='simple'>
            <TableCaption>Prefect Information</TableCaption>
            <Thead>
                <Tr>
                <Th>Month</Th>
                <Th>Name</Th>
                <Th>Phone no.</Th>
                <Th>User ID</Th>
                <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                
            </Tbody>
          </Table>
          <Button onClick={onOpen} width='20%' colorScheme='pink'>Add</Button>
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
                    <Button colorScheme="blue" mr={3} width='50%'>Register</Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
      </Modal>
          </Flex>

      </Flex>
      </>
  );
}

export default CreateUser;
