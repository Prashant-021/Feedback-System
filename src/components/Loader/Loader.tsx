import { Spinner } from '@material-tailwind/react'
import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className="w-screen flex h-screen bg-black bg-opacity-50 z-50 justify-center items-center top-0 absolute">
            <Spinner className="h-12 w-12" />
        </div>
    )
}

export default Loader
