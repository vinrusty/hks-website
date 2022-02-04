import React from 'react';
import MembershipForm from './components/MembershipForm';
import LoginForm from './components/LoginForm';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<MembershipForm />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
