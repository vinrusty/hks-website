import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import React,{useState, useEffect} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
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

function ListofMembers() {
    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const data = await axios.get('http://localhost:3001/list-of-members')
                const fetchedMembers = await data.data
                setMembers(fetchedMembers)
            }
            catch(err){
                console.log('error')
            }
        }
        fetchData()
    },[])
console.log(members)


  return (
      <>
      <Navbar />
      <Flex>
        <Sidebar />
        <Flex marginLeft='260px' direction='column' justifyContent='center' width='100%' padding='2em'>
        <Table variant='simple'>
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
                members && members.map((member, i) => {
                    return(
                        <Tr key={i}>
                            <Td>{member._id}</Td>
                            <Td>{member.name}</Td>
                            <Td>{member.phone}</Td>
                            <Td>{member.pin}</Td>
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
