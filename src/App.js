import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MembershipForm from './components/MembershipForm';
import LoginForm from './components/LoginForm';
import Membership from './components/Membership';
import ListofMembers from './components/ListofMembers';
import Prefect from './components/Prefect';
import CreateUser from './components/Prefect/CreateUser';
import Member from './components/Member';
import MonthlyAccounts from './components/Prefect/MonthlyAccounts';
import AccountDetails from './components/Prefect/AccountDetails';
import './App.css';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<MembershipForm />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/list-of-members' element={<ListofMembers />} />
        <Route path='/prefect' element={<Prefect />} />
        <Route path='/create-prefect' element={<CreateUser />} />
        <Route path='/list-of-members/:id' element={<Member />} />
        <Route path='/prefect/monthly-accounts' element={<MonthlyAccounts />} />
        <Route path='/prefect/monthly-accounts/year-month' element={<AccountDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
