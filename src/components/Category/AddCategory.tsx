import React, { Fragment, useEffect, useState } from 'react'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Textarea,
} from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategory } from '../redux/slice/slice'
import type { ICategory, RootState } from '../../interface'
import { errorNotify, getDate, successNotify } from '../../utils'
import CategoryService from '../../FirebaseFiles/handle/categoryFunctions'
import { nanoid } from '@reduxjs/toolkit'

interface Props {
    open: boolean
    handleOpen: () => void
    updateList: () => void
    editCategory?: ICategory
}

const AddCategory: React.FC<Props> = ({
    open,
    handleOpen,
    editCategory,
    updateList,
}) => {
    const date = new Date()
    const [categoryId, setCategoryId] = useState<string>('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    const storedCategory = useSelector(
        (state: RootState) => state.category.category
    )

    useEffect(() => {
        if (editCategory != null) {
            setIsEdit(true)
            setCategoryId(editCategory.id)
            setCategoryName(editCategory.title)
            setCategoryDescription(editCategory.description)
        } else {
            setIsEdit(false)
            setCategoryName('')
            setCategoryDescription('')
        }
    }, [editCategory])

    const clearInputs = (): void => {
        setCategoryName('')
        setCategoryDescription('')
    }
    const handleSave = (): void => {
        if (categoryName === '') {
            alert('Please enter a category name')
        } else {
            if (categoryDescription === '') {
                alert('Please enter a category description')
            } else {
                if (categoryName.length > 15) {
                    alert('Category name Should be less than 15 Characters')
                } else {
                    const categoryExist = storedCategory.find(
                        (c) => c.title === categoryName
                    )
                    if (isEdit) {
                        dispatch(
                            updateCategory({
                                id: categoryId,
                                title: categoryName,
                                description: categoryDescription,
                                createdDate: getDate(date),
                            })
                        )
                        CategoryService.updateCategory(categoryId, {
                            id: categoryId,
                            title: categoryName,
                            description: categoryDescription,
                            createdDate: getDate(date),
                        })
                            .then(() => {
                                successNotify('Category updated successfully')
                                updateList()
                            })
                            .catch((err) => {
                                console.log('Error updating category', err)
                            })
                    } else {
                        if (categoryExist !== undefined) {
                            errorNotify('Category Already exists')
                        } else {
                            dispatch(
                                addCategory({
                                    id: nanoid(),
                                    title: categoryName,
                                    description: categoryDescription,
                                    createdDate: getDate(date),
                                })
                            )
                            CategoryService.addCategory({
                                id: nanoid(),
                                title: categoryName,
                                description: categoryDescription,
                                createdDate: getDate(date),
                            })
                                .then(() => {
                                    successNotify('Category added successfully')
                                    updateList()
                                })
                                .catch((err) => {
                                    errorNotify(err)
                                })
                        }
                    }
                }
            }
            clearInputs()
            handleOpen()
        }
    }
    return (
        <Fragment>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    {isEdit ? 'Update' : 'Add'} Category
                </DialogHeader>
                <DialogBody className="flex justify-center " divider>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="Category Name"
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value)
                            }}
                        />
                        <Textarea
                            label="Category Description"
                            value={categoryDescription}
                            onChange={(e) => {
                                setCategoryDescription(e.target.value)
                            }}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            clearInputs()
                            handleOpen()
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleSave}
                    >
                        <span>{isEdit ? 'Update' : 'Add'}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    )
}

export default AddCategory
