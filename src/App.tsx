import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/Signup/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import FormList from './components/Form/FormList/Formlist'
import Createform from './components/Form/Createform'
import Header from './components/Header/Header'
import Profile from './components/Profile/Profile'
import Sidebar from './components/Sidebar/Sidebar'
import DefaultSpeedDial from './components/Sidebar/Speeddial'
import Viewform from './components/Form/Viewform'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CategoryWiseForm from './components/FormResponses/CategoryWiseForm'
import ViewFormResponse from './components/FormResponses/ViewFormResponse'
import IndividualResponse from './components/FormResponses/IndividualResponse'
import ErrorBoundary from './components/404/ErrorBoundary'
import PageNotFound from './components/404/PageNotFound'
import { auth } from './FirebaseFiles/FirebaseSetup'

const App: React.FC = () => {
    const title = useLocation()
    let hideHeader: boolean = false
    const [userLoggedin, setUserLoggedin] = useState(false)
    useEffect(() => {
        auth.onAuthStateChanged(() => {
            console.log(user)
        })
    }, [])

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

                <div className="w-[98%] sm:ms-16 flex">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <ErrorBoundary>
                                    <Login />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <ErrorBoundary>
                                    <Dashboard />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <ErrorBoundary>
                                    <Signup />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ErrorBoundary>
                                    <Dashboard />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/forms"
                            element={
                                <ErrorBoundary>
                                    <FormList />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/forms/createform/:id"
                            element={
                                <ErrorBoundary>
                                    <Createform />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/forms/viewform/:id"
                            element={
                                <ErrorBoundary>
                                    <Viewform />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/formresponse"
                            element={
                                <ErrorBoundary>
                                    <CategoryWiseForm />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/formresponse/individualform"
                            element={
                                <ErrorBoundary>
                                    <IndividualResponse />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/formresponse/:category"
                            element={
                                <ErrorBoundary>
                                    <ViewFormResponse />
                                </ErrorBoundary>
                            }
                        />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
