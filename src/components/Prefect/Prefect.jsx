import { Flex, Text, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';


function Prefect({id, role}) {
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
  return (
      <>
          {/* <Navbar /> */}
          <Flex>
              <Sidebar id={id} role={role} />
              <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%' padding='2em'>
              <SimpleGrid columns={[1, null, 3]} gap={4} margin={2} padding={islargerthan600? '2em':''} borderRadius='10px'>
              {
                  role === 'manager' ?
                <Flex as={Link} to='/create-prefect' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                    <Text className='text-border'  fontSize={islargerthan600 ? '2xl':'1xl'}>
                        Prefect Create User
                    </Text>
                </Flex>
                  :
                  <Flex alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                    <Text className='text-border'  fontSize={islargerthan600 ? '2xl':'1xl'}>
                        Punya Smarane list
                    </Text>
                  </Flex>
              }
                <Flex as={Link} to='/prefect/monthly-accounts' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text className='text-border'  fontSize={islargerthan600 ? '2xl':'1xl'}>
                        Prefect Monthly Accounts
                    </Text>
                </Flex>
                <Flex as={Link} to='/prefect/hostel-students' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text className='text-border' fontSize={islargerthan600 ? '2xl':'1xl'}>
                        Hostel Students
                    </Text>
                </Flex>
                <Flex as={Link} to='/prefect/ration-list' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text className='text-border'  fontSize={islargerthan600 ? '2xl':'1xl'}>
                        Ration List
                    </Text>
                </Flex>
            </SimpleGrid>
              </Flex>
          </Flex>
      </>
  );
}

export default Prefect;
