import React, { useState } from 'react'
import { Button, Card, Typography } from '@material-tailwind/react'
import AddCategory from './AddCategory'
import type { ICategory, RootState } from '../../interface'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from '../redux/slice/slice'

const TABLE_HEAD = ['Category Name', 'Description', 'Created On', '']

const CategoriesList: React.FC = () => {
    const TABLE_ROWS = useSelector(
        (state: RootState) => state.category.category
    )
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    )

    const handleOpen = (): void => {
        setOpen(!open)
    }

    const handleEdit = (category: ICategory): void => {
        setSelectedCategory(category)
        handleOpen()
    }
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center overflow-scroll">
                <div>
                    <Button
                        className=""
                        onClick={handleOpen}
                        variant="gradient"
                    >
                        Add Category
                    </Button>
                    <AddCategory
                        open={open}
                        handleOpen={handleOpen}
                        editCategory={selectedCategory}
                    />
                </div>

                <Card className="w-3/5 mt-4 overflow-scroll h-4/5">
                    <table className="w-full min-w-max table-auto text-left ">
                        <thead className="">
                            <tr className="top-0 w-full sticky">
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b  border-blue-100  bg-blue-500 p-4"
                                    >
                                        <Typography
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
                            {TABLE_ROWS.map((category, index) => (
                                <tr
                                    key={index}
                                    className="even:bg-blue-gray-50/50"
                                >
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {category.title}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {category.description}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {category.createdDate}
                                        </Typography>
                                    </td>
                                    <td className="p-4 flex justify-evenly">
                                        <Button
                                            variant="text"
                                            color="blue"
                                            size="sm"
                                            className="font-medium"
                                            onClick={() => {
                                                handleEdit(category)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="text"
                                            color="red"
                                            size="sm"
                                            className="font-medium"
                                            onClick={() =>
                                                dispatch(
                                                    deleteCategory(
                                                        category.title
                                                    )
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </>
    )
}

export default CategoriesList
