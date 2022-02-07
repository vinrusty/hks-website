import { Flex, Button, useMediaQuery, useDisclosure, Input, FormLabel } from '@chakra-ui/react';
import React,{ useState, useRef} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import {Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton} from "@chakra-ui/react"
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay} from "@chakra-ui/react"
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

function MonthlyRationList() {
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [rationName, setRationName] = useState('')
    const [rationQuantity, setRationQuantity] = useState('')
    const [rationExp, setrationExp] = useState('')
    const [rationTags, setRationTags] = useState([])
    const cancelRef = useRef()
    const [Open , setOpen] = useState(false)

    const onClosing = () => setOpen(false)

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

  return (
    <div>
        <Navbar />
        <Flex>
            <Sidebar />
            <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%'>
            <table className='prefect-table'>
                <tr className='prefect-table-heading'>
                    <th>Ration</th>
                    <th>Quantity</th>
                    <th>Price in Rs</th>
                </tr>
                <tr>
                    <td className='table-items'>
                    Rice
                    </td>
                    <td className='table-items'>
                    10kg
                    </td>
                    <td className='table-items'>
                    800 Rs
                    </td>
                </tr>
            </table>
            <Flex>
            <Button width={islargerthan600 ? '10%':'30%'} margin='2px' colorScheme='teal' onClick={onOpen}>Update</Button>  
            <Button width={islargerthan600 ? '10%':'30%'} margin='2px' colorScheme='red' onClick={() => setOpen(true)}>Delete</Button>  
            </Flex>
            <AlertDialog
                isOpen={Open}
                leastDestructiveRef={cancelRef}
                onClose={onClosing}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete This Ration List
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClosing}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={onClickDelete} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
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
                            <Input data-id={index} value={tag.quantity} onChange={onChangeNum} name='name' type='text' placeholder='Example Budget' variant='outline'></Input>
                            <Input ml={1} data-id={index} value={tag.price} onChange={onChangeNum}  name='amount' type='number' placeholder='' variant='outline'></Input>
                            <Button ml={2} id={index} onClick={() => onClickDelete(index)}><CloseIcon cursor='pointer' /></Button>
                            </Flex>
                        )
                    })
                }
                </Flex>
                <Flex>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} onClick={onAdd} colorScheme='blue'>Add</Button>
                <Button type='submit' width={islargerthan600 ? '10%':'30%'} m={1} colorScheme='blue'>Save</Button>
                </Flex>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            </Flex>
        </Flex>
    </div>
  );
}

export default MonthlyRationList;
