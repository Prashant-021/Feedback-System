import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginSchema } from '../../schema'
import { type currentUser } from '../../interface'
// import { useSelector } from 'react-redux'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from '@material-tailwind/react'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
import { errorNotify, successNotify } from '../../utils'
// import UserService from '../../FirebaseFiles/handle/userInfo'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../FirebaseFiles/FirebaseSetup'

const initialValues: currentUser = {
    Email: '',
    password: '',
}
const Login: React.FC = () => {
    const [showPassword, setshowPassword] = useState<boolean>(false)
    const Navigate = useNavigate()
    // const users = useSelector((state: RootState) => state.user?.userList)

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
        // setFieldError,
    } = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values: currentUser) => {
            signInWithEmailAndPassword(auth, values.Email, values.password)
                .then(() => {
                    successNotify('Welcome')
                    Navigate('/dashboard')
                })
                .catch((err) => {
                    errorNotify(err.message)
                })
        },
    })
    return (
        <div className="flex h-screen w-full">
            <div className="w-[50%]  items-center hidden md:flex">
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
                        className="mb-4 grid h-20 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Log In
                        </Typography>
                    </CardHeader>
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <CardBody className="flex flex-col gap-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="Email"
                                        name="Email"
                                        type="email"
                                        autoComplete="Email"
                                        value={values.Email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2 ">
                                    <div className="group relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className="block w-full rounded-md outline-0 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    </div>

                                    <input
                                        type="checkbox"
                                        className="outline-0 hidden"
                                        name="togglePassword"
                                    />
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
