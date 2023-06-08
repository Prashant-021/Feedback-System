import { Input } from '@material-tailwind/react'
import React from 'react'

interface Props {
    onChange: (value: string, id: string) => void
    id: string
}

const Paragraph: React.FC<Props> = ({ onChange, id }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value, id)
    }
    return <Input variant="standard" onChange={handleChange} />
}

export default Paragraph
