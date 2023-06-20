import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    ArrowUturnLeftIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/solid'
import FormResponseService from '../../FirebaseFiles/handle/responseFunctions'
import { type IFormTemplate } from '../../interface'
import Loader from '../Loader/Loader'

interface IFormResponse extends IFormTemplate {
    Email: string
}
type IColumn = Record<string, string>

const TABLE_HEAD = [
    { label: 'Email', key: 'Email' },
    { label: 'View Response', key: 'View Response' },
]
const columns: Array<{ label: string; key: string }> = TABLE_HEAD

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
    const getRows = (): IColumn[] => {
        const rows: IColumn[] = []
        TABLE_ROWS.map((row) =>
            rows.push({
                Email: row.Email ?? 'Not Provided',
            })
        )
        return rows
    }
    const TableRows = getRows()
    const rowsPerPage = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const totalPages = Math.ceil(TableRows.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const sortedData = [...TableRows].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortColumn] < b[sortColumn] ? -1 : 1
        } else {
            return a[sortColumn] > b[sortColumn] ? -1 : 1
        }
    })

    const handleSort = (columnKey: string): void => {
        setSortColumn(columnKey)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const handlePageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber)
    }

    const renderSortIndicator = (columnKey: string): JSX.Element | null => {
        if (columnKey === sortColumn) {
            return sortOrder === 'asc' ? (
                <ArrowUpIcon className="w-4 h-4 inline" />
            ) : (
                <ArrowDownIcon className="w-4 h-4 inline" />
            )
        }
        return null
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full min-h-min flex flex-col flex-grow items-center">
            <div className="bg-white rounded-lg p-3 mt-5 w-[98%] flex justify-between items-center">
                <Typography variant="h4" className=" ">
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
            <div className="w-[98%] flex items-center justify-center ">
                <Card className="w-full ">
                    <CardBody className="px-2 pb-0 sm:px-0">
                        <nav className="bg-white flex items-center justify-between border-t border-gray-200 sm:px-6 mb-3">
                            <div className="hidden sm:block">
                                <p className="text-sm text-gray-700">
                                    Showing {startIndex + 1} to{' '}
                                    {Math.min(endIndex, TableRows.length)} of{' '}
                                    {TableRows.length} entries
                                </p>
                            </div>
                            <div className="flex-1 flex justify-between sm:justify-end gap-2">
                                <Button
                                    variant="filled"
                                    className="relative inline-flex items-center px-4 py-2  text-sm font-medium"
                                    onClick={() => {
                                        handlePageChange(currentPage - 1)
                                    }}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="filled"
                                    onClick={() => {
                                        handlePageChange(currentPage + 1)
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-4 py-2  text-sm font-medium"
                                >
                                    Next
                                </Button>
                            </div>
                        </nav>
                        <div className="bg-white shadow overflow-x-scroll  h-[50vh]">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-500 ">
                                    <tr>
                                        {columns.map((column, index) => (
                                            <th
                                                key={column.key}
                                                className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                                                onClick={() => {
                                                    handleSort(column.key)
                                                }}
                                            >
                                                <Typography variant="small">
                                                    {column.label}
                                                </Typography>
                                                {index < columns.length - 1
                                                    ? renderSortIndicator(
                                                          column.key
                                                      )
                                                    : ''}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sortedData
                                        .slice(startIndex, endIndex)
                                        .map((row, index) => (
                                            <tr key={index}>
                                                {columns.map((column, index) =>
                                                    index <
                                                    columns.length - 1 ? (
                                                        <td
                                                            key={column.key}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                        >
                                                            {row[column.key]}
                                                        </td>
                                                    ) : (
                                                        <td
                                                            key={column.key}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                        >
                                                            <Button
                                                                size="sm"
                                                                variant="outlined"
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
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default ViewFormResponse
