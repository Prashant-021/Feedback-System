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
                <div className="w-full justify-center sm:justify-start m-8 flex flex-wrap h-fit gap-14">
                    <CategoryInfo/>
                    <CategoryInfo/>
                    <CategoryInfo/>
                    <CategoryInfo/>
                    <CategoryInfo/>
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