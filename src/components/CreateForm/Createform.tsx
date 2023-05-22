import { Input, Typography } from '@material-tailwind/react'
import React from 'react'

type Props = {}

const Createform = (props: Props) => {
    return (
        <div className='w-full min-h-min flex flex-col flex-grow '>
            <div className='flex lg:flex mt-12 flex-grow flex-col min-h-min w-full items-center gap-4'>
                <div className='titleSection rounded-lg shadow-xl md:w-[50%] bg-white p-11  h-fit'>
                    <Input className='placeholder-black text-[1.5rem] text-black' variant="static" label="" placeholder="Category Title" />
                    <Input className='placeholder-black text-black' variant="static" label="" placeholder="Category Description" />
                </div>
                <div className='titleSection rounded-lg shadow-xl md:w-[50%] bg-white p-11  h-fit'>
                    <Input className='placeholder-black text-[1.5rem] text-black' variant="static" label="" placeholder="Category Title" />
                    <Input className='placeholder-black text-black' variant="static" label="" placeholder="Category Description" />
                </div>
            </div>
        </div>
    )
}

export default Createform