import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type RootState } from '../../interface'
import CategoryInfo from './CategoryInfo'

const Dashboard: React.FC = () => {
    const users = useSelector((state: RootState) => state.user?.userList)
    const loggedInUser = sessionStorage.getItem('currentUser')
    const user = users.find((user) => user.email === loggedInUser)
    const Navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])

    return (
        <>
            {user != null ? (
                <div className="w-full justify-center sm:justify-start m-8 flex flex-wrap h-fit gap-14">
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                    <CategoryInfo />
                </div>
            ) : (
                <></>
            )}
        </>
    )
}
export default Dashboard
