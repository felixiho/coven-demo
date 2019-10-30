import React from 'react';
import {Router} from '@reach/router';
import Login from './Login/Index';
import ForgotPassword from './Login/ForgotPassword';
import Dashboard from './Dashboard/Index';

function App() {
  return (
    <Router>
      <Login  path="/" />
      <Dashboard path="/dashboard" />
      <ForgotPassword path="/reset-password" />
    </Router>
  );
}

export default App;
