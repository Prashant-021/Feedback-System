import React, { useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginSchema } from '../../schema'
import { currentUser, RootState } from '../../interface'
import { useSelector } from 'react-redux'
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react'

type Props = {}


const initialValues: currentUser = {
    Email: '',
    password: ''
}
const Login = (props: Props) => {

    const [showPassword, setshowPassword] = useState<boolean>(false)
    const Navigate = useNavigate()
    const users = useSelector((state: RootState) => state.user?.userList);
    
    useLayoutEffect(() => {
        if (sessionStorage.length !== 0) {
            Navigate('/dashboard')
        }
    }, [Navigate])
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldError } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values: currentUser) => {
            const currentUser = users.find(user => values.Email === user.email)
            if (currentUser) {
                if (currentUser.password === values.password) {
                    Navigate('/dashboard')
                    sessionStorage.setItem("currentUser", values.Email)
                }
                else {
                    setFieldError('password', 'Wrong Password')
                }
            }
            else
                setFieldError('Email', 'User not found')
        }
    })
    return (
        <div className='flex h-screen'>
            <div className='w-1/2 bg-[#005ae6]   hidden md:flex'>
                <div className=' px-4 py-7 overflow-hidden'>
                    <p className='text-4xl font-bold text-white ms-3'>Login</p>
                    <div className='w-11/12'>
                        <img src="/img/Login/login.jpg" alt="" height={"100%"} width={"100%"} />
                    </div>
                </div>
            </div>
            <div className='w-screen md:w-1/2 bg-white p-5 flex flex-col justify-center items-center'>
                <div className="w-full flex justify-center">
                    <img className=" md:hidden rounded-full h-32 w-32" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="user avatar" />
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="inputGroup py-2 mb-2 ">
                        <Input label='Email' name='Email' type="text" value={values.Email} onChange={handleChange} onBlur={handleBlur} error={errors.Email&& touched.Email  ? true : false} />
                        {errors.Email && touched.Email ? (<Typography variant="small" color="red" className="absolute">{errors.Email}</Typography>) : null}
                    </div>
                    <div className="inputGroup pt-2 pb-3">
                        <Input label='Password' name='password' type={showPassword ? "text" : "password"} value={values.password} onChange={handleChange} onBlur={handleBlur} error={errors.password && touched.password ? true : false} />
                        {errors.password && touched.password ? (<Typography variant="small" color="red" className="absolute">{errors.password}</Typography>) : null}
                    </div>
                    <div className="mt-5">
                        <Checkbox className='outline-0' label={showPassword ? "Hide Password" : "Show Password"} onClick={() => { setshowPassword(prevshowPassword => !prevshowPassword) }} name='togglePassword' />
                    </div>
                    <div className="submitSec w-full flex justify-center mt-7">
                        <Button type="submit" className='py-2 px-8 bg-[#005ae6] rounded-md text-white hover:bg-black '>Login</Button>
                    </div>
                    <div className="infoSec py-2 text-center">
                        <p>Don't have an account? <Link className='text-blue-500' to={'/signup'}>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login