import { Flex, useMediaQuery, Text, Button, Input, InputGroup, InputLeftElement, Center } from '@chakra-ui/react';
import axios from 'axios';
import React,{useState, useEffect} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';

function ListofMembers({url}) {
    const [members, setMembers] = useState([])
    const [searchField, setSearchField] = useState('')
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const data = await axios.get(url+'list-of-members')
                const fetchedMembers = await data.data
                setMembers(fetchedMembers)
            }
            catch(err){
                console.log('error')
            }
        }
        fetchData()
    },[])

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredMembers = members.filter(member => {
        return member.name.toLowerCase().includes(searchField.toLowerCase())
    })


  return (
      <>
      <Navbar />
      <Flex>
        <Sidebar />
        <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' alignItems='center' justifyContent='center' width='100%'>
        <Flex padding='2rem' width='80%' alignItems='center' justifyContent='center'>
        <InputGroup width='100%'>
        <InputLeftElement
        pointerEvents='none'
        color='gray.300'
        fontSize='1.2em'
        children={<SearchIcon />}
         />
        <Input type='text' variant='filled' width='100%' onChange={handleSearchFieldChange} placeholder='Search' />
        </InputGroup>
        </Flex>
        <Table variant='simple' size={islargerthan600 ? 'md':'sm'}>
        <TableCaption>Hoysala karnataka Members</TableCaption>
        <Thead>
            <Tr>
            <Th>Member ID</Th>
            <Th>Name</Th>
            <Th>Phone No.</Th>
            <Th>PIN</Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                filteredMembers && filteredMembers.map((member, i) => {
                    return(
                        <Tr key={i}>
                            <Td padding='1em'><Text fontSize='xs'>V-167</Text></Td>
                            <Td padding='0em'><Text fontSize='xs'>{member.name}</Text></Td>
                            <Td padding='1em'><Text fontSize='xs'>{member.phone}</Text></Td>
                            <Td padding='1em'><Text fontSize='xs'>{member.pin}</Text></Td>
                        </Tr>
                    )
                })
            }
        </Tbody>
        </Table>
        </Flex>
      </Flex>
      </>
  );
}

export default ListofMembers;
