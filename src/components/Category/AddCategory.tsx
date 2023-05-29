import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Textarea } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';

type Props = {
  name?: string;
  description?: string;
};

const AddCategory = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const date = new Date();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSave = () => {
    console.log('Category Name:', categoryName);
    console.log('Category Description:', categoryDescription);
    if(categoryName !== '' && categoryDescription!== '')

      localStorage.setItem('Category', JSON.stringify([{title: categoryName,description:categoryDescription, createdDate: date}]))
  };

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
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Textarea
              label="Category Description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
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
          <Button variant="gradient" color="green" onClick={handleSave}>
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AddCategory;
