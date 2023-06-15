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
// import { useDispatch } from 'react-redux'
import AddCategory from '../Category/AddCategory'
import { useNavigate } from 'react-router-dom'
import CategoryService from '../../FirebaseFiles/handle/categoryFunctions'
import { successNotify } from '../../utils'
// import { errorNotify, successNotify } from '../../utils'
// import { errorNotify, successNotify } from '../../utils'

interface Props {
    categoryValue: ICategory
}

const CategoryInfo: React.FC<Props> = ({ categoryValue }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = (): void => {
        setOpen(!open)
    }
    const handleDelete = (id: string): void => {
        CategoryService.deleteCategory(id)
            .then(() => {
                successNotify('Form Deleted Successfully!!')
                console.log('Form deleted')
                // setRefresh((prevState) => !prevState)
            })
            .catch(() => {
                console.log('There was error deleting form')
            })
        // .finally(() => {
        //     setIsLoading(false)
        // })
    }
    const Navigate = useNavigate()
    // const Navigate = useNavigate()
    // const dispatch = useDispatch()
    return (
        <Card className="mt-6 w-60 scale-95 hover:scale-100 transition-scale duration-300">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {categoryValue.title}
                </Typography>
                <Typography>{categoryValue.description}</Typography>
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
                                // dispatch(deleteCategory(categoryValue.title))
                                console.log(categoryValue.id)
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
