import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import PageNotFound from './components/404/PageNotFound';
import Createform from './components/Form/Createform';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Addcategory from './components/Category/CategoriesList';
import DefaultSpeedDial from './components/Sidebar/Speeddial';

function App() {
  const title = useLocation()
  let hideHeader: boolean = false
  if (title.pathname.includes('/login') || title.pathname.includes('/signup') || title.pathname === '/')
    hideHeader = true
  return (
    <div className='bg-[#e7f2fe] min-h-screen flex flex-col'>
      {hideHeader ? <></> : <Header />}
      <div className="flex flex-grow">
        {hideHeader ? <></> : <><Sidebar /><DefaultSpeedDial /></>}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/categories' element={<Addcategory />} />
          <Route path='/createform' element={<Createform />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      {hideHeader ? <></> : <Footer />}
    </div>

  );
}

export default App;
