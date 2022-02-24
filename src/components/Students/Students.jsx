import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Flex, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Students({id, role}) {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

  return (
      <div>
          <Flex>
              <Sidebar id={id} role={role} />
              <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%' padding='2em'>
                <SimpleGrid columns={[1, null, 3]} gap={4} margin={2} padding={4} borderRadius='10px'>
                    {
                        role === 'manager' || role === 'prefect' || role ==='junior-prefect' ?
                        <></>
                        :
                        <Flex padding='2rem' as={Link} to='/students/personal-details' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                            <Text textAlign='center' fontSize={islargerthan600 ? '3xl':'2xl'}>
                                Upload Personal Details
                            </Text>
                        </Flex>
                    }
                    <Flex padding='2rem' as={Link} to='/students/marks-card-details' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                        <Text textAlign='center' fontSize={islargerthan600 ? '3xl':'2xl'}>
                            Markscard Details
                        </Text>
                    </Flex>
                    <Flex padding='2rem' as={Link} to='/students/registar' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                        <Text textAlign='center' fontSize={islargerthan600 ? '3xl':'2xl'}>
                            Registar
                        </Text>
                    </Flex>
                </SimpleGrid>
              </Flex>
          </Flex>
      </div>
  );
}

export default Students;
