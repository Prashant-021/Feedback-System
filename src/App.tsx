import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import PageNotFound from './components/404/PageNotFound';
import Createform from './components/CreateForm/Createform';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';

function App() {
  const title = useLocation()
  let showHeader:boolean = false
  if(title.pathname.includes('/login') || title.pathname.includes('/signup') || title.pathname === '/' )
    showHeader = true
  return (
    <div className='bg-[#e7f2fe] min-h-screen flex flex-col justify-center items-center '>
      {showHeader? <></> :<Header />}
      {/* <div className="flex justify-center items-center  w-full"> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createform' element={<Createform />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      {/* </div> */}
      {showHeader? <></> :<Footer />}
    </div>

  );
}

export default App;
