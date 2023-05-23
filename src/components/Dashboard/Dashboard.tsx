import { Button } from '@material-tailwind/react';
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../interface';


const Dashboard = () => {
    const users = useSelector((state: RootState) => state.user?.userList);
    const loggedInUser = sessionStorage.getItem('currentUser');
    const user = users.find(user => user.email === loggedInUser)
    const Navigate = useNavigate()

    useLayoutEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])
    const handleSubmit = () => {
        Navigate('/createform')
    }
    return (
        <>
            {user ? (
                <div className='w-full min-h-min flex-grow flex justify-center  '>
                    <div className="w-[80%]">
                        <div className="py-3 bg-[#e7f2fe] gap-5 flex">
                            <div className='border-transparent drop-shadow-2xl border-2  rounded-xl bg-white'>
                                <Button className='p-10 ' onClick={handleSubmit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <div>No user Avaliable</div>}
        </>
    )
}
export default Dashboard;