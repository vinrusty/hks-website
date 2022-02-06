import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Button, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function MonthlyAccounts() {

    const [islargerthan600] = useMediaQuery('(min-width: 600px)')

  return (
      <div>
      <Navbar />
      <Flex>
      <Sidebar />
      <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%'>
      <table className='prefect-table'>
          <tr className='prefect-table-heading'>
              <th>Month | Year</th>
              <th>Prefect</th>
              <th>Phone</th>
              <th>Expenditure</th>
          </tr>
          <tr>
              <td className='table-items'>
              <Link to='/prefect/monthly-account/year-month'>
              February 22
              </Link>
              </td>
              <td className='table-items'>
              <Link to='/prefect/monthly-account/year-month'>
              Rahul S Bharadwaj
              </Link>
              </td>
              <td className='table-items'>
              <Link to='/prefect/monthly-account/year-month'>
              1234567890
              </Link>
              </td>
              <td className='table-items'>
              <Link to='/prefect/monthly-account/year-month'>
              25000
              </Link>
              </td>
              
          </tr>
      </table>
      <Button width={islargerthan600 ? '10%':'30%'} margin='20px' colorScheme='teal'>Create</Button>  
      </Flex>
      </Flex>
      </div>
  );
}

export default MonthlyAccounts;
