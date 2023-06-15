import { Button, Card, Tooltip } from '@material-tailwind/react'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type ICategory, type RootState } from '../../interface'
import CategoryInfo from './CategoryInfo'

import { PlusIcon } from '@heroicons/react/24/solid'
import AddCategory from '../Category/AddCategory'
import CategoryService from '../../FirebaseFiles/handle/categoryFunctions'
import Loader from '../Loader/Loader'
// import categoryFunctions from '../../FirebaseFiles/handle/categoryFunctions'

const Dashboard: React.FC = () => {
    const users = useSelector((state: RootState) => state.user?.userList)
    const loggedInUser = sessionStorage.getItem('currentUser')
    const user = users.find((user) => user.email === loggedInUser)
    const Navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    )
    const [categoryList, setCategoryList] = useState<ICategory[]>()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        CategoryService.getAllCategory()
            .then((querySnapshot) => {
                const data: ICategory[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as ICategory)
                })
                if (JSON.stringify(data) !== JSON.stringify(categoryList)) {
                    setCategoryList(data)
                }
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

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
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            {user != null ? (
                <div className="w-full m-8 flex gap-4 flex-wrap justify-start max-h-[78vh] h-fit overflow-scroll">
                    <Tooltip content="Add Category">
                        <Card className="mt-6 w-60 scale-95 hover:scale-100 transition-scale duration-300">
                            <Button
                                variant="filled"
                                className="justify-center flex "
                                onClick={handleOpen}
                            >
                                <PlusIcon className="h-40 w-40" />
                            </Button>
                            <AddCategory open={open} handleOpen={handleOpen} />
                        </Card>
                    </Tooltip>
                    {categoryList?.map((category): JSX.Element => {
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
