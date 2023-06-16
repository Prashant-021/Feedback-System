import { Button, Card, Tooltip } from '@material-tailwind/react'
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
    const categories = useSelector(
        (state: RootState) => state.category.category
    )
    console.log(categories)
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
            ) : (
                <></>
            )}
        </>
    )
}
export default Dashboard
