import { Flex , useMediaQuery, InputGroup, InputLeftElement, Input, Heading, SimpleGrid, Text, Badge } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { AtSignIcon, PhoneIcon, SearchIcon, StarIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import axios from 'axios'

function HostelStudents({url, id, role, phone}) {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [searchField, setSearchField] = useState('')
    const [students, setStudents] = useState([])

    useEffect(() => {
      const fetchStudent = async() => {
        try{
          const data = await axios.get(url + 'users/student')
          const fetchedStudents = await data.data
          setStudents(fetchedStudents)
        }
        catch(err){
          console.log(err)
        }
      }
      fetchStudent()
    },[])


    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredStudents = students.filter(student => {
      return student.name.toLowerCase().includes(searchField.toLowerCase()) || student.phone.toLowerCase().includes(searchField.toLowerCase())
  })


  return (
    <div>
        <Flex>
            <Sidebar id={id} role={role} />
            <Flex marginLeft={islargerthan600 ? '260px':'0px'} alignItems='center' justifyContent='center' width='100%' direction='column' padding='2rem'>
            <Heading>Hostel Students</Heading>
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
            <Flex direction='column' width='80%'>
            {
              filteredStudents && filteredStudents.map((student, index) => {
                return(
              <Flex as={Link} to={`/prefect/hostel-students/${student.phone}`} key={index} padding='2em' background='#DCE1E9' width='100%' alignItems='center' justifyContent='center' height='100px' shadow='md' borderRadius='10px' mt='15px'>
              <SimpleGrid columns={[1,null,3]} width='100%' textAlign='center'>
                <Text fontSize={islargerthan600 ? 'xl':'md'}><Flex alignItems='center' justifyContent='center'><StarIcon h={6} w={6} mr={2}/>{student.name}</Flex></Text>
                <Text fontSize={islargerthan600 ? 'xl':'md'}><Flex alignItems='center' justifyContent='center'><PhoneIcon h={6} w={6} mr={2}/>{student.phone}</Flex></Text>
                <Text fontSize={islargerthan600 ? 'xl':'md'}><Flex alignItems='center' justifyContent='center'><AtSignIcon h={6} w={6} mr={2}/>{student.userid}</Flex></Text>
              </SimpleGrid>
                <Badge colorScheme='purple'>STUDENT</Badge>
              </Flex>
                )
              })
            }
            </Flex>
            </Flex>
        </Flex>
    </div>
  )
}

export default HostelStudents