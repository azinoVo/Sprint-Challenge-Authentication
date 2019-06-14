import React from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Jokes from './components/Jokes';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Dad Jokes!</h1>
      <h2>Please Authenticate by Registering or Logging In!</h2>
      <NavLink to='/signup'>Sign-Up</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/jokes'>Jokes</NavLink>


      <Route path='/signup' component={Signup} />
      <Route path='/login' component={Login} />
      <Route path='/jokes' component={Jokes} />
    </div>
  );
}

export default App;
