import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginSchema } from '../../schema'
import { type currentUser, type RootState } from '../../interface'
import { useSelector } from 'react-redux'
import { Button, Input, Typography } from '@material-tailwind/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const initialValues: currentUser = {
    Email: '',
    password: '',
}
const Login: React.FC = () => {
    const [showPassword, setshowPassword] = useState<boolean>(false)
    const Navigate = useNavigate()
    const users = useSelector((state: RootState) => state.user?.userList)

    useEffect(() => {
        if (sessionStorage.length !== 0) {
            Navigate('/dashboard')
        }
    }, [Navigate])
    const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldError,
    } = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values: currentUser) => {
            const currentUser = users.find(
                (user) => values.Email === user.email
            )
            if (currentUser != null) {
                if (currentUser.password === values.password) {
                    Navigate('/dashboard')
                    sessionStorage.setItem('currentUser', values.Email)
                } else {
                    setFieldError('password', 'Wrong Password')
                }
            } else {
                setFieldError('Email', 'User not found')
            }
        },
    })
    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-[#005ae6]   hidden md:flex">
                <div className=" px-4 py-7 overflow-hidden">
                    <p className="text-4xl font-bold text-white ms-3">Login</p>
                    <div className="w-11/12">
                        <img
                            src="/img/Login/login.jpg"
                            alt=""
                            height={'100%'}
                            width={'100%'}
                        />
                    </div>
                </div>
            </div>
            <div className="w-screen md:w-1/2 bg-white p-5 flex flex-col justify-center items-center">
                <div className="w-full flex justify-center">
                    <img
                        className=" md:hidden rounded-full h-32 w-32"
                        src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="user avatar"
                    />
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="inputGroup py-2 mb-2 ">
                        <Input
                            label="Email"
                            name="Email"
                            type="text"
                            value={values.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {Boolean(errors.Email) && Boolean(touched.Email) && (
                            <Typography
                                variant="small"
                                color="red"
                                className="absolute"
                            >
                                {errors.Email}
                            </Typography>
                        )}
                    </div>
                    <div className="inputGroup pt-2 pb-3">
                        <div className="relative flex group">
                            <Input
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <label
                                className="absolute right-3 top-[0.6rem] hidden group-hover:block"
                                htmlFor="togglePassword"
                                onClick={() => {
                                    setshowPassword(
                                        (prevshowPassword) => !prevshowPassword
                                    )
                                }}
                            >
                                {showPassword ? (
                                    <EyeIcon
                                        strokeWidth={2}
                                        className="h-5 w-5"
                                    />
                                ) : (
                                    <EyeSlashIcon
                                        strokeWidth={2}
                                        className="h-5 w-5"
                                    />
                                )}
                            </label>
                            <input
                                type="checkbox"
                                className="outline-0 hidden"
                                name="togglePassword"
                            />
                        </div>
                        {Boolean(errors.password) &&
                            Boolean(touched.password) && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="absolute"
                                >
                                    {errors.password}
                                </Typography>
                            )}
                    </div>
                    <div className="submitSec w-full flex justify-center mt-7">
                        <Button
                            type="submit"
                            className="py-2 px-8 bg-[#005ae6] rounded-md text-white hover:bg-black "
                        >
                            Login
                        </Button>
                    </div>
                    <div className="infoSec py-2 text-center">
                        <p>
                            Don&#x3f;t have an account&#x3f;{' '}
                            <Link className="text-blue-500" to={'/signup'}>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
