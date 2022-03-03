import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Button, useMediaQuery } from '@chakra-ui/react'

function Sidebar({id, role}) {

  const [islargerthan600] = useMediaQuery("(min-width: 600px)")

  return (
    <>
    {
      islargerthan600 ?

    <Box textAlign='center' width="250px" bgGradient='linear(to-l, #7928CA, #FF0080)' height='90%' position="fixed" m={1} borderRadius={10} boxShadow='lg'>
         <Flex direction='column' alignItems='center' height="90%" marginTop='2em'>
            <Flex alignItems='center' justifyContent='center' overflow='hidden'>
                <img src='/images/logo.png' alt='sangha logo' style={{width:"70%"}} />
            </Flex>
            {
              role === 'manager' ?
              <>
              <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' to={`/dashboard/${id}`} mt={6}  height="50px" cursor='pointer'  width="95%" borderRadius={5}>
              <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Membership</Text>
              </Box>
              <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' mt={2} to='/prefect' height='50px' cursor='pointer'  width="95%" borderRadius={5}>
              <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Prefect</Text>
              </Box>
              <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' to='/students' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
              <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Students</Text>
              </Box>
              <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' to='/junior-prefect' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
              <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Junior Prefect</Text>
              </Box>
              </>
              :
              (
                role === 'prefect' ? 
                <>
                <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' mt={2} to='/prefect' height='50px' cursor='pointer'  width="95%" borderRadius={5}>
                <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Prefect</Text>
                </Box>
                <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' to='/students' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
                <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Students</Text>
                </Box>
                <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' to='/junior-prefect' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
                <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Junior Prefect</Text>
                </Box>
                </>
                :
               <>
                <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' to='/students' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
                <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Students</Text>
                </Box>
                <Box className='sidebar-box' as={NavLink} activeClassName='sidebar-active' to='/junior-prefect' height='50px' cursor='pointer' mt={2} width="95%"  borderRadius={5}>
                <Text m={2} fontSize='xl' fontWeight='bold' color='#FFF'>Junior Prefect</Text>
                </Box>
               </>
              )
            }
            
        </Flex>
    </Box>
    :
    <div></div>
    }

    </>
    
  );
}

export default Sidebar;
