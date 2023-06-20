import {
    PencilIcon,
    DocumentPlusIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    LinkIcon,
    TrashIcon,
} from '@heroicons/react/24/solid'
import {
    Card,
    Typography,
    Button,
    CardBody,
    Tooltip,
    IconButton,
} from '@material-tailwind/react'
import { type IFormTemplate } from '../../../interface'
import { useNavigate } from 'react-router-dom'
import { errorNotify, successNotify } from '../../../utils'
import FormService from '../../../FirebaseFiles/handle/requestFunctions'
import { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Loader from '../../Loader/Loader'

const TABLE_HEAD = [
    { label: 'Title', key: 'Title' },
    { label: 'Category', key: 'Category' },
    { label: 'Actions', key: 'Actions' },
]
const columns: Array<{ label: string; key: string }> = TABLE_HEAD

type IColumn = Record<string, string>
const FormList: React.FC = () => {
    const [refresh, setRefresh] = useState(false)
    const [TABLE_ROWS, setTableRows] = useState<IFormTemplate[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const Navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])

    useEffect(() => {
        setIsLoading(true)
        FormService.getAllForms()
            .then((querySnapshot) => {
                const data: IFormTemplate[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as IFormTemplate)
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
    }, [refresh])
    const createForm = (): void => {
        Navigate(`/forms/createform/${nanoid()}`, {
            state: {
                formStatus: 'add',
            },
        })
    }
    const getRows = (): IColumn[] => {
        const rows: IColumn[] = []
        TABLE_ROWS.map((row) =>
            rows.push({
                Id: row.id,
                Title: row.title,
                Category: row.categoryName,
            })
        )
        return rows
    }
    const TableRows = getRows()
    const rowsPerPage = 6
    const handleDelete = (id: string): void => {
        FormService.deleteForm(id)
            .then(() => {
                successNotify('Form Deleted Successfully!!')
                console.log('Form deleted')
                setRefresh((prevState) => !prevState)
            })
            .catch(() => {
                console.log('There was error deleting form')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const generateLink = (id: string): void => {
        const link = `${window.location.href}/viewform/${encodeURIComponent(
            id
        )}`
        navigator.clipboard
            .writeText(link)
            .then(() => {
                successNotify('Form link copied to clipboard')
            })
            .catch(() => {
                errorNotify('Failed to copy form link')
            })
        console.log(link)
    }
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
        <div className="w-full p-2 sm:p-10">
            <div className="bg-white rounded-lg flex justify-between  p-3 mb-2">
                <Typography variant="h4" className="">
                    <span className="text-blue-800">Form List</span>
                </Typography>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Button
                        className="flex items-center gap-3"
                        color="blue"
                        size="sm"
                        onClick={() => {
                            createForm()
                        }}
                    >
                        <DocumentPlusIcon strokeWidth={2} className="h-4 w-4" />{' '}
                        Add Form
                    </Button>
                </div>
            </div>
            <Card className=" w-full">
                <CardBody className="p-0 px-0 ">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:block">
                                <p className="text-sm text-gray-700">
                                    Showing {startIndex + 1} to{' '}
                                    {Math.min(endIndex, TableRows.length)} of{' '}
                                    {TableRows.length} entries
                                </p>
                            </div>
                            <div className="flex-1 flex justify-between sm:justify-end gap-3">
                                <Button
                                    className="float-left items-center gap-3"
                                    color="blue"
                                    onClick={() => {
                                        handlePageChange(currentPage - 1)
                                    }}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    className="float-left items-center gap-3"
                                    color="blue"
                                    onClick={() => {
                                        handlePageChange(currentPage + 1)
                                    }}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </nav>
                        <div className="overflow-x-scroll table-auto  h-[45vh]">
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
                                                            className="flex"
                                                        >
                                                            <Tooltip content="Edit Form">
                                                                <IconButton
                                                                    variant="text"
                                                                    color="blue-gray"
                                                                    onClick={() => {
                                                                        Navigate(
                                                                            `/forms/createform/${row.Id}`,
                                                                            {
                                                                                state: {
                                                                                    formStatus:
                                                                                        'edit',
                                                                                },
                                                                            }
                                                                        )
                                                                    }}
                                                                >
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip content="Generate Link">
                                                                <IconButton
                                                                    variant="text"
                                                                    color="blue"
                                                                    onClick={() => {
                                                                        generateLink(
                                                                            row.Id
                                                                        )
                                                                    }}
                                                                >
                                                                    <LinkIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip content="Delete">
                                                                <IconButton
                                                                    variant="text"
                                                                    color="red"
                                                                    onClick={() => {
                                                                        const response =
                                                                            confirm(
                                                                                'Are you sure want to delete ?'
                                                                            )
                                                                        if (
                                                                            response
                                                                        )
                                                                            handleDelete(
                                                                                row.Id
                                                                            )
                                                                    }}
                                                                >
                                                                    <TrashIcon className="h-4 w-4" />
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

export default FormList
