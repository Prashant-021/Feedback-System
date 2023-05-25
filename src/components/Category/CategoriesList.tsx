import React from 'react'
import {Card, Typography} from "@material-tailwind/react";

import AddCategory from './AddCategory';
const TABLE_HEAD = ["Category Name", "Description", "Created On", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    description: "Manager",
    date: "23/04/18",
    
  },
  {
    name: "Shoes",
    description: "",
    date: "23/04/18",
    
  },
  {
    name: "Mouse",
    description: "Executive",
    date: "19/09/17",
    
  },
  {
    name: "Keyboard",
    description: "Developer",
    date: "24/12/08",
    
  },
  {
    name: "Monitor",
    description: "Manager",
    date: "04/10/21",
    
  },
];

type Props = {}

const CategoriesList = (props: Props) => {

  return (
    <>

      <div className=' w-full flex flex-col justify-center items-center overflow-scroll'>
        <div>
          <AddCategory />
        </div>
        <Card className="w-3/5 mt-4">
          <table className="w-full min-w-max table-auto text-left">
            <thead >
              <tr >
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b  border-blue-100  bg-blue-500 p-4">
                    <Typography
                      // variant="small"
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
              {TABLE_ROWS.map(({ name, description, date }, index) => (
                <tr key={name} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {description}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {date}
                    </Typography>
                  </td>
                  <td className="p-4" >
                    <Typography  variant="small" color="blue" className="font-medium" onClick={() => <AddCategory/>}>
                      Edit
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

      </div>
    </>

  );
}
export default CategoriesList