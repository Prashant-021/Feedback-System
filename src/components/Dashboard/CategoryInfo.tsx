import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from '@material-tailwind/react'

const CategoryInfo: React.FC = () => {
    return (
        <div className="h-44 mt-12 flex justify-center">
            <Card className="w-56 hover:bg-blue-300">
                <CardHeader color="blue-gray" className="relative h-43">
                    <img
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="img-blur-shadow"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="">
                        Shoes
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default CategoryInfo
