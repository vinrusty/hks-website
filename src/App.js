import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MembershipForm from './components/MembershipForm';
import LoginForm from './components/LoginForm';
import Membership from './components/Membership';
import ListofMembers from './components/ListofMembers';
import Prefect from './components/Prefect';
import CreateUser from './components/Prefect/CreateUser';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<MembershipForm />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/list-of-members' element={<ListofMembers />} />
        <Route path='/prefect' element={<Prefect />} />
        <Route path='/create-prefect' element={<CreateUser />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
