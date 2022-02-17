import { Flex, Text, SimpleGrid, useMediaQuery, Heading, Badge, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

function JuniorPrefect({id, role}) {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

  return (
    <div>
        {/* <Navbar /> */}
        <Flex>
            <Sidebar id={id} role={role} />
            <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%' padding='2em'>
              <Heading textAlign='center' overflow='hidden'>Junior Prefect</Heading>
              <SimpleGrid columns={[1, null, 3]} gap={4} margin={2} padding={islargerthan600? '2em':''} borderRadius='10px'>
                <Flex as={Link} to='/junior-prefect/daily-accounts' direction='column' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                    <Text fontSize='3xl'>
                        Daily Accounts
                    </Text>
                    <Stack direction='column' mt={6}>
                        <Badge colorScheme='red'>
                            Expenditure
                        </Badge>
                        <Text textAlign='center' color='red'>
                            25000
                        </Text>
                    </Stack>
                </Flex>
            </SimpleGrid>
            </Flex>
        </Flex>
    </div>
  )
}

export default JuniorPrefect