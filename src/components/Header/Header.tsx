import React from 'react'
import {
    Avatar,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { type RootState } from '../../interface'

const Header: React.FC = () => {
    const Navigate = useNavigate()
    const title = useLocation()
    const Heading: string[] = title.pathname.split('/')
    const users = useSelector((state: RootState) => state.user?.userList)
    const loggedInUser = sessionStorage.getItem('currentUser')
    const user = users.find((user) => user.email === loggedInUser)
    function handleSubmit(value: string): void {
        Navigate(`/${value}`)
        if (value === 'login') {
            sessionStorage.clear()
        }
    }

    return (
        <nav className="bg-white  h-22 w-full border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white capitalize">
                    {Heading[Heading.length - 1]}
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
                                <Avatar
                                    src={user?.profilepicture as string}
                                    alt="user"
                                />
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
                                onClick={() => {
                                    handleSubmit('categories')
                                }}
                            >
                                Add Category
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleSubmit('createform')
                                }}
                            >
                                Createform
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleSubmit('dashboard')
                                }}
                            >
                                Dashboard
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
