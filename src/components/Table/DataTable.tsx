import React, { useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

interface DataTableProps {
    data: any[]
    columns: Array<{ label: string; key: string }>
    rowsPerPage: number
}

const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    rowsPerPage,
}) => {
    console.log(data)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const totalPages = Math.ceil(data.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const sortedData = [...data].sort((a, b) => {
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

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                onClick={() => {
                                    handleSort(column.key)
                                }}
                            >
                                {column.label}
                                {renderSortIndicator(column.key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData
                        .slice(startIndex, endIndex)
                        .map((row, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-4 whitespace-nowrap"
                                    >
                                        {row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
            <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing {startIndex + 1} to{' '}
                        {Math.min(endIndex, data.length)} of {data.length}{' '}
                        entries
                    </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                        onClick={() => {
                            handlePageChange(currentPage - 1)
                        }}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => {
                            handlePageChange(currentPage + 1)
                        }}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default DataTable
