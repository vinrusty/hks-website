import { Flex, useMediaQuery, useDisclosure, Button, FormLabel, Input, Text } from '@chakra-ui/react'
import {Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import React,{ useState, useRef } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

function DailyAccounts() {
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [vegetableExp, setvegetableExp] = useState('')
    const [vegetableTags, setvegetableTags] = useState([])
    const [person, setPerson] = useState('')
    const [punyaTags, setpunyaTags] = useState([])
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

  return (
    <div>
        <Navbar />
        <Flex>
            <Sidebar />
            <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%'>
            <Flex alignItems='center'>
            <Button width='50px' borderRadius='50%' margin='20px' onClick={onOpen} colorScheme='teal'><AddIcon w={6} h={6} /></Button>  
            <Text fontSize='2xl'>Create</Text>
            </Flex>
            <table className='prefect-table'>
                <tr className='prefect-table-heading'>
                    <th>Date</th>
                    <th>Vegetables</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td className='table-items'>
                    February 22
                    </td>
                    <td className='table-items'>
                    <ol>
                        <li>Potato</li>
                        <li>Beans</li>
                    </ol>
                    </td>
                    <td className='table-items'>
                    <ol>
                        <li>2kg</li>
                        <li>2kg</li>
                    </ol>
                    </td>
                    <td className='table-items'>
                    <ol>
                        <li>36Rs</li>
                        <li>36Rs</li>
                    </ol>
                    </td>
                    
                </tr>
            </table>
            <Drawer onClose={onClose} isOpen={isOpen} size='xl'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton/>
                <DrawerBody>
                <Flex direction='column'>
                <FormLabel mt={4}>Enter Vegetable, quantitiy and price here:</FormLabel>
                {
                    vegetableTags && vegetableTags.map((tag, index)=>{
                        return (
                            <Flex mt={4} width="100%" key={index}>
                            <Input data-id={index} value={tag.name} onChange={onChangeNum} name='name' type='text' placeholder='Vegetable name' variant='outline'></Input>
                            <Input data-id={index} value={tag.quantity} onChange={onChangeNum} name='name' type='text' placeholder='Quantity' variant='outline'></Input>
                            <Input ml={1} data-id={index} value={tag.price} onChange={onChangeNum}  name='amount' type='number' placeholder='' variant='outline'></Input>
                            <Button ml={2} id={index} onClick={() => onClickDelete(index)}><CloseIcon cursor='pointer' /></Button>
                            </Flex>
                        )
                    })
                }
                <Flex>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} onClick={onAdd} colorScheme='blue'>Add</Button>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} colorScheme='blue'>Save</Button>
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