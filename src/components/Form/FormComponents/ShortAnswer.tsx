import { Input } from '@material-tailwind/react'
import React from 'react'

interface Props {
    onChange: (value: string, id: string) => void
    isRequired: boolean
    id: string
}

const ShortAnswer: React.FC<Props> = ({ onChange, isRequired, id }) => {
    const handleChange = (event: any): void => {
        onChange(event.target.value, id)
    }
    return (
        <div className="w-[40%]">
            <Input
                variant="static"
                className="w-[40%]"
                onChange={handleChange}
            />
        </div>
    )
}

export default ShortAnswer
