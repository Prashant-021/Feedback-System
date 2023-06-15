import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import FormResponseService from '../../FirebaseFiles/handle/responseFunctions'
import { type IFormTemplate } from '../../interface'
import Loader from '../Loader/Loader'
import { nanoid } from '@reduxjs/toolkit'

interface IFormResponse extends IFormTemplate {
    Email: string
}

const TABLE_HEAD = ['Email', 'View Response']
const ViewFormResponse: React.FC = () => {
    const location = useLocation()
    const path = location.pathname.split('/')
    const categoryType = path[path.length - 1].toLowerCase()
    const Navigate = useNavigate()
    const [TABLE_ROWS, setTableRows] = useState<IFormResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        FormResponseService.getAllResponse(categoryType)
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
        <div className="w-full min-h-min flex flex-col flex-grow items-center">
            <div className="my-4 w-[90%]">
                <Typography variant="h2" className="mb-3 ">
                    {/* Category:{' '} */}
                    <span className="text-blue-800">{categoryType}</span>
                </Typography>
                <Button
                    className="float-left items-center gap-3"
                    color="blue"
                    onClick={() => {
                        Navigate('/formresponse', {
                            state: {
                                category: categoryType,
                            },
                        })
                    }}
                >
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                </Button>
            </div>
            <div className="w-[90%] flex items-center justify-center">
                <Card className="overflow-scroll h-full w-full">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-400 bg-blue-500 p-4 "
                                    >
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="font-normal leading-none"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ Email }, index) => (
                                <tr
                                    key={nanoid()}
                                    className="even:bg-blue-gray-50/50"
                                >
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {Email ?? 'Not Provided'}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Button
                                            size="sm"
                                            variant="text"
                                            onClick={() => {
                                                Navigate(
                                                    '/formResponse/individualform',
                                                    {
                                                        state: {
                                                            category:
                                                                TABLE_ROWS[
                                                                    index
                                                                ],
                                                        },
                                                    }
                                                )
                                            }}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue"
                                                className="font-medium"
                                            >
                                                View
                                            </Typography>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}
export default ViewFormResponse
