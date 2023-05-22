import { Avatar, Button } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../interface'


const Header = () => {
    const Navigate = useNavigate()
    const title = useLocation()
    const users = useSelector((state: RootState) => state.user?.userList);
    const loggedInUser = sessionStorage.getItem('currentUser');
    const user = users.find(user => user.email === loggedInUser)
    const handleSubmit = () => {
        Navigate('/login')
        sessionStorage.clear()
    }


    return (
        title.pathname.includes('/login') || title.pathname.includes('/signup') || title.pathname === '/'? <></> :
            <nav className="bg-white  h-22 w-full border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{title.pathname.replace('/', '').toUpperCase()}</span>
                    <div className="flex items-center md:order-2">
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <Avatar src={user?.profilepicture as string} alt="user" />
                        </button>
                        <Button className='ms-2 py-2 float-right px-8 bg-[#005ae6] rounded-md text-white hover:bg-black ' onClick={handleSubmit}>Logout</Button>

                    </div>  

                </div>
            </nav>
    )
}

export default Header