import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { EyeIcon } from '@heroicons/react/24/solid'
import {
    Card,
    Typography,
    Option,
    CardBody,
    Tooltip,
    IconButton,
    Select,
} from '@material-tailwind/react'
import { type RootState, type IFormTemplate } from '../../interface'
// import { useNavigate } from 'react-router-dom'
import FormService from '../../FirebaseFiles/handle/requestFunctions'
import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Loader from '../Loader/Loader'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

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
    const categories = useSelector(
        (state: RootState) => state.category.category
    )
    const [categoryType, setCategoryType] = useState<string>(category)
    console.log(categoryType)
    useEffect(() => {
        FormService.getAllForms(categoryType)
            .then((querySnapshot) => {
                const data: IFormResponse[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as IFormResponse)
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
        <div className="flex-grow w-full flex-col flex items-center ">
            <div className="w-[90%]">
                <Card className="flex my-4 bg-white w-fit p-4 justify-end rounded-md gap-24">
                    <div className="w-72">
                        <Select
                            label="Select Category"
                            value={categoryType}
                            onChange={(event) => {
                                setCategoryType(event as string)
                            }}
                        >
                            {categories.map((category) => {
                                return (
                                    <Option
                                        key={category.id}
                                        value={category.title}
                                    >
                                        {category.title}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                </Card>
                <Card className="overflow-hidden w-full">
                    <CardBody className="p-0 overflow-scroll px-0 h-[30rem]">
                        <table className=" w-full min-w-max table-auto text-left">
                            <thead>
                                <tr className="sticky top-0 ">
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="cursor-pointer border-y  border-blue-400 bg-blue-500 p-4"
                                        >
                                            <Typography
                                                variant="medium"
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
                                            <tr key={nanoid()}>
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
        </div>
    )
}

export default CategoryWiseForm
