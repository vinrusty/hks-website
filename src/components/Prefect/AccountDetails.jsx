import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
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
      <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' alignItems='center' width='100%'>
        <Table variant='simple' size={islargerthan600 ? 'md':'sm'}>
        <TableCaption>Hoysala karnataka Members</TableCaption>
        <Thead>
            <Tr>
            <Th>Amount</Th>
            <Th>Expense</Th>
            </Tr>
        </Thead>
        <Tbody>
        <Tr>

        </Tr>
        </Tbody>
        </Table>
        </Flex>
      </Flex>
      </div>
  );
}

export default AccountDetails;
