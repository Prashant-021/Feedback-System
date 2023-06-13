import { Button, Input } from '@material-tailwind/react'
import React from 'react'

interface Props {
    questionTitle: string
    isRequired: boolean
    onChange: (value: string, id: string) => void
    id: string
}

const Paragraph: React.FC<Props> = ({
    questionTitle,
    onChange,
    isRequired,
    id,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value, id)
    }
    return (
        <>
            <Input
                label={questionTitle}
                variant="static"
                required={isRequired}
                onChange={handleChange}
            />
            <Button variant="text" className="float-right mt-4">
                {' '}
                clear selection
            </Button>
        </>
    )
}

export default Paragraph
