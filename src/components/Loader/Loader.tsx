import { Spinner } from '@material-tailwind/react'
import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className="w-screen flex justify-center items-center">
            Loading...
            <Spinner className="h-12 w-12" />
        </div>
    )
}

export default Loader
