import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Flex } from '@chakra-ui/react';

function Students() {
  return (
      <div>
          <Navbar />
          <Flex>
              <Sidebar />
          </Flex>
      </div>
  );
}

export default Students;
