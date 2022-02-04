import { Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './Sidebar';

function Membership() {
  return (
      <Flex>
          <Sidebar />
          <div className='dashboard-wrapper'>
            <SimpleGrid columns={[2, null, 3]} gap={4} background='#E5E7E6' margin={2} padding={4} height='50vh' borderRadius='10px'>
                <Flex alignItems='center' justifyContent='center' bg='#B7B5B3' height='200px' borderRadius='10px'>
                    Regsiter for membership
                </Flex>
                <Flex alignItems='center' justifyContent='center' bg='#B7B5B3' height='200px' borderRadius='10px'>
                    List of Members
                </Flex>
                <Flex alignItems='center' justifyContent='center' bg='#B7B5B3' height='200px' borderRadius='10px'>
                    Punya smarane List
                </Flex>
            </SimpleGrid>
          </div>
      </Flex>
  );
}

export default Membership;
