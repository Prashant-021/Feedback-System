import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Textarea } from '@material-tailwind/react'
import React, { Fragment, useState } from 'react'

type Props = {}

const AddCategory = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <Fragment>
      <Button className='' onClick={handleOpen} variant="gradient">
        Add Category
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Category</DialogHeader>
        <DialogBody className='flex justify-center ' divider>
          <div className="flex flex-col gap-4">
            <Input label='Category Name'/>
            <Textarea label='Category Description' />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}

export default AddCategory