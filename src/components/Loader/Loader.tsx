import { Spinner } from '@material-tailwind/react'
import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className="w-screen flex h-screen bg-black bg-opacity-50 z-[999] justify-center items-center left-0 top-0 absolute">
            <Spinner className="h-12 w-12" />
        </div>
    )
}

export default Loader
