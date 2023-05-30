import React, { Fragment, useState } from 'react'
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Textarea } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../redux/slice/slice'
import type { RootState } from '../../interface'

const AddCategory: React.FC = () => {
  const date = new Date()
  const [open, setOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')

  const handleOpen = (): void => {
    setOpen(!open)
  }
  const dispatch = useDispatch()
  const storedCategory = useSelector((state: RootState) => state.category.category)
  const handleSave = (): void => {
    if (categoryName !== '' && categoryDescription !== '') {
      const categoryExist = storedCategory.find(c => c.title === categoryName)
      if (categoryExist !== undefined) {
        alert('Category Already exists')
      } else {
        dispatch(addCategory({ title: categoryName, description: categoryDescription, createdDate: getDate(date) }))
      }
    }
    setOpen(!open)
  }
  const getDate = (dateTime: Date): string => {
    return `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
  }

  return (
    <Fragment>
      <Button className="" onClick={handleOpen} variant="gradient">
        Add Category
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Category</DialogHeader>
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
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSave}>
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}

export default AddCategory
