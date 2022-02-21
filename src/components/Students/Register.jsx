import { CheckIcon } from '@chakra-ui/icons'
import { Flex, Input, FormLabel, useMediaQuery, Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'

function Register({url, id, role}) {

  const [islargerthan600] = useMediaQuery('(min-width: 600px)')
  const [name, setName] = useState('')
  const [roomno, setRoomno] = useState('')
  const [place_reason, setPlaceReason] = useState('')
  const [register, setRegister] = useState([])
  const toast = useToast()

  useEffect(() => {
    const fetchRegister = async() => {
        try{
            const data = await axios.get(url+`students/register/${id}`)
            const reg = await data.data
            console.log(reg)
            setRegister(reg)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchRegister()
  },[])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleRoomnoChange = (event) => {
    setRoomno(event.target.value)
  }
  const handlePlaceReasonChange = (event) => {
    setPlaceReason(event.target.value)
  }
  const handleCheckOut = async() => {
    const date = new Date()
    try{
        const data = await axios.post(url+`students/register/${id}`,{
            check_out_date: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
            name: name,
            userid: id,
            room_no: roomno,
            place_reason: place_reason,
            check_out_time: date.getHours() + ':' + date.getMinutes(),
            check_in_flag: true
        },{
            headers: {'Content-Type': 'application/json'}
        })
        const fetchedRegister = await data.data
        if(fetchedRegister[0].name){
            setRegister(fetchedRegister)
            toast({
                title: 'Added to Register successfully',
                description: "",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Could not add, try again!',
                description: "",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    catch(err){
        toast({
            title: 'Could not add, try again!',
            description: "",
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }
  }
  const handleCheckIn = async(reg) => {
      const date = new Date()
      try{
        const data = await axios.patch(url+`students/register/${id}/${reg.check_out_date}`, {
            check_in_date: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
            check_in_time: date.getHours() + ":" + date.getMinutes(),
            check_in_flag: false
        },{
            headers: {'Content-Type': 'application/json'}
        })
        const updatedRegister = await data.data
        if(updatedRegister[0].name){
            setRegister(updatedRegister)
            toast({
                title: 'Checked in successfully',
                description: "",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Could not check in try again!',
                description: "",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
      }
      catch(err){
        toast({
            title: 'Could not check in try again!',
            description: "",
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
      }
  }

  return (
    <div>
        <Flex>
            <Sidebar role={role} id={id} />
            <Flex marginLeft={islargerthan600 ? '250px':'0px'} direction='column' width='100%' padding={islargerthan600 ? '2rem' : '0'}>
            <Flex direction={islargerthan600 ? 'row':'column'} padding='1rem'>
            <Flex direction='column' width='100%' margin='2px' mt={3}>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input placeholder='Enter name' type='text' background='#FFF' onChange={handleNameChange} />
            </Flex>
            <Flex direction='column' width='100%' margin='2px' mt={3}>
                <FormLabel htmlFor='room-no'>Room No.</FormLabel>
                <Input placeholder='Enter the Room number' type='text' background='#FFF' onChange={handleRoomnoChange}  />
            </Flex>
            <Flex direction='column' width='100%' margin='2px' mt={3}>
                <FormLabel htmlFor='place-reason'>Place and Reason for taking leave</FormLabel>
                <Input placeholder='Enter Place and reason' type='text' background='#FFF' onChange={handlePlaceReasonChange}  />
            </Flex>
            </Flex>
            <Flex paddingLeft='1rem'>
                <Button colorScheme='green' margin='2px' mt={3} onClick={handleCheckOut}>Check Out</Button>
            </Flex>
            <table className='register-table'>
                <thead>
                    <tr className='register-table-head'>
                        <th className='register-table-head'>Name</th>
                        <th className='register-table-head'>Room number</th>
                        <th className='register-table-head'>Date of departure</th>
                        <th className='register-table-head'>Time</th>
                        <th className='register-table-head'>Place and Reason</th>
                        <th className='register-table-head'>Date of arrival</th>
                        <th className='register-table-head'>Time</th>
                        <th className='register-table-head'>Check In</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       register && register.map((reg, index) => {
                           return(
                               <tr key={index} style={{textAlign: 'center'}}>
                                <td className='register-table-head'>{reg.name}</td>
                                <td className='register-table-head'>{reg.room_no}</td>
                                <td className='register-table-head'>{reg.check_out_date}</td>
                                <td className='register-table-head'>{reg.check_out_time}</td>
                                <td className='register-table-head'>{reg.place_reason}</td>
                                <td className='register-table-head'>{reg.check_in_date}</td>
                                <td className='register-table-head'>{reg.check_in_time}</td>
                                <td className='register-table-head'><Button colorScheme='linkedin' disabled={!reg.check_in_flag} onClick={() => handleCheckIn(reg)}><CheckIcon w={6} h={6}/></Button></td>
                               </tr>
                           )
                       })
                   }
                </tbody>
            </table>
            </Flex>
        </Flex>
    </div>
  )
}

export default Register