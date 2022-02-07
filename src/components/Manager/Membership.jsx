import { Flex, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import React,{useEffect} from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Membership() {
  
  const [islargerthan600] = useMediaQuery('(min-width: 600px)')

  useEffect(() => {
      const fetchUser = async() => {
        try{
            const data = await axios.get('http://localhost:3001/dashboard')
            console.log(data)
            const fetchedUser = await data.data
            console.log(fetchedUser)
        }
        catch(err){

        }
      }
      fetchUser()
  },[])
  
  return (
      <>
      <Navbar />
      <Flex>
          <Sidebar />
          <div className='dashboard-wrapper'>
            <SimpleGrid columns={[1, null, 3]} gap={4} margin={2} padding={4} borderRadius='10px'>
                <Flex as={Link} to='/register' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                    <Text fontSize={islargerthan600 ? '3xl':'2xl'}>
                        Regsiter for membership
                    </Text>
                </Flex>
                <Flex as={Link} to='/list-of-members' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text fontSize={islargerthan600 ? '3xl':'2xl'}>
                        List of members
                    </Text>
                </Flex>
                <Flex alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px' boxShadow='md'>
                    <Text fontSize={islargerthan600 ? '3xl':'2xl'}>
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
