import React,{useState, useEffect} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Flex, Text, useMediaQuery, Button, Input, FormLabel, useSafeLayoutEffect } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AccountDetails() {

  const {id} = useParams()

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [amount, setAmount] = useState(0)
    const [milk, setMilk] = useState(0)
    const [veg, setVeg] = useState(0)
    const [others, setOthers] = useState(0)
    const [account, setAccounts] = useState([])

    useEffect(() => {
      const fetchData = async() => {
        try{
          const data = await axios.get(`http://localhost:3001/prefect-account/${id}`)
          const fetchedData = await data.data
          setAccounts(fetchedData)
        }
        catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[])

    

    const handleAmountChange = (event) => {
      setAmount(event.target.value)
    }
    const handleMilkChange = (event) => {
      setMilk(event.target.value)
    }
    const handleVegChange = (event) => {
      setVeg(event.target.value)
    }
    const handleOthersChange = (event) => {
      setOthers(event.target.value)
    }

    const getTotal = () =>{
      return Number(milk)+Number(veg)+Number(others)
    }
    const date = new Date()
    // let array  = [
    //   {
    //     date: date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
    //     amount: amount,
    //     milk: milk,
    //     vegetables: veg,
    //     others: others,
    //     total: getTotal(),
    //     balance: amount - getTotal()
    //   }
      
    // ]
    // console.log(amount)
    // console.log(milk)

    const handleSubmitForm = async() => {
      try{
        const data = await axios.patch(`http://localhost:3001/prefect-account/${id}`,{
          accountList: [...account.accountList, {
            date: date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
            amount: amount,
            milk: milk,
            vegetables: veg,
            others: others,
            total: getTotal(),
            balance: amount - getTotal()
          }]
        }
        )
        const fetchedAccount = await data.data
        console.log(fetchedAccount)
      }
      catch(err){
        console.log(err)
      }
    }
    

  return (
      <div>
      <Navbar />
      <Flex>
      <Sidebar />
      <Flex marginLeft={islargerthan600 ? '250px':'0px'} direction='column' width='100%' padding='2rem'>
      <Flex direction={islargerthan600 ? 'row':'column'}>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='amount'>Amount</FormLabel>
        <Input placeholder='Enter amount' type='number' background='#FFF' onChange={handleAmountChange} />
      </Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='milk'>Milk</FormLabel>
        <Input placeholder='Enter expense of milk' type='number' background='#FFF' onChange={handleMilkChange}  />
      </Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='vegetable'>Vegetable</FormLabel>
        <Input placeholder='Enter expense of vegetables' type='number' background='#FFF' onChange={handleVegChange}  />
      </Flex>
      <Flex direction='column' width='100%' margin='2px' mt={3}>
        <FormLabel htmlFor='others'>Others</FormLabel>
        <Input placeholder='Enter other expenses' type='number' background='#FFF' onChange={handleOthersChange}  />
      </Flex>
      </Flex>
      <Button width={islargerthan600 ? '10%':'30%'} margin='20px' colorScheme='teal' onClick={handleSubmitForm}>Add</Button>
      <table style={{textAlign: 'center'}}>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Milk</th>
          <th>Vegetable</th>
          <th>Others</th>
          <th>Total</th>
          <th>balance</th>
        </tr>
        {
          account.accountList && account.accountList.map((acc, index) => {
            return(
              <tr>
                <td>{acc.date}</td>
                <td>{acc.amount}</td>
                <td>{acc.milk}</td>
                <td>{acc.vegetables}</td>
                <td>{acc.others}</td>
                <td>{acc.total}</td>
                <td>{acc.balance}</td>
              </tr>
            )
          })
        }
      </table>
      </Flex>
      </Flex>
      </div>
  );
}

export default AccountDetails;
