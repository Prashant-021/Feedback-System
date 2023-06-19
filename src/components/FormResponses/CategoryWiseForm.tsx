import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { EyeIcon } from '@heroicons/react/24/solid'
import {
    Card,
    Typography,
    // Option,
    CardBody,
    Tooltip,
    IconButton,
} from '@material-tailwind/react'
import {
    type IFormTemplate,
    // type ICategory,
    // type RootState,
} from '../../interface'
// import { useNavigate } from 'react-router-dom'
import FormService from '../../FirebaseFiles/handle/requestFunctions'
import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Loader from '../Loader/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import CategoryService from '../../FirebaseFiles/handle/categoryFunctions'
import { errorNotify } from '../../utils'
// import { useSelector } from 'react-redux'

// let categories: ICategory[] = []
interface IFormResponse extends IFormTemplate {
    Email: string
}

const TABLE_HEAD = ['Category', 'Forms', 'View Responses']
const CategoryWiseForm: React.FC = () => {
    const location = useLocation()
    const { category } = location.state
    const [TABLE_ROWS, setTableRows] = useState<IFormResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const Navigate = useNavigate()
    const [categories, setCategories] = useState<string[]>([])
    const [categoryType, setCategoryType] = useState<string>(category)
    useEffect(() => {
        setIsLoading(true)
        CategoryService.getAllCategory()
            .then((querySnapshot) => {
                const data: string[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data().title)
                })
                if (JSON.stringify(data) !== JSON.stringify(categories)) {
                    setCategories(data)
                }
                setIsLoading(false)
            })
            .catch((err) => {
                errorNotify(err)
                setIsLoading(false)
            })
    }, [])
    useEffect(() => {
        setIsLoading(true)
        FormService.getAllForms(categoryType)
            .then((querySnapshot) => {
                const data: IFormResponse[] = []
                const categoriesList: string[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as IFormResponse)
                    categoriesList.push(doc.data().categoryName)
                })
                if (JSON.stringify(data) !== JSON.stringify(TABLE_ROWS)) {
                    setTableRows(data)
                }
            })
            .catch((error) => {
                console.error('Error fetching forms:', error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [categoryType])
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full items-center flex flex-col ms-2">
            <div className="bg-white rounded-lg p-5 my-5 w-[98%] flex justify-between items-center">
                <Typography variant="h2" className=" ">
                    <span className="text-blue-800">Form List</span>
                </Typography>
                <div className="w-72">
                    <select
                        className=" py-3 outline-0 float-right bg-blue-100 border-b-2 drop-shadow-2xl border-blue-400"
                        value={categoryType}
                        onChange={(event) => {
                            setCategoryType(event.target.value)
                        }}
                    >
                        <option value="All">All</option>
                        {categories.map((category) => {
                            return (
                                <option key={nanoid()} value={category}>
                                    {category}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <Card className="overflow-hidden w-[98%] ">
                <CardBody className="p-0 overflow-scroll px-0 h-[30rem]">
                    <table className=" w-full table-auto text-left">
                        <thead>
                            <tr className="sticky top-0 z-30 border-blue-400 bg-blue-500">
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y  p-4"
                                    >
                                        <Typography
                                            color="white"
                                            className="flex items-center justify-between gap-2 font-bold leading-none "
                                        >
                                            {head}{' '}
                                            {index !==
                                                TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon
                                                    strokeWidth={2}
                                                    className="h-4 w-4"
                                                />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="">
                            {TABLE_ROWS.map(
                                ({ title, categoryName, id }, index) => {
                                    const isLast =
                                        index === TABLE_ROWS.length - 1
                                    const classes = isLast
                                        ? 'p-4'
                                        : 'p-4 border-b border-blue-gray-50'

                                    return (
                                        <tr
                                            key={nanoid()}
                                            className="even:bg-blue-gray-50/50"
                                        >
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {categoryName}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {title}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="View Responses">
                                                    <IconButton
                                                        variant="text"
                                                        color="blue"
                                                        onClick={(): void => {
                                                            Navigate(
                                                                `/formresponse/${categoryName}`
                                                            )
                                                        }}
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    )
}

export default CategoryWiseForm
