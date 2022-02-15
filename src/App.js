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

  const URL = 'https://rocky-reef-88825.herokuapp.com/'

  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm url={URL} />} />
        <Route path='/register' element={<MembershipForm url={URL} />} />
        <Route path='/dashboard' element={<Membership url={URL} />} />
        <Route path='/list-of-members' element={<ListofMembers url={URL} />} />
        <Route path='/prefect' element={<Prefect url={URL} />} />
        <Route path='/create-prefect' element={<CreateUser url={URL} />} />
        <Route path='/list-of-members/:id' element={<Member url={URL} />} />
        <Route path='/prefect/monthly-accounts' element={<MonthlyAccounts url={URL} />} />
        <Route path='/prefect/monthly-accounts/:id' element={<AccountDetails url={URL} />} />
        <Route path='/prefect/ration-list' element={<RationList url={URL} />} />
        <Route path='/prefect/ration-list/:date' element={<MonthlyRationList url={URL} />} />
        <Route path='/students' element={<Students url={URL} />} />
        <Route path='/junior-prefect' element={<JuniorPrefect />} />
        <Route path='/junior-prefect/daily-accounts' element={<DailyAccounts url={URL} />} />
        <Route path='/students/personal-details' element={<PersonalDetails url={URL} />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
