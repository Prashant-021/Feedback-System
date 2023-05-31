import { Input } from '@material-tailwind/react'
import React from 'react'

const ParagraphComponent: React.FC = () => {
    return (
        <div className="w-[70%] border-b-2 border-black">
            <Input
                label=""
                variant="static"
                placeholder="Paragraph"
                className="ps-2 border-b-4"
                disabled
            ></Input>
        </div>
    )
}

export default ParagraphComponent
