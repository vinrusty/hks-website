import { Button, Flex, FormLabel, Input, InputGroup, InputLeftAddon, Text, useToast, useMediaQuery } from '@chakra-ui/react';
import React,{useState} from 'react';
import axios from 'axios';

function MembershipForm({url, id, role}) {
  
  const [name, setName] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [age, setAge] = useState('');
  const [placeofbirth, setPlaceofbirth] = useState('');
  const [Gothra, setGothra] = useState('');
  const [fathername, setFathername] = useState('');
  const [husbandorwifename, setHusbandorwifename] = useState('');
  const [HomeAddress, setHomeAddress] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Pin, setPin] = useState('');
  const [TelPhoneOffice, setTelPhoneOffice] = useState('');
  const [TelPhoneHome, setTelPhoneHome] = useState('');
  const [Mobileno, setMobileno] = useState('');
  const [PermanentAddress, setPermanentAddress] = useState('');
  const [PermanentCity, setPermanentCity] = useState('');
  const [PermanentState, setPermanentState] = useState('');
  const [PermanentPin, setPermanentPin] = useState('');
  const [member_pic, setMember_pic] = useState('')
  const [introducername, setIntroducername] = useState('');
  const [introducermemberid, setIntroducermemberid] = useState('');
  const [introducermemberphone, setIntroducermemberphone] = useState('');
  const toast = useToast()
  const [islargerthan600] = useMediaQuery('(min-width: 600px)')

  const handleNameChange = (event) =>{
      setName(event.target.value);
  }
  const handleAadharChange = (event) =>{
      setAadhar(event.target.value);
  }
  const handleageChange = (event) =>{
      setAge(event.target.value);
  }
  const handlePlaceofbirthChange = (event) =>{
      setPlaceofbirth(event.target.value);
  }
  const handleGothraChange = (event) =>{
      setGothra(event.target.value);
  }
  const handleFathernameChange = (event) =>{
      setFathername(event.target.value);
  }
  const handleHusbandorwifenameChange = (event) =>{
      setHusbandorwifename(event.target.value);
  }
  const handleHomeAddressChange = (event) =>{
      setHomeAddress(event.target.value);
  }
  const handleCityChange = (event) =>{
      setCity(event.target.value);
  }
  const handleStateChange = (event) =>{
      setState(event.target.value);
  }
  const handlePinChange = (event) =>{
      setPin(event.target.value);
  }
  const handleTelPhoneOfficeChange = (event) =>{
      setTelPhoneOffice(event.target.value);
  }
  const handleTelPhoneHomeChange = (event) =>{
      setTelPhoneHome(event.target.value);
  }
  const handleMobilenoChange = (event) =>{
      setMobileno(event.target.value);
  }
  const handlePermanentAddressChange = (event) =>{
      setPermanentAddress(event.target.value);
  }
  const handlePermanentCityChange = (event) =>{
      setPermanentCity(event.target.value);
  }
  const handlePermanentStateChange = (event) =>{
      setPermanentState(event.target.value);
  }
  const handlePermanentPinChange = (event) =>{
      setPermanentPin(event.target.value);
  }
  const handleIndroducersname = (event) => {
      setIntroducername(event.target.name)
  }
  const handleIndroducersphone = (event) => {
      setIntroducermemberphone(event.target.name)
  }
  const handleIndroducersmemberid = (event) => {
      setIntroducermemberid(event.target.name)
  }
  const handlememberpic = (event) => {
      setMember_pic(event.target.files[0])
  }

  const handleSubmitForm = async() =>{
    const formData = new FormData()
    formData.append("name",name)
    formData.append("aadhar_no",aadhar)
    formData.append("age",age)
    formData.append("birth_place",name)
    formData.append("gothra",Gothra)
    formData.append("father_name",fathername)
    formData.append("husband_or_wife_name",husbandorwifename)
    formData.append("home_address",HomeAddress)
    formData.append("city",City)
    formData.append("state", State)
    formData.append("pin", Pin)
    formData.append("tel_no_office", TelPhoneOffice)
    formData.append("tel_no_home", TelPhoneHome)
    formData.append("phone", Mobileno)
    formData.append("permanent_address", PermanentAddress)
    formData.append("p_city", PermanentCity)
    formData.append("p_state", PermanentState)
    formData.append("p_pin", PermanentPin)
    formData.append("member_pic", member_pic)
    formData.append("intro_name", introducername)
    formData.append("intro_phone", introducermemberphone)
    formData.append("intro_id", introducermemberid)


      
    try{
        const data = await axios.post(url+"register-member",
        formData,
        {
            headers:{'Content-Type':'application/json'}
        })
        const Member = await data.data
        console.log(Member)
        if(Member){
            toast({
                title: 'Registered Successfully!',
                status:'success',
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Could not Register',
                status:'error',
                isClosable: true,
            })
        }
    }
    catch(err){
        toast({
            title: 'Could not Register',
            status:'error',
            isClosable: true,
        })
    }
  }

  return (
      <Flex alignItems='center' justifyContent='center' direction='column' width='100%' padding='2em' bgGradient='linear(to-l, #7928CA, #FF0080)'>
        <Text fontSize={islargerthan600 ? '5xl' : '2xl'} color='#FFF'>Hoysala Karnataka sangha membership form</Text>
        <Flex alignItems='center' justifyContent='center' direction='column' width={islargerthan600 ? '80%' : '100%'} padding='2em' boxShadow='xs' borderRadius='30px' marginTop='20px' background='#A6E1FA'>
          <Flex width='100%' alignItems='center' justifyContent='center' direction={islargerthan600 ? 'row' : 'column'}>
            <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input placeholder='Enter your name' type='text' background='#FFF' onChange={handleNameChange} />
            </Flex>
            <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='aadhar-no'>Aadhar number</FormLabel>
                <Input placeholder='Enter your Aadhar number' type='text' background='#FFF' onChange={handleAadharChange} />
            </Flex>
          </Flex>
          <Flex width='100%' alignItems='center' justifyContent='center' direction={islargerthan600 ? 'row':'column'}>
            <Flex direction='column' width={islargerthan600 ? '50%':'100%'} margin='2px'>
                <FormLabel htmlFor='age'>Age</FormLabel>
                <Input placeholder='Enter your age' type='number' background='#FFF' onChange={handleageChange} />
            </Flex>
            <Flex direction='column' width={islargerthan600 ? '50%':'100%'} margin='2px'>
                <FormLabel htmlFor='placeofbirth'>Place of Birth</FormLabel>
                <Input placeholder='Place of birth' type='text' background='#FFF' onChange={handlePlaceofbirthChange} />
            </Flex>
            <Flex direction='column' width={islargerthan600 ? '50%':'100%'} margin='2px'>
                <FormLabel htmlFor='gotra'>Gothra</FormLabel>
                <Input placeholder='Enter your Gothra' type='text' background='#FFF' onChange={handleGothraChange} />
            </Flex>
          </Flex>
          <Flex direction='column' width='100%' margin='2px' marginTop='10px'>
            <FormLabel htmlFor='fathername'>Father's Name</FormLabel>
            <Input placeholder="Enter your Father's name" type='text' background='#FFF' onChange={handleFathernameChange} />
          </Flex>
          <Flex direction='column' width='100%' margin='2px' marginTop='10px'>
            <FormLabel htmlFor='husbandorwifename'>Husband/Wife's Name</FormLabel>
            <Input placeholder="Enter your Husband or Wife's name" type='text' background='#FFF' onChange={handleHusbandorwifenameChange}/>
          </Flex>
          <Flex direction='column' width='100%' margin='2px' marginTop='10px'>
            <FormLabel htmlFor='address'>Home Address</FormLabel>
            <Input placeholder="Enter your Husband or Wife's name" type='text' background='#FFF' onChange={handleHomeAddressChange} />
          </Flex>
          <Flex width='100%' alignItems='center' justifyContent='center' marginTop='10px'>
            <Flex direction='column' width='50%' margin='2px'>
                <FormLabel htmlFor='native'>City</FormLabel>
                <Input placeholder='Enter your city name' type='text' background='#FFF' onChange={handleCityChange} />
            </Flex>
            <Flex direction='column' width='50%' margin='2px'>
                <FormLabel htmlFor='state'>State</FormLabel>
                <Input placeholder='Enter your state' type='text' background='#FFF' onChange={handleStateChange} />
            </Flex>
            <Flex direction='column' width='50%' margin='2px'>
                <FormLabel htmlFor='pin'>PIN</FormLabel>
                <Input placeholder='Enter PIN code' type='text' background='#FFF' onChange={handlePinChange} />
            </Flex>
          </Flex>
          <Flex width='100%' alignItems='center' justifyContent='center' marginTop='10px' direction={islargerthan600 ? 'row' : 'column'}>
            <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='teloffice'>Telephone no.(office)</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='+91' />
                    <Input placeholder='Enter your office no.' type='text' background='#FFF' onChange={handleTelPhoneOfficeChange} />
                </InputGroup>
            </Flex>
            <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='telhome'>Telephone no.(home)</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='+91' />
                    <Input placeholder='Enter your home no.' type='text' background='#FFF' onChange={handleTelPhoneHomeChange} />
                </InputGroup>
            </Flex>
          </Flex>
          <Flex direction='column' width='100%' margin='2px' marginTop='10px'>
            <FormLabel htmlFor='mobile-no'>Mobile Number</FormLabel>
            <InputGroup>
                <InputLeftAddon children='+91' />
                <Input placeholder="Enter your mobile number" type='text' background='#FFF' onChange={handleMobilenoChange} />
            </InputGroup>
          </Flex>
          <Flex direction='column' width='100%' margin='2px' marginTop='10px'>
            <FormLabel htmlFor='permanent-address'>Permanent Address</FormLabel>
            <Input placeholder="Enter your Permanent address" type='text' background='#FFF' onChange={handlePermanentAddressChange} />
          </Flex>
          <Flex width='100%' alignItems='center' justifyContent='center' marginTop='10px'>
            <Flex direction='column' width='50%' margin='2px'>
                <FormLabel htmlFor='native'>City</FormLabel>
                <Input placeholder='Enter your city name' type='text' background='#FFF' onChange={handlePermanentCityChange} />
            </Flex>
            <Flex direction='column' width='50%' margin='2px'>
                <FormLabel htmlFor='state'>State</FormLabel>
                <Input placeholder='Enter your state' type='text' background='#FFF' onChange={handlePermanentStateChange} />
            </Flex>
            <Flex direction='column' width='50%' margin='2px'>
                <FormLabel htmlFor='pin'>PIN</FormLabel>
                <Input placeholder='Enter PIN code' type='text' background='#FFF' onChange={handlePermanentPinChange} />
            </Flex>
          </Flex>
          <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='pin'>Add Picture</FormLabel>
                <Input onChange={handlememberpic} type='file' background='gray.100' />
          </Flex>
          <Flex width='100%' alignItems='center' justifyContent='center' marginTop='10px' direction={islargerthan600 ? 'row' : 'column'}>
            <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='teloffice'>Enter Inroducers name</FormLabel>    
                <Input placeholder='Enter introducers name.' type='text' background='#FFF' onChange={handleIndroducersname} />
            </Flex>
            <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='telhome'>Membership ID</FormLabel>    
                <Input placeholder='Enter membership id.' type='text' background='#FFF' onChange={handleIndroducersmemberid} />
            </Flex>
          </Flex>
          <Flex direction='column' width='100%' margin='2px'>
                <FormLabel htmlFor='pin'>Member Phone no.</FormLabel>
                <InputGroup>
                <InputLeftAddon children='+91' />
                <Input onChange={handleIndroducersphone} type='text' placeholder='Enter member phone no.' background='gray.100' />
                </InputGroup>
          </Flex>
          <Flex width='100%'>
              <Button onClick={handleSubmitForm} marginTop='10px' width={islargerthan600 ? '20%' : '100%'} colorScheme='teal' >Submit</Button>
          </Flex>
        </Flex>
      </Flex>
  );
}

export default MembershipForm;
