import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const PageNotFound = (props: Props) => {
    const Navigate = useNavigate()
    return (
        <div className='bg-white w-[100%] h-[100vh] flex flex-col items-center justify-center'>
            <img className='h-[60vh] w-[60vh]' src="/img/PageNotFound.jpg" alt="" />
            <button className='text-blue-500 text-xl' onClick={() => Navigate(-1)}>Go Back</button>
        </div>
    )
}

export default PageNotFound