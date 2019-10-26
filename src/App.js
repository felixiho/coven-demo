import React from 'react';
import {Router} from '@reach/router';
import Login from './Login/Index';
import Dashboard from './Dashboard/Index';

function App() {
  return (
    <Router>
      <Login  path="/" />
      <Dashboard path="/dashboard" />
    </Router>
  );
}

export default App;
