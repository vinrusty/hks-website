import React,{useState, useEffect} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Flex, useMediaQuery, Button, Input, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactToExcel from 'react-html-table-to-excel'

function AccountDetails({url, userid, role}) {

  const {id} = useParams()
    
    const initialState = {
      date: '',
      amount: 0,
      milk: 0,
      vegetables: 0,
      others: 0,
      total: 0,
      balance: 0
    }

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')
    const [accounts, setAccounts] = useState(initialState)
    const [account, setAccount] = useState({
      accountList: []
    })

    useEffect(() => {
      const fetchData = async() => {
        try{
          const data = await axios.get(url+`prefect-account/${id}`)
          const fetchedData = await data.data
          setAccount({accountList: fetchedData.accountList})
        }
        catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[])

    const handleAmountChange = (event) => {
      const date = new Date()
      setAccounts({
        ...accounts,
        date: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear(),
        amount: event.target.value
      })
    }
    const handleMilkChange = (event) => {
      setAccounts({
        ...accounts,
        milk: event.target.value
      })
    }
    const handleVegChange = (event) => {
      setAccounts({
        ...accounts,
        vegetables: event.target.value
      })
    }
    const handleOthersChange = (event) => {
      setAccounts({
        ...accounts,
        others: event.target.value,
        total: Number(accounts.milk) + Number(accounts.vegetables) + Number(accounts.others),
        balance: Number(accounts.amount) - accounts.total
      })
    }

    const handleSubmitForm = async() => {
      setAccount({
        accountList:[...account.accountList, accounts]
      })
      try{
        const data = await axios.patch(url+`prefect-account/${id}`,{
          accountList: [...account.accountList, accounts]
        },
        {
          headers: {'Content-Type': 'application/json'}
        }
        )
        const updatedData = await data.data
      }
      catch(err){
        console.log(err)
      }
    }

  return (
      <div>
      {/* <Navbar /> */}
      <Flex>
      <Sidebar id={userid} role={role} />
      <Flex marginLeft={islargerthan600 ? '250px':'0px'} direction='column' width='100%' padding={islargerthan600 ? '2rem' : '0'}>
      <Flex direction={islargerthan600 ? 'row':'column'} padding='1rem'>
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
      <table className='register-table' id='prefect_data'>
      <thead>
        <tr>
          <th className='register-table-head'>Date</th>
          <th className='register-table-head'>Amount</th>
          <th className='register-table-head'>Milk</th>
          <th className='register-table-head'>Vegetable</th>
          <th className='register-table-head'>Others</th>
          <th className='register-table-head'>Total</th>
          <th className='register-table-head'>balance</th>
        </tr>
      </thead>
      <tbody>
        {
          account.accountList && account.accountList.map((acc, index) => {
            return (
              <tr key={index}>
                <td className='register-table-head'>{acc.date}</td>
                <td className='register-table-head'>{acc.amount}</td>
                <td className='register-table-head'>{acc.milk}</td>
                <td className='register-table-head'>{acc.vegetables}</td>
                <td className='register-table-head'>{acc.others}</td>
                <td className='register-table-head'>{acc.total}</td>
                <td className='register-table-head'>{acc.balance}</td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      
      <Button id='export_button' width={islargerthan600 ? '10%':'30%'} margin='20px' colorScheme='teal'>
      <ReactToExcel
        table='prefect_data'
        filename='prefectaccounts'
        sheet='sheet 1'
        buttonText='Download'
       />
       </Button>
      </Flex>
      </Flex>
      </div>
  );
}

export default AccountDetails;
