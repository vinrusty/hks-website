import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MembershipForm from './components/Manager/MembershipForm';
import LoginForm from './components/LoginForm';
import Membership from './components/Manager/Membership';
import ListofMembers from './components/Manager/ListofMembers';
import Prefect from './components/Prefect/Prefect';
import CreateUser from './components/Prefect/CreateUser';
import Member from './components/Manager/Member';
import MonthlyAccounts from './components/Prefect/MonthlyAccounts';
import AccountDetails from './components/Prefect/AccountDetails';
import Students from './components/Students/Students';
import RationList from './components/Prefect/RationList';
import MonthlyRationList from './components/Prefect/MonthlyRationList';
import JuniorPrefect from './components/Junior Prefect/JuniorPrefect';
import DailyAccounts from './components/Junior Prefect/DailyAccounts';
import PersonalDetails from './components/Students/PersonalDetails';
import './App.css';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<MembershipForm />} />
        <Route path='/dashboard' element={<Membership />} />
        <Route path='/list-of-members' element={<ListofMembers />} />
        <Route path='/prefect' element={<Prefect />} />
        <Route path='/create-prefect' element={<CreateUser />} />
        <Route path='/list-of-members/:id' element={<Member />} />
        <Route path='/prefect/monthly-accounts' element={<MonthlyAccounts />} />
        <Route path='/prefect/monthly-accounts/year-month' element={<AccountDetails />} />
        <Route path='/prefect/ration-list' element={<RationList />} />
        <Route path='/prefect/ration-list/:date' element={<MonthlyRationList />} />
        <Route path='/students' element={<Students />} />
        <Route path='/junior-prefect' element={<JuniorPrefect />} />
        <Route path='/junior-prefect/daily-accounts' element={<DailyAccounts />} />
        <Route path='/students/personal-details' element={<PersonalDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
