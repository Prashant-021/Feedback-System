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
// import { deleteCategory } from '../redux/slice/slice'
import { useDispatch } from 'react-redux'
import AddCategory from '../Category/AddCategory'
import { useNavigate } from 'react-router-dom'
import CategoryService from '../../FirebaseFiles/handle/categoryFunctions'
import { errorNotify, successNotify } from '../../utils'
import { deleteCategory } from '../redux/slice/slice'
import { truncate } from '../../utils/'

interface Props {
    categoryValue: ICategory
    updateList: () => void
}

const CategoryInfo: React.FC<Props> = ({ categoryValue, updateList }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const handleOpen = (): void => {
        setOpen(!open)
    }
    const handleDelete = (categoryId: string): void => {
        CategoryService.deleteCategory(categoryId)
            .then(() => {
                successNotify('Category deleted successfully')
                updateList()
            })
            .catch(() => {
                errorNotify(`Error deleting category`)
            })
    }
    const Navigate = useNavigate()
    return (
        <Card className=" w-60 hover:drop-shadow-lg scale-95 hover:scale-100 transition-scale duration-300">
            <CardBody className="">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {categoryValue.title}
                </Typography>
                <Typography>
                    {truncate(categoryValue.description, 20)}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-evenly">
                <Tooltip content="View Responses">
                    <Button
                        color="blue"
                        onClick={() => {
                            Navigate('/formresponse', {
                                state: {
                                    category: categoryValue.title,
                                },
                            })
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
                    editCategory={categoryValue}
                    updateList={updateList}
                />
                <Tooltip content="Delete Category">
                    <IconButton
                        variant="outlined"
                        color="red"
                        onClick={() => {
                            const response = confirm(
                                'Are you sure want to delete ?'
                            )
                            if (response) {
                                dispatch(deleteCategory(categoryValue.id))
                                handleDelete(categoryValue.id)
                            }
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
