import { Button, Input, Typography } from '@material-tailwind/react'
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
    const [isTouched, setIsTouched] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value)
        onChange(event.target.value, id)
        setIsTouched(true)
    }

    const handleClearSelection = (): void => {
        setInputValue('')
        onChange('', id)
    }

    return (
        <>
            <Input
                label={questionTitle}
                variant="static"
                onChange={handleChange}
                value={inputValue}
                required={isRequired}
            />
            {isTouched && isRequired && inputValue.trim() === '' && (
                <Typography className="text-red-500">
                    Field is required
                </Typography>
            )}
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
