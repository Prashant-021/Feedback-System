import React from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/Signup/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import PageNotFound from './components/404/PageNotFound'
import FormList from './components/Form/FormList/Formlist'
import Createform from './components/Form/Createform'
import Header from './components/Header/Header'
import Profile from './components/Profile/Profile'
import Sidebar from './components/Sidebar/Sidebar'
import DefaultSpeedDial from './components/Sidebar/Speeddial'
import Viewform from './components/Form/Viewform'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Formresponses from './components/FormResponses/Formresponses'

const App: React.FC = () => {
    const title = useLocation()
    let hideHeader: boolean = false
    if (
        title.pathname.includes('/login') ||
        title.pathname.includes('/signup') ||
        title.pathname.includes('/viewform')
    ) {
        hideHeader = true
    }
    return (
        <div className="bg-[#e7f2fe] min-h-screen relative flex flex-col">
            <ToastContainer className="z-[100]" />
            {hideHeader ? null : <Header />}
            <div className="flex flex-grow ">
                {hideHeader ? null : (
                    <>
                        <Sidebar />
                        <DefaultSpeedDial />
                    </>
                )}
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/forms" element={<FormList />} />
                    <Route
                        path="/forms/createform/:id"
                        element={<Createform />}
                    />
                    <Route path="/forms/viewform/:id" element={<Viewform />} />
                    <Route path="/formResponse" element={<Formresponses />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
