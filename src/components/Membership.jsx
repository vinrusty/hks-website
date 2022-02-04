import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Membership() {
  return (
      <>
      <Navbar />
      <Flex>
          <Sidebar />
          <div className='dashboard-wrapper'>
            <SimpleGrid columns={[2, null, 3]} gap={4} margin={2} padding={4} borderRadius='10px'>
                <Flex as={Link} to='/register' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                    <Text fontSize='3xl'>
                        Regsiter for membership
                    </Text>
                </Flex>
                <Flex alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text fontSize='3xl'>
                        List of members
                    </Text>
                </Flex>
                <Flex alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text fontSize='3xl'>
                        Punya smarane list
                    </Text>
                </Flex>
            </SimpleGrid>
          </div>
      </Flex>
      </>
  );
}

export default Membership;
