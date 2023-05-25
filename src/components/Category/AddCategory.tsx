import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Textarea } from '@material-tailwind/react'
import React, { Fragment, useState } from 'react'

type Props = {
  name?: 'string',
  description?: 'string',
}

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
            <Input label='Category Name' />
            <Textarea label='Category Description' />
            {/* <input type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-[#005ae6]
                            hover:file:bg-violet-100" /> */}
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