import { Input } from '@material-tailwind/react'
import React from 'react'

const ShortAnswerComponent: React.FC = () => {
    return (
        <div className="w-[40%] border-b-2 border-black">
            <Input
                label=""
                variant="static"
                placeholder="Short Answer"
                className="ps-2 border-b-4"
                disabled
            ></Input>
        </div>
    )
}

export default ShortAnswerComponent
