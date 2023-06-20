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
    const categoryType = path[path.length - 1]
    const Navigate = useNavigate()
    const [TABLE_ROWS, setTableRows] = useState<IFormResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])
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
            <div className="bg-white rounded-lg p-5 mt-5 w-[98%] flex justify-between items-center">
                <Typography variant="h2" className=" ">
                    <span className="text-blue-800">Form Responses</span>
                </Typography>
            </div>
            <div className="my-4 w-[98%]">
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
            <div className="w-[98%] flex items-center justify-center">
                <Card className="overflow-x-scroll h-[60vh] w-full">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr className="sticky top-0 z-20 border-blue-400 bg-blue-500">
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b p-4">
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="font-normal leading-none bg-blue-500"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.length !== 0 ? (
                                TABLE_ROWS.map(({ Email }, index) => (
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
                                ))
                            ) : (
                                <tr className=" h-full">
                                    <td colSpan={3} className="h-[52vh]">
                                        <div className="w-full flex justify-center">
                                            No Responses avaliable
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}
export default ViewFormResponse
