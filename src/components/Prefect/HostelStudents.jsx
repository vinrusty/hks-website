import { Flex , useMediaQuery, InputGroup, InputLeftElement, Input, Heading } from '@chakra-ui/react'
import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import Sidebar from '../Sidebar'

function HostelStudents({url, id, role}) {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [searchField, setSearchField] = useMediaQuery('(min-width: 600px)')

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value)
    }


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
            
            </Flex>
        </Flex>
    </div>
  )
}

export default HostelStudents