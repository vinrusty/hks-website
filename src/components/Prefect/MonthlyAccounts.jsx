import React, {useState, useEffect, useRef} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Button, Flex, Text, useMediaQuery, FormLabel, Input, SimpleGrid, Stack, Badge, useToast } from '@chakra-ui/react';
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay} from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import axios from 'axios';

function MonthlyAccounts() {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [Open , setOpen] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [month, setMonth] = useState('')
    const [accounts, setAccounts] = useState([])
    const cancelRef = useRef()
    const toast = useToast()

    useEffect(() => {
        const fetchData = async() => {
            try{
                const data = await axios.get('http://localhost:3001/prefect-account')
                const fetchedAccount = await data.data
                setAccounts(fetchedAccount)
            }
            catch(err){

            }
        }
        fetchData()
    })

    const onClosing = () => setOpen(false)

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }
    const handleMonthChange = (event) => {
        setMonth(event.target.value)
    }

    const handleSubmitForm = async() => {
        const date = new Date()
        try{
            const data = await axios.post('http://localhost:3001/prefect-account',{
                name: name,
                phone: phone,
                month: month + "-" + date.getFullYear()
            },
            {
                headers: {'Content-Type': 'application/json'}
            }
            )
            const fetchedData = await data.data
            if(fetchedData.month){
                toast({
                    title: 'Created an account',
                    description: "You can document your expenses here",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
            }
            else{
                toast({
                    title: 'Could not create an account',
                    description: "Please try again!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch(err){
            toast({
                title: 'Could not create an account',
                description: "Please try again!",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

  return (
      <div>
      <Navbar />
      <Flex>
      <Sidebar />
      <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%'>
      <SimpleGrid columns={[1, null, 3]} gap={4} margin={2} padding={islargerthan600? '2em':''} borderRadius='10px'>
      {
          accounts && accounts.map((account, index) => {
            return(
            <Flex key={index} as={Link} to={`/prefect/monthly-accounts/${account.month}`} direction='column' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                <Text fontSize='3xl'>
                    {account.name}
                </Text>
                <Text fontSize='3xl'>
                    {account.month}
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
            )
          })
      }
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
                    <Input placeholder='Enter Prefect name' onChange={handleNameChange} type='text' background='#FFF' />
                </Flex>
                <Flex direction='column' width='100%' margin='2px' mt={3}>
                    <FormLabel htmlFor='pname'>Phone Number</FormLabel>
                    <Input placeholder='Enter Prefect name' onChange={handlePhoneChange} type='text' background='#FFF' />
                </Flex>
                <Flex direction='column' width='100%' margin='2px' mt={3}>
                    <FormLabel htmlFor='pname'>Month</FormLabel>
                    <Input placeholder='Enter month' type='text' onChange={handleMonthChange} background='#FFF' />
                </Flex>
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClosing}>
                    Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleSubmitForm} ml={3}>
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
