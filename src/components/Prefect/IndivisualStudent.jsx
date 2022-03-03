import { Flex, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../Sidebar'
import { useParams } from 'react-router-dom'

function IndivisualStudent({url, id, role }) {
  
  const [details, setDetails] = useState([])
  const {phone} = useParams()
  const [islargerthan600] = useMediaQuery('(min-width: 600px)')

  const PF = url

  useEffect(() => {
    const fetchDetails = async() => {
        try{
            const data = await axios.get(url + `user-details/${phone}`)
            const fetchedDetails = await data.data
            setDetails(fetchedDetails)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchDetails()
  },[])
  
  return (
    <div>
        <Flex>
            <Sidebar id={id} role={role} />
            <Flex marginLeft={islargerthan600 ? '260px':'0px'} direction='column' justifyContent='center' width='100%'>
            <Flex padding='2rem' borderRadius='15px' boxShadow='md' background='#F8F8F8' m={2} direction='column' alignItems='center' justifyContent='center'>
              <img className='student-image' src={PF + details.studentImage} alt='student picture' />
              <Flex width='100%'>
                <div className='student-table'>
                <table className='student-table'>
                  <tr>
                    <td>
                      <ul className='student-details-list'>
                        <li>Name</li>
                        <li>Phone</li>
                        <li>Father Name</li>
                        <li>Father Phone.</li>
                        <li>Mother Name</li>
                        <li>Mother Phone.</li>
                        <li>Address</li>
                        <li>College</li>
                        <li>Aadhar No.</li>
                        <li>Room No.</li>
                      </ul>
                    </td>
                    <td>
                      <ul className='student-details-list-2'>
                        <li>{details.name}</li>
                        <li>{details.phone}</li>
                        <li>{details.fathername}</li>
                        <li>{details.fphone}</li>
                        <li>{details.mothername}</li>
                        <li>{details.mphone}</li>
                        <li>{details.address}</li>
                        <li>{details.college}</li>
                        <li>{details.aadhar_no}</li>
                        <li>{details.room_no}</li>
                      </ul>
                    </td>
                  </tr>
                  
                  
                </table>
                </div>
              </Flex>
            </Flex>
            </Flex>
        </Flex>
    </div>
  )
}

export default IndivisualStudent