import { EyeIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import {
    Card,
    Typography,
    CardBody,
    Tooltip,
    IconButton,
    Button,
} from '@material-tailwind/react'
import { type IFormTemplate } from '../../interface'
import FormService from '../../FirebaseFiles/handle/requestFunctions'
import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Loader from '../Loader/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import CategoryService from '../../FirebaseFiles/handle/categoryFunctions'
import { errorNotify } from '../../utils'

interface IFormResponse extends IFormTemplate {
    Email: string
    noOfResponses: number
}
type IColumn = Record<string, string>

const TABLE_HEAD = [
    { label: 'Category', key: 'Category' },
    { label: 'Forms', key: 'Forms' },
    { label: 'No of Responses', key: 'NoOfResponses' },
    { label: 'View Responses', key: 'View Responses' },
]
const columns: Array<{ label: string; key: string }> = TABLE_HEAD
const CategoryWiseForm: React.FC = () => {
    const location = useLocation()
    const { category } = location.state
    const [TABLE_ROWS, setTableRows] = useState<IFormResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const Navigate = useNavigate()
    const [categories, setCategories] = useState<string[]>([])
    const [categoryType, setCategoryType] = useState<string>(category)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
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
    const getRows = (): IColumn[] => {
        const rows: IColumn[] = []
        TABLE_ROWS.map(async (row) =>
            rows.push({
                Id: row.id,
                Category: row.categoryName,
                NoOfResponses: String(row.responseCount),
                Forms: row.title,
            })
        )
        return rows
    }

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
                errorNotify(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [categoryType])
    const TableRows = getRows()
    const rowsPerPage = 5

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
        <div className="w-full items-center flex flex-col ms-2">
            <div className="bg-white rounded-lg p-3 my-5 w-[98%] flex justify-between items-center">
                <Typography variant="h4" className=" ">
                    <span className="text-blue-800">Form List</span>
                </Typography>
                <div className="w-72">
                    <select
                        className=" py-2 outline-0 float-right border-b-2 drop-shadow-2xl border-blue-400"
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
            <Card className="overflow-hidden w-[98%] mb-4 ">
                <CardBody className="p-0 px-0">
                    <div className="bg-white shadow overflow-hidden table-fixed sm:rounded-lg ">
                        <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 ">
                            <div className="hidden sm:block">
                                <p className="text-sm text-gray-700">
                                    Showing {startIndex + 1} to{' '}
                                    {Math.min(endIndex, TableRows.length)} of{' '}
                                    {TableRows.length} entries
                                </p>
                            </div>
                            <div className="flex-1 flex justify-between sm:justify-end gap-3">
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
                                    className="relative inline-flex items-center px-4 py-2  text-sm font-medium"
                                    onClick={() => {
                                        handlePageChange(currentPage + 1)
                                    }}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </nav>
                        <div className="overflow-x-scroll h-[50vh]">
                            <table className="min-w-full divide-y  divide-gray-200">
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
                                                <div className="flex">
                                                    <Typography variant="small">
                                                        {column.label}
                                                    </Typography>
                                                    {index < columns.length - 1
                                                        ? renderSortIndicator(
                                                              column.key
                                                          )
                                                        : ''}
                                                </div>
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
                                                            <Tooltip content="View Responses">
                                                                <IconButton
                                                                    variant="outlined"
                                                                    color="blue"
                                                                    onClick={(): void => {
                                                                        Navigate(
                                                                            `/formresponse/${row.Category}`
                                                                        )
                                                                    }}
                                                                >
                                                                    <EyeIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default CategoryWiseForm
