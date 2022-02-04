import { Flex, Text, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function Prefect() {
  return (
      <>
          <Navbar />
          <Flex>
              <Sidebar />
              <Flex marginLeft='260px' direction='column' justifyContent='center' width='100%' padding='2em'>
              {/* <Table variant='simple'>
                <TableCaption>Prefect Information</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Name</Th>
                    <Th>Phone no.</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
              </Table> */}
              <SimpleGrid columns={[2, null, 3]} gap={4} margin={2} padding={4} borderRadius='10px'>
                <Flex as={Link} to='/create-prefect' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                    <Text fontSize='3xl'>
                        Prefect<br />
                        Create User
                    </Text>
                </Flex>
                <Flex as={Link} to='/' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text fontSize='3xl'>
                        Prefect<br/>
                        Monthly Accounts
                    </Text>
                </Flex>
                <Flex alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text fontSize='3xl'>
                        Hostel Students
                    </Text>
                </Flex>
            </SimpleGrid>
              </Flex>
          </Flex>
      </>
  );
}

export default Prefect;
