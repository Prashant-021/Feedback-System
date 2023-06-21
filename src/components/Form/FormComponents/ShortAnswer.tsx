import { Button, Input, Typography } from '@material-tailwind/react'
import React, { useRef, useState } from 'react'

interface Props {
    questionTitle: string
    onChange: (value: string, id: string) => void
    isRequired: boolean
    id: string
}

const ShortAnswer: React.FC<Props> = ({
    questionTitle,
    onChange,
    isRequired,
    id,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        setInputValue(value)
        onChange(value, id)
        setIsTouched(true)
    }

    const handleClearSelection = (): void => {
        if (inputRef.current != null) {
            inputRef.current.value = ''
            setInputValue('')
            onChange('', id)
        }
    }

    return (
        <>
            <div className="w-[40%]">
                <Input
                    label={questionTitle}
                    size="lg"
                    variant="static"
                    className="w-[40%]"
                    onChange={handleChange}
                    value={inputValue}
                    ref={inputRef}
                    required={isRequired}
                />
            </div>
            {isTouched && isRequired && inputValue.trim() === '' && (
                <Typography variant="small" color="red" className="absolute">
                    Field is required
                </Typography>
            )}
            <Button
                variant="text"
                className="float-right"
                onClick={handleClearSelection}
            >
                Clear Selection
            </Button>
        </>
    )
}

export default ShortAnswer
