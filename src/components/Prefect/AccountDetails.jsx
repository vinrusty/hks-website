import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Flex, Text, useMediaQuery, Button, Input, FormLabel } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
  } from '@chakra-ui/react'

function AccountDetails() {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

  return (
      <div>
      <Navbar />
      <Flex>
      <Sidebar />
      <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' width='100%' padding='2rem'>
      <Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='Slno.'>Sl no.</FormLabel>
        <Input placeholder='Enter your serial no.' type='text' background='#FFF' />
      </Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='amount'>Amount</FormLabel>
        <Input placeholder='Enter amount' type='text' background='#FFF' />
      </Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='milk'>Milk</FormLabel>
        <Input placeholder='Enter expense of milk' type='text' background='#FFF' />
      </Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='vegetable'>Vegetable</FormLabel>
        <Input placeholder='Enter expense of vegetables' type='text' background='#FFF' />
      </Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='others'>Others</FormLabel>
        <Input placeholder='Enter other expenses' type='text' background='#FFF' />
      </Flex>
      </Flex>
      <Button width={islargerthan600 ? '10%':'30%'} margin='20px' colorScheme='teal'>Add</Button>
      </Flex>
      </Flex>
      </div>
  );
}

export default AccountDetails;
