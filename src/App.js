import React, { useState, useEffect } from 'react';
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
import Register from './components/Students/Register';
import HostelStudents from './components/Prefect/HostelStudents';
import IndivisualStudent from './components/Prefect/IndivisualStudent';
import './App.css';
import Navbar from './components/Navbar';

function App() {

  const URL = 'https://rocky-reef-88825.herokuapp.com/'
  // const URL = 'http://localhost:3001/'
  const [user, setUser] = useState({})

  const loadUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <div className='app'>
    <Router>

    <Navbar url={URL} user={user} loadUser={loadUser} />
      <Routes>
        <Route path='/' element={<LoginForm url={URL} loadUser={loadUser} />} />
        <Route path='/dashboard/:id' element={<Membership url={URL} id={user.userid} role={user.role} />} />
        <Route path='/prefect' element={<Prefect url={URL} id={user.userid} role={user.role} />} />
        {
          user.role === "manager" ?
          <>
          <Route path='/register' element={<MembershipForm url={URL} id={user.userid} />} />
          <Route path='/list-of-members' element={<ListofMembers url={URL} id={user.userid} role={user.role} />} />
          <Route path='/create-prefect' element={<CreateUser url={URL} id={user.userid} role={user.role} />} />
          </>
          :
          <></>
        }
        <Route path='/list-of-members/:id' element={<Member url={URL} id={user.userid} role={user.role} />} />
        <Route path='/prefect/monthly-accounts' element={<MonthlyAccounts url={URL} id={user.userid} role={user.role} />} />
        <Route path='/prefect/monthly-accounts/:id' element={<AccountDetails url={URL} userid={user.userid} role={user.role} />} />
        <Route path='/prefect/ration-list' element={<RationList url={URL} id={user.userid} role={user.role} />} />
        <Route path='/prefect/ration-list/:date' element={<MonthlyRationList url={URL} id={user.userid} role={user.role} />} />
        <Route path='/students' element={<Students url={URL} id={user.userid} role={user.role} />} />
        <Route path='/junior-prefect' element={<JuniorPrefect url={URL} id={user.userid} role={user.role} />} />
        <Route path='/prefect/hostel-students' element={<HostelStudents url={URL} id={user.userid} role={user.role} phone={user.phone} />} />
        <Route path='/junior-prefect/daily-accounts' element={<DailyAccounts url={URL} id={user.userid} role={user.role} />} />
        <Route path='/prefect/hostel-students/:phone' element={<IndivisualStudent url={URL} id={user.userid} role={user.role} />} />
        <Route path='/students/personal-details' element={<PersonalDetails url={URL} id={user.userid} role={user.role} username={user.name} userphone={user.phone} />} />
        <Route path='/students/registar' element={<Register url={URL} id={user.userid} role={user.role} username={user.name} userphone={user.phone} />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
