import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import PageNotFound from './components/404/PageNotFound';
import Createform from './components/CreateForm/Createform';
import Header from './components/Header/Header';

function App() {
  return (
    <div className='bg-[#e7f2fe] min-h-screen flex flex-col justify-center items-center '>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createform' element={<Createform />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
    
  );
}

export default App;
