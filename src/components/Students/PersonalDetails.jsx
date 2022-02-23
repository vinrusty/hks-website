import { Flex, Text, useMediaQuery, Input, FormLabel, Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React,{ useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

function PersonalDetails({url, id, role}) {
    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [fname, setFname] = useState('')
    const [mname, setMname] = useState('')
    const [fphone, setFphone] = useState('')
    const [mphone, setMphone] = useState('')
    const [college, setCollege] = useState('')
    const [address, setAddress] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [roomno, setRoomno] = useState('')
    const [file, setFile] = useState('')
    const toast = useToast()

    const handleSumbitForm = async() => {
        try{
            const data = await axios.post(url+'personal-details',
            {
                fathername: fname,
                mothername: mname,
                fphone: fphone,
                mphone: mphone,
                address: address,
                college: college,
                aadhar_no: aadhar,
                room_no: roomno,
                studentImage: file
            },
            {
                headers: {'Content-Type':'application/json'}
            }
            )
            const personalDetail = await data.data
            if(personalDetail.fathername){
                toast({
                    title: 'Uploaded Personal Data successfully',
                    description: "",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch(err){
            toast({
                title: 'Could not upload please try again',
                description: "",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleFathernameChange = (event) =>{
        setFname(event.target.value);
    }
    const handleMothernameChange = (event) =>{
        setMname(event.target.value);
    }
    const handleFatherPhoneChange = (event) =>{
        setFphone(event.target.value);
    }
    const handleMotherPhoneChange = (event) =>{
        setMphone(event.target.value);
    }
    const handleAddressChange = (event) =>{
        setAddress(event.target.value);
    }
    const handleCollegeChange = (event) =>{
        setCollege(event.target.value);
    }
    const handleAadharChange = (event) =>{
        setAadhar(event.target.value);
    }
    const handleRoomnoChange = (event) =>{
        setRoomno(event.target.value);
    }
    const handleFileChange = (event) => {
        setFile(event.target.file[0])
    }

  return (
    <div>
        <Flex>
            <Sidebar id={id} role={role} />
            <Flex marginLeft={islargerthan600 ? '260px':'0px'} width='100%' direction='column' padding='2rem'>
                <Text fontSize='2xl' textAlign='center'>Upload user personal details</Text>
                <Flex direction='column' background='#DCD6F7' borderRadius='15px' padding='2rem' mt={5}>
                <Flex width='100%' alignItems='center' justifyContent='center' direction={islargerthan600 ? 'row' : 'column'}>
                    <Flex direction='column' width='100%' margin='2px' mt={3}>
                        <FormLabel htmlFor='fatherName'>Father Name</FormLabel>
                        <Input placeholder='Enter your Father name' type='text' background='#FFF' onChange={handleFathernameChange} />
                    </Flex>
                    <Flex direction='column' width='100%' margin='2px' mt={3}>
                        <FormLabel htmlFor='f-phone'>Phone number</FormLabel>
                        <Input placeholder='Enter your Father Phone number' type='text' background='#FFF' onChange={handleFatherPhoneChange} />
                    </Flex>
                </Flex>
                <Flex width='100%' alignItems='center' justifyContent='center' direction={islargerthan600 ? 'row' : 'column'}>
                    <Flex direction='column' width='100%' margin='2px' mt={3}>
                        <FormLabel htmlFor='motherName'>Mother Name</FormLabel>
                        <Input placeholder='Enter your Mother name' type='text' background='#FFF' onChange={handleMothernameChange} />
                    </Flex>
                    <Flex direction='column' width='100%' margin='2px' mt={3}>
                        <FormLabel htmlFor='aadhar-no'>Phone number</FormLabel>
                        <Input placeholder='Enter your Mother Phone number' type='text' background='#FFF' onChange={handleMotherPhoneChange} />
                    </Flex>
                </Flex>
                <Flex direction='column' width='100%' margin='2px' mt={3}>
                    <FormLabel htmlFor='address'>Address</FormLabel>
                    <Input placeholder='Enter your Permanent Address' type='text' background='#FFF' onChange={handleAddressChange} />
                </Flex>
                <Flex direction='column' width='100%' margin='2px' mt={3}>
                    <FormLabel htmlFor='college'>College</FormLabel>
                    <Input placeholder='Enter your college' type='text' background='#FFF' onChange={handleCollegeChange} />
                </Flex>
                
                <Flex width='100%' alignItems='center' justifyContent='center' direction={islargerthan600 ? 'row' : 'column'}>
                    <Flex direction='column' width={islargerthan600 ? '80%':'100%'} margin='2px' mt={3}>
                        <FormLabel htmlFor='aadhar'>Aadhar no.</FormLabel>
                        <Input placeholder='Enter your Aadhar no.' type='text' background='#FFF' onChange={handleAadharChange} />
                    </Flex>
                    <Flex direction='column' width={islargerthan600 ? '20%':'100%'} margin='2px' mt={3}>
                        <FormLabel htmlFor='room-no'>Room number</FormLabel>
                        <Input placeholder='Enter your room number' type='text' background='#FFF' onChange={handleRoomnoChange} />
                    </Flex>
                </Flex>
                <Flex direction='column' width='100%' margin='2px' mt={3}>
                    <FormLabel htmlFor='photo'>Photo</FormLabel>
                    <Input onChange={handleFileChange} placeholder='Add your picture' type='file' background='#FFF' />
                </Flex>
                <Flex width='100%'>
                    <Button marginTop='10px' width={islargerthan600 ? '20%' : '100%'} colorScheme='teal' onClick={handleSumbitForm} >Submit</Button>
                </Flex>
                </Flex>
            </Flex>
        </Flex>
    </div>
  )
}

export default PersonalDetails