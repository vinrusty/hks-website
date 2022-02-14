import { Badge, Flex, Stack, useMediaQuery, SimpleGrid, Text, Heading, Button, useDisclosure, Input, FormLabel, useToast } from '@chakra-ui/react';
import React,{useState, useRef, useEffect} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"
import axios from 'axios';

function RationList() {
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [rationName, setRationName] = useState('')
    const [rationQuantity, setRationQuantity] = useState('')
    const [rationExp, setrationExp] = useState('')
    const [rationTags, setRationTags] = useState([])
    const [ration, setRation] = useState([])
    const cancelRef = useRef()
    const toast = useToast()

    const onAdd = () =>{
        setRationTags(prevTags=>[...prevTags, {
            name: '',
            quantity: 0,
            price: 0,
        }])   
    }
    const onChangeNum = (event) =>{
        const _tempCost = [...rationTags]
        _tempCost[event.target.dataset.id][event.target.name] = event.target.value;
        setRationTags(_tempCost)
        setrationExp(getTotalCosts())
    }
    const onClickDelete = (i) =>{
        const _tempTags = [...rationTags]
        setRationTags(_tempTags.filter((s, index)=> i !== index))
    }
    const getTotalCosts = () => {
        return rationTags.reduce((total, item) => {
          return total + Number(item.price);
        }, 0);
    }

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const data = await axios.get('http://localhost:3001/create-ration-list')
                const fetchedRation = await data.data
                setRation(fetchedRation)
            }
            catch(err){
                console.log('error')
            }
        }
        fetchData()
    },[])

    const handleRationSubmitForm = async() =>{
        const currentDate = new Date()
        try{
            const data = await axios.post('http://localhost:3001/create-ration-list', {
                date: currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear(),
                rationList: rationTags,
                rationExp: rationExp
            },{
                headers: {'Content-Type': 'application/json'}
            })
            const createdRation = await data.data
            if(createdRation.date){
                toast({
                    title: 'Added ration list successfully',
                    description: "",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
            }
            else{
                toast({
                    title: 'Could not add Ration List',
                    description: "Please try again!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
            }
        }
        catch(err){
            toast({
                title: 'Could not add Ration List',
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
              <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%' padding='2em'>
              <Heading textAlign='center' overflow='hidden'>Monthly Rations</Heading>
              <SimpleGrid columns={[1, null, 3]} gap={4} margin={2} padding={islargerthan600? '2em':''} borderRadius='10px'>
              {
                  ration && ration.map((element, index) => {
                      return(
                        <Flex key={index} as={Link} to={`/prefect/ration-list/${element.date}`} direction='column' alignItems='center' justifyContent='center' bg='#DCE1E9' height='250px' borderRadius='10px'  boxShadow='md'>
                            <Text fontSize='3xl'>
                                {element.date}
                            </Text>
                            <Stack direction='column' mt={6}>
                                <Badge colorScheme='red'>
                                    Expenditure
                                </Badge>
                                <Text textAlign='center' color='red'>
                                    {element.rationExp}
                                </Text>
                            </Stack>
                        </Flex>
                      )
                  })
              }
                
            </SimpleGrid>
            <Button onClick={onOpen} width={islargerthan600 ? '10%':'30%'} margin='20px' colorScheme='teal'>New <AddIcon marginLeft={3} h={4} w={4} /></Button>
            </Flex>
            <Drawer onClose={onClose} isOpen={isOpen} size='xl'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton/>
                <DrawerBody>
                <Flex direction='column'>
                <FormLabel mt={4}>Enter your Ration, quantity and price here:</FormLabel>
                {
                    rationTags && rationTags.map((tag, index)=>{
                        return (
                            <Flex mt={4} width="100%" key={index}>
                            <Input data-id={index} value={tag.name} onChange={onChangeNum} name='name' type='text' placeholder='Example Budget' variant='outline'></Input>
                            <Input data-id={index} value={tag.quantity} onChange={onChangeNum} name='quantity' type='text' placeholder='Example Budget' variant='outline'></Input>
                            <Input ml={1} data-id={index} value={tag.price} onChange={onChangeNum}  name='price' type='number' placeholder='' variant='outline'></Input>
                            <Button ml={2} id={index} onClick={() => onClickDelete(index)}><CloseIcon cursor='pointer' /></Button>
                            </Flex>
                        )
                    })
                }
                </Flex>
                <Flex>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} onClick={onAdd} colorScheme='blue'>Add</Button>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} colorScheme='blue' onClick={handleRationSubmitForm}>Save</Button>
                </Flex>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
          </Flex>
      </div>
  );
}

export default RationList;
