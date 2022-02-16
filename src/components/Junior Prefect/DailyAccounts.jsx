import { Flex, useMediaQuery, useDisclosure, Button, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import {Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import React,{ useState, useRef } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import axios from 'axios'

function DailyAccounts({url}) {
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [vegetableExp, setvegetableExp] = useState('')
    const [vegetableTags, setvegetableTags] = useState([])
    const [milk, setMilk] = useState('')
    const [milkPrice, setMilkPrice] = useState('')
    const [person, setPerson] = useState('')
    const [punyaTags, setpunyaTags] = useState([])
    const [accounts, setAccounts] = useState([])
    const cancelRef = useRef()

    const onAdd = () =>{
        setvegetableTags(prevTags=>[...prevTags, {
            name: '',
            quantity: 0,
            price: 0,
        }])   
    }
    const onAddPunyaTag = () =>{
        setpunyaTags(prevTags=>[...prevTags, {
            name: '',
        }])   
    }
    const onChangeNum = (event) =>{
        const _tempCost = [...vegetableTags]
        _tempCost[event.target.dataset.id][event.target.name] = event.target.value;
        setvegetableTags(_tempCost)
        setvegetableExp(getTotalCosts())
    }
    const onChangeNumPunyaTag = (event) =>{
        const _tempCost = [...punyaTags]
        _tempCost[event.target.dataset.id][event.target.name] = event.target.value;
        setpunyaTags(_tempCost)
    }
    const onClickDelete = (i) =>{
        const _tempTags = [...vegetableTags]
        setvegetableTags(_tempTags.filter((s, index)=> i !== index))
    }
    const onClickDeletePunyaTag = (i) =>{
        const _tempTags = [...punyaTags]
        setpunyaTags(_tempTags.filter((s, index)=> i !== index))
    }
    const getTotalCosts = () => {
        return vegetableTags.reduce((total, item) => {
          return total + Number(item.price);
        }, 0);
    }
    const handlePersonChange = (e) => {
        setPerson(e.target.value)
    }
    const handleMilkChange = (e) =>{
        setMilk(e.target.value)
    }
    const handleMilkPriceChange = (e) =>{
        setMilkPrice(e.target.value)
    }
    const toast = useToast()

    const handleSubmitForm = async() => {
        const date = new Date()
        try{
            const data = await axios.post(url+'junior-prefect/daily-accounts', {
                date: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
                milk: milk,
                milk_price: milkPrice,
                vegetable_list: vegetableTags
            },
            {
                headers: {'Content-Type':'application/json'}
            }
            )
            const fetchedAccount = await data.data
            console.log(fetchedAccount)
            if(fetchedAccount.date){
                setAccounts(fetchedAccount)
                toast({
                    title: 'Created Successfully!',
                    status:'success',
                    isClosable: true,
                })
            }
            else{
                toast({
                    title: 'Could not create :(',
                    status:'error',
                    isClosable: true,
                })
            }
        }
        catch(err){
            toast({
                title: 'Could not create :(',
                status:'error',
                isClosable: true,
            })
        }
    } 

  return (
    <div>
        <Navbar />
        <Flex>
            <Sidebar />
            <Flex marginLeft={islargerthan600 ? '250px':'0px'} direction='column' justifyContent='center' width='100%'>
            <Flex alignItems='center'>
            <Button width='50px' borderRadius='50%' margin='20px' onClick={onOpen} colorScheme='teal'><AddIcon w={6} h={6} /></Button>  
            <Text fontSize='2xl'>Create</Text>
            </Flex>
            <table className='prefect-table'>
                <tr className='prefect-table-heading'>
                    <th>Date</th>
                    <th>Milk</th>
                    <th>Milk Price</th>
                    <th>Vegetables</th>
                    <th>Quantity</th>
                    <th>Vegetable Price</th>
                </tr>
                {
                    accounts && accounts.map((account, index) => {
                        return(
                            <tr key={index}>
                                <td>{account.date}</td>
                                <td>{account.milk}</td>
                                <td>{account.milk_price}</td>
                                <td>
                                    <ol>
                                    {
                                        account.vegetable_list.map((veg, index) => {
                                            return(
                                                <li key={index}>{veg.name}</li>
                                            )
                                        })
                                    }
                                    </ol>
                                </td>
                                <td>
                                    <ol>
                                    {
                                        account.vegetable_list.map((veg, index) => {
                                            return(
                                                <li key={index}>{veg.quantity}</li>
                                            )
                                        })
                                    }
                                    </ol>
                                </td>
                                <td>
                                    <ol>
                                    {
                                        account.vegetable_list.map((veg, index) => {
                                            return(
                                                <li key={index}>{veg.price}</li>
                                            )
                                        })
                                    }
                                    </ol>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            <Drawer onClose={onClose} isOpen={isOpen} size='xl'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton/>
                <DrawerBody>
                <Flex direction='column'>
                <Text fontSize='2xl'>Enter the Litre of Milk bought</Text>
                <Flex width='100%'>
                <Flex width='50%' direction='column'>
                <FormLabel mt={4}>Milk</FormLabel>
                <Input onChange={handleMilkChange} name='milk' type='text' placeholder='Milk' variant='outline'></Input>
                </Flex>
                <Flex width='50%' direction='column'>
                <FormLabel mt={4}>Milk Price</FormLabel>
                <Input onChange={handleMilkPriceChange} name='milk-price' type='text' placeholder='Milk Price' variant='outline'></Input>
                </Flex>
                </Flex>
                <Text fontSize='2xl' mt={4}>Enter Vegetable, quantitiy and price here:</Text>
                {
                    vegetableTags && vegetableTags.map((tag, index)=>{
                        return (
                            <Flex mt={4} width="100%" key={index}>
                            <Input data-id={index} onChange={onChangeNum} name='name' type='text' placeholder='Vegetable name' variant='outline'></Input>
                            <Input data-id={index} onChange={onChangeNum} name='quantity' type='text' placeholder='Quantity' variant='outline'></Input>
                            <Input ml={1} data-id={index} onChange={onChangeNum}  name='amount' type='number' placeholder='Amount' variant='outline'></Input>
                            <Button ml={2} id={index} onClick={() => onClickDelete(index)}><CloseIcon cursor='pointer' /></Button>
                            </Flex>
                        )
                    })
                }
                <Flex>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} onClick={onAdd} colorScheme='blue'>Add</Button>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} colorScheme='blue' onClick={handleSubmitForm}>Save</Button>
                </Flex>
                <Flex direction='column' mt={4}>
                    <Text fontSize='2xl'>Punya smarane</Text>
                    <Input onChange={handlePersonChange} mt={4} type='text' name='person' variant='filled' placeholder="Enter the late person's name"></Input>
                    {
                    punyaTags && punyaTags.map((tag, index)=>{
                        return (
                            <Flex mt={4} width="100%" key={index}>
                            <Input data-id={index} value={tag.name} onChange={onChangeNumPunyaTag} name='name' type='text' placeholder='Enter the dish name' variant='outline'></Input>
                            <Button ml={2} id={index} onClick={() => onClickDeletePunyaTag(index)}><CloseIcon cursor='pointer' /></Button>
                            </Flex>
                        )
                    })
                    }
                <Flex>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} onClick={onAddPunyaTag} colorScheme='blue'>Add</Button>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} colorScheme='blue'>Save</Button>
                </Flex>
                </Flex>
                </Flex>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            </Flex>
        </Flex>
    </div>
  )
}

export default DailyAccounts