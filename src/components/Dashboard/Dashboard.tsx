import { Button, Card, Tooltip, Typography } from '@material-tailwind/react'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useReducer, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type ICategory, type RootState } from '../../interface'
import CategoryInfo from './CategoryInfo'

import { PlusIcon } from '@heroicons/react/24/solid'
import AddCategory from '../Category/AddCategory'
import CategoryService from '../../FirebaseFiles/handle/categoryFunctions'
import Loader from '../Loader/Loader'
import { setInitialCategory } from '../redux/slice/slice'
import { errorNotify } from '../../utils'

const Dashboard: React.FC = () => {
    const users = useSelector((state: RootState) => state.user?.userList)
    const dispatch = useDispatch()
    const loggedInUser = sessionStorage.getItem('currentUser')
    const user = users.find((user) => user.email === loggedInUser)
    const Navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [categoryList, setCategoryList] = useState<ICategory[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [state, increment] = useReducer((state: number) => state + 0.0001, 0)
    useEffect(() => {
        setIsLoading(true)
        CategoryService.getAllCategory()
            .then((querySnapshot) => {
                const data: ICategory[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as ICategory)
                })
                if (JSON.stringify(data) !== JSON.stringify(categoryList)) {
                    setCategoryList(data)
                    dispatch(setInitialCategory(data))
                }
                setIsLoading(false)
            })
            .catch((err) => {
                errorNotify(err)
                setIsLoading(false)
            })
    }, [state])
    useEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])

    const handleOpen = (): void => {
        setOpen(!open)
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            {user != null ? (
                <div className="w-full">
                    <div className="bg-white rounded-lg p-3 mb-2 m-8">
                        <Typography variant="h4" className="mb-3 ">
                            <span className="text-blue-800">Category List</span>
                        </Typography>
                    </div>
                    <div className=" m-8 pb-3  flex justify-center items-center h-fit">
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:w-[90%]">
                            <Tooltip content="Add Category">
                                <Card className=" w-60 scale-95 hover:scale-100 transition-scale duration-300">
                                    <Button
                                        variant="text"
                                        className="justify-center flex hover:bg-blue-400"
                                        onClick={handleOpen}
                                    >
                                        <PlusIcon className="h-40 w-40 text-[#e2e2e2]" />
                                    </Button>
                                    <AddCategory
                                        open={open}
                                        handleOpen={handleOpen}
                                        updateList={increment}
                                    />
                                </Card>
                            </Tooltip>
                            {categoryList?.map((category): JSX.Element => {
                                return (
                                    <CategoryInfo
                                        key={nanoid()}
                                        categoryValue={category}
                                        updateList={increment}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}
export default Dashboard
