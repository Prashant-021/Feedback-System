import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginSchema } from '../../schema'
import { type currentUser, type RootState } from '../../interface'
import { useSelector } from 'react-redux'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    // Checkbox,
    Input,
    Typography,
} from '@material-tailwind/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { successNotify } from '../../utils'

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
                    successNotify('Welcome Back!!')
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
        <div className="flex h-screen w-full">
            <div className="w-[50%] bg-[#005ae6] items-center hidden md:flex">
                <div className="w-[100%] justify-center flex">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        alt=""
                        height={'70%'}
                        width={'70%'}
                    />
                </div>
            </div>
            <div className="w-screen md:w-1/2 bg-blue-50 p-5 flex flex-col justify-center items-center">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Log In
                        </Typography>
                    </CardHeader>
                    <form action="" onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <div className="inputGroup py-2 mb-2 ">
                                <Input
                                    label="Email"
                                    name="Email"
                                    type="text"
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {Boolean(errors.Email) &&
                                    Boolean(touched.Email) && (
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
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label
                                        className="absolute right-3 top-[0.6rem] hidden group-hover:block"
                                        htmlFor="togglePassword"
                                        onClick={() => {
                                            setshowPassword(
                                                (prevshowPassword) =>
                                                    !prevshowPassword
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
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type="submit" variant="gradient" fullWidth>
                                Log In
                            </Button>
                            <Typography
                                variant="small"
                                className="mt-6 flex justify-center"
                            >
                                Don&apos;t have an account?
                                <Link to={'/signup'}>
                                    <span className="ml-1 font-bold text-blue-400">
                                        Register
                                    </span>
                                </Link>
                            </Typography>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Login
