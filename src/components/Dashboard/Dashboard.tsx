import { Button, Card } from '@material-tailwind/react'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type ICategory, type RootState } from '../../interface'
import CategoryInfo from './CategoryInfo'

import { PlusIcon } from '@heroicons/react/24/solid'
import AddCategory from '../Category/AddCategory'

const Dashboard: React.FC = () => {
    const users = useSelector((state: RootState) => state.user?.userList)
    const loggedInUser = sessionStorage.getItem('currentUser')
    const user = users.find((user) => user.email === loggedInUser)
    const Navigate = useNavigate()
    const categoryList = useSelector(
        (state: RootState) => state.category.category
    )
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    )
    console.log(selectedCategory)
    useEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])

    const handleOpen = (): void => {
        setOpen(!open)
        setSelectedCategory(null)
    }

    return (
        <>
            {user != null ? (
                <div className="w-full m-8 flex gap-4 flex-wrap justify-start max-h-[78vh] h-fit overflow-scroll">
                    <Card className="mt-6 w-60">
                        <Button
                            className="justify-center flex"
                            onClick={handleOpen}
                        >
                            <PlusIcon className="h-40 w-40" />
                        </Button>
                        <AddCategory open={open} handleOpen={handleOpen} />
                    </Card>
                    {categoryList.map((category): JSX.Element => {
                        return (
                            <CategoryInfo
                                key={nanoid()}
                                categoryValue={category}
                            />
                        )
                    })}
                </div>
            ) : (
                <></>
            )}
        </>
    )
}
export default Dashboard
