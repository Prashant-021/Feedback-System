import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../interface';
import CategoryInfo from './CategoryInfo';


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
    
    return (
        <>
            {user ? (
                // <div className="w-full m-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div className="w-full justify-center lg:justify-start m-8 flex flex-wrap h-fit gap-3">
                    <CategoryInfo/>
                    <CategoryInfo/>
                    <CategoryInfo/>
                    <CategoryInfo/>
                    <CategoryInfo/>
                    <CategoryInfo/> 
                    <CategoryInfo/> 
                    <CategoryInfo/> 
                </div>

            ) : <></>}
        </>
    )
}
export default Dashboard;