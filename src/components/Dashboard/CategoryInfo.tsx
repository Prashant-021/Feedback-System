import React, { useState } from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Typography,
} from '@material-tailwind/react'
import { type ICategory } from '../../interface'
import {
    PencilIcon,
    // DocumentPlusIcon,
    // LinkIcon,
    TrashIcon,
} from '@heroicons/react/24/solid'
import { deleteCategory } from '../redux/slice/slice'
import { useDispatch } from 'react-redux'
import AddCategory from '../Category/AddCategory'
import { useNavigate } from 'react-router-dom'

interface Props {
    categoryValue: ICategory
}

const CategoryInfo: React.FC<Props> = (categoryValue) => {
    const [open, setOpen] = useState(false)

    const handleOpen = (): void => {
        setOpen(!open)
    }
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <Card className="mt-6 w-60">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {categoryValue.categoryValue.title}
                </Typography>
                <Typography>
                    {categoryValue.categoryValue.description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-evenly">
                <Tooltip content="View Responses">
                    <Button
                        onClick={() => {
                            Navigate('/formResponse')
                        }}
                    >
                        View
                    </Button>
                </Tooltip>
                <Tooltip content="Edit Category">
                    <IconButton
                        variant="outlined"
                        color="blue-gray"
                        onClick={() => {
                            setOpen(!open)
                        }}
                    >
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <AddCategory
                    open={open}
                    handleOpen={handleOpen}
                    editCategory={categoryValue.categoryValue}
                />
                <Tooltip content="Delete Category">
                    <IconButton
                        variant="outlined"
                        color="red"
                        onClick={() => {
                            const response = confirm(
                                'Are you sure want to delete ?'
                            )
                            if (response)
                                dispatch(
                                    deleteCategory(
                                        categoryValue.categoryValue.title
                                    )
                                )
                        }}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </CardFooter>
        </Card>
    )
}

export default CategoryInfo
