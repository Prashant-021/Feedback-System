import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { SignUpSchema } from '../../schema'
import { type RootState, type IUser } from '../../interface'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/slice/slice'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from '@material-tailwind/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { successNotify } from '../../utils'

const initialValues: IUser = {
    profilepicture: null,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const Signup: React.FC = () => {
    const users = useSelector((state: RootState) => state.user?.userList)

    const [showPassword, setshowPassword] = useState<boolean>(false)
    const Navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.length !== 0) {
            Navigate('/dashboard')
        }
    }, [Navigate])

    const dispatch = useDispatch()
    const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values: IUser) => {
            const userExists = users.find((user) => user.name === values.name)
            if (userExists == null) {
                dispatch(addUser(values))
                sessionStorage.setItem('currentUser', values.email)
                successNotify(`Welcome !!! ${values.name}`)
                Navigate('/dashboard')
            } else {
                alert('User Already Exists')
                resetForm()
            }
        },
    })

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = event.currentTarget.files?.[0]
        if (file != null) {
            const reader = new FileReader()
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                if (e.target != null) {
                    const imageUrl = e.target.result as string
                    await setFieldValue('profilepicture', imageUrl)
                }
            }
            reader.onerror = () => {
                console.error('File reading error')
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className="flex h-screen w-full">
            <div className="w-[50%] items-center hidden md:flex">
                <div className="w-[100%] justify-center flex">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt=""
                        height={'70%'}
                        width={'70%'}
                    />
                </div>
            </div>
            <div className="w-full md:w-1/2 bg-blue-50 p-5 flex flex-col justify-center items-center">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-20 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Register
                        </Typography>
                    </CardHeader>
                    <form action="" onSubmit={handleSubmit}>
                        <CardBody className="flex flex-col gap-3">
                            <div className="inputGroup pb-4 pt-3">
                                <Input
                                    label="Username"
                                    name="name"
                                    type="text"
                                    className="bg-inherit outline-0"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {Boolean(errors.name) &&
                                    Boolean(touched.name) && (
                                        <p className="text-red-600 absolute">
                                            {errors.name}
                                        </p>
                                    )}
                            </div>

                            <div className="inputGroup pb-4 pt-4">
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    className="bg-inherit outline-0 "
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {Boolean(errors.email) &&
                                    Boolean(touched.email) && (
                                        <p className="text-red-600 absolute">
                                            {errors.email}
                                        </p>
                                    )}
                            </div>
                            <div className="inputGroup pb-2 pt-4">
                                <div className="relative flex group">
                                    <Input
                                        label="Password"
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        autoComplete="off"
                                        className=" bg-inherit  outline-0 "
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
                                        <p className="text-red-600 absolute">
                                            {errors.password}
                                        </p>
                                    )}
                            </div>
                            <div className="inputGroup pb-5 pt-4">
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="off"
                                    className="bg-inherit outline-0 "
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {Boolean(errors.confirmPassword) &&
                                    Boolean(touched.confirmPassword) && (
                                        <p className="text-red-600 absolute">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                            </div>
                            <div className="inputGroup pb-4 mb-3">
                                <input
                                    name="profilepicture"
                                    type="file"
                                    className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-[#005ae6]
                            hover:file:bg-violet-100
                        "
                                    accept="image/x-png,image/gif,image/jpeg"
                                    onChange={handleFileChange}
                                    onBlur={handleBlur}
                                />
                                {Boolean(errors.profilepicture) &&
                                    Boolean(touched.profilepicture) && (
                                        <p className="text-red-600 absolute">
                                            {errors.profilepicture}
                                        </p>
                                    )}
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                type="submit"
                                // onClick={handleOpen}
                                fullWidth
                            >
                                Sign In
                            </Button>
                            <Typography
                                variant="small"
                                className="mt-6 flex justify-center"
                            >
                                Already have an account &#x3f;{' '}
                                <Link to={'/login'}>
                                    <span className="ml-1 font-bold text-blue-400">
                                        Login
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

export default Signup
