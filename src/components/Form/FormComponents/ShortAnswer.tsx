import { Button, Input } from '@material-tailwind/react'
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        setInputValue(value)
        value === '' ? onChange('Not Attempted', id) : onChange(value, id)
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
                    required={isRequired}
                    ref={inputRef}
                />
            </div>
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
