import { Button, Input } from '@material-tailwind/react'
import React, { useState } from 'react'

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
    const [inputValue, setInputValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value)
        if (event.target.value === '') onChange('Not Attempted', id)
        else onChange(event.target.value, id)
    }

    const handleClearSelection = (): void => {
        setInputValue('')
        onChange('Not Attempted', id)
    }

    return (
        <>
            <Input
                label={questionTitle}
                variant="static"
                required={isRequired}
                onChange={handleChange}
                value={inputValue}
            />
            <Button
                variant="text"
                className="float-right mt-4"
                onClick={handleClearSelection}
            >
                Clear Selection
            </Button>
        </>
    )
}

export default Paragraph
