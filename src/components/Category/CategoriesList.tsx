import React from 'react'
import { Button, Card, Typography } from '@material-tailwind/react'
import AddCategory from './AddCategory'
import type { RootState } from '../../interface'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from '../redux/slice/slice'

const TABLE_HEAD = ['Category Name', 'Description', 'Created On', '']

const CategoriesList: React.FC = () => {
    const TABLE_ROWS = useSelector(
        (state: RootState) => state.category.category
    )
    console.log(TABLE_ROWS)
    const dispatch = useDispatch()
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center overflow-scroll">
                <div>
                    <AddCategory />
                </div>
                <Card className="w-3/5 mt-4">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
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
                            {TABLE_ROWS.map((category) => (
                                <tr
                                    key={category.title}
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
                                        <Typography
                                            variant="small"
                                            color="blue"
                                            className="font-medium"
                                            onClick={() => <AddCategory />}
                                        >
                                            Edit
                                        </Typography>
                                        <Button
                                            variant="text"
                                            color="red"
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
