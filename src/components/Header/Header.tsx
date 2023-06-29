import React from 'react'
import {
    // Avatar,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from '@material-tailwind/react'
// import { useSelector } from 'react-redux'
// import UserService from '../../FirebaseFiles/handle/userInfo'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../FirebaseFiles/FirebaseSetup'
import { signOut } from 'firebase/auth'
import { errorNotify } from '../../utils'
// import { type RootState } from '../../interface'

const Header: React.FC = () => {
    const Navigate = useNavigate()
    // const users = useSelector((state: RootState) => state.user?.userList)
    // const loggedInUser = JSON.parse(sessionStorage.getItem('currentUser') ?? '')
    // const user = users.find((user) => user.email === loggedInUser)
    const currentUser = auth.currentUser
    console.log(currentUser)
    function handleSubmit(value: string): void {
        Navigate(`/${value}`)
        if (value === 'login') {
            sessionStorage.clear()
            signOut(auth)
                .then(() => {
                    Navigate(`/${value}`)
                    // Sign-out successful.
                })
                .catch((error) => {
                    // An error happened.
                    errorNotify(error.message)
                })
        }
    }
    return (
        <nav className="bg-white drop-shadow-md  h-22 w-full border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
            <div className=" flex flex-wrap items-center justify-between mx-auto px-4 py-2">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white capitalize">
                    FeedBack System
                </span>
                <div className="flex items-center md:order-2">
                    <Menu placement="bottom-end">
                        <MenuHandler>
                            <button
                                type="button"
                                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                id="user-menu-button"
                                aria-expanded="false"
                                data-dropdown-toggle="user-dropdown"
                                data-dropdown-placement="bottom"
                            >
                                {' '}
                                demo
                                {/* <Avatar
                                    src={loggedInUser.ProfileImage as string}
                                    alt="user"
                                /> */}
                            </button>
                        </MenuHandler>
                        <MenuList className="divide-y divide-slate-200">
                            <MenuItem
                                onClick={() => {
                                    handleSubmit('profile')
                                }}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                className="text-red-500"
                                onClick={() => {
                                    handleSubmit('login')
                                }}
                            >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}

export default Header
