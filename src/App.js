import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MembershipForm from './components/MembershipForm';
import LoginForm from './components/LoginForm';
import Membership from './components/Membership';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<MembershipForm />} />
        <Route path='/membership' element={<Membership />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
