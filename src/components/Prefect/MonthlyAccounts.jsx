import React, {useState, useRef} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Button, Flex, Text, useMediaQuery, useDisclosure, FormLabel, Input, SimpleGrid, Stack, Badge } from '@chakra-ui/react';
import {Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

function MonthlyAccounts() {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [Open , setOpen] = useState(false)
    const cancelRef = useRef()

    const onClosing = () => setOpen(false)

  return (
      <div>
      <Navbar />
      <Flex>
      <Sidebar />
      <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%'>
      <SimpleGrid columns={[1, null, 3]} gap={4} margin={2} padding={islargerthan600? '2em':''} borderRadius='10px'>
      <Flex as={Link} to='/prefect/monthly-accounts/year-month' direction='column' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
        <Text fontSize='3xl'>
            Prefect Name
        </Text>
        <Text fontSize='3xl'>
            Month
        </Text>
        <Stack direction='column' mt={6}>
            <Badge colorScheme='red'>
                Expenditure
            </Badge>
            <Text textAlign='center' color='red'>
                0000
            </Text>
        </Stack>
      </Flex>
      </SimpleGrid>
      <Button width={islargerthan600 ? '10%':'30%'} margin='20px' colorScheme='teal' onClick={() => setOpen(true)}>Create</Button>  
      </Flex>
      <AlertDialog
            isOpen={Open}
            leastDestructiveRef={cancelRef}
            onClose={onClosing}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Create account
                </AlertDialogHeader>

                <AlertDialogBody>
                <Flex direction='column' width='100%' margin='2px' mt={3}>
                    <FormLabel htmlFor='pname'>Prefect Name</FormLabel>
                    <Input placeholder='Enter Prefect name' type='text' background='#FFF' />
                </Flex>
                <Flex direction='column' width='100%' margin='2px' mt={3}>
                    <FormLabel htmlFor='pname'>Phone Number</FormLabel>
                    <Input placeholder='Enter Prefect name' type='text' background='#FFF' />
                </Flex>
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClosing}>
                    Cancel
                </Button>
                <Button colorScheme="blue" ml={3}>
                    Create
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
      </div>
  );
}

export default MonthlyAccounts;
