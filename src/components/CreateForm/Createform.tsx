import React, { useState } from 'react'
import { Button, Input } from '@material-tailwind/react'
import Question from './Question'

type Props = {}

const Createform = (props: Props) => {
    const [createdComponents, setCreatedComponents] = useState<JSX.Element[]>([]);
    const handleClick = () => {
        const newComponent = <Question key={createdComponents.length} />;
        setCreatedComponents([...createdComponents, newComponent]);
    }

    return (
        <div className='w-full min-h-min flex flex-col flex-grow items-center '>
            <div className='flex lg:flex mt-12 flex-grow flex-col h-[75vh] mb-20 overflow-y-scroll overflow-x-visible no-scrollbar  w-[60%]  gap-4 relative'>
                <div className='w-[95%] titleSection rounded-lg shadow-xl border-l-8 border-transparent active focus-within:border-blue-500  bg-white p-11  h-fit'>
                    <Input className='placeholder-black text-xl text-black' variant="static" label="" placeholder="Category Title" />
                    <Input className='placeholder-black text-black ' variant="static" label="" placeholder="Category Description" />
                </div>
                <Question></Question>
                {createdComponents}
                <div className='absolute right-0 p-2 rounded-md'>
                    <Button className='p-1 bg-white text-black' onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default Createform