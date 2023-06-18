import React, { useState } from 'react'
import { Select, Option, Typography, Button } from '@material-tailwind/react'
import { type Ioption } from '../../../interface'

interface DropdownProps {
    questionTitle: string
    isRequired: boolean
    optionlist: Ioption[]
    onChange: (selectedOption: string, id: string) => void
    id: string
}

const Dropdown: React.FC<DropdownProps> = ({
    questionTitle,
    optionlist,
    isRequired,
    onChange,
    id,
}) => {
    const [selectedOption, setSelectedOption] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')

    const handleSelectChange = (value: string | undefined): void => {
        if (value != null) {
            setSelectedOption(value)
            onChange(value, id)
        }
    }

    const handleClearSelection = (): void => {
        setSelectedOption('')
        setInputValue('')
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setInputValue(event.target.value)
    }

    return (
        <>
            <div className="w-72 mt-3 gap-4 flex flex-col">
                <Typography>
                    {questionTitle}{' '}
                    {isRequired && <span className="text-red-500">*</span>}
                </Typography>
                <Select
                    variant="static"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    {optionlist.map((option) => (
                        <Option key={option.id} value={option.optionValue}>
                            {option.optionValue}
                        </Option>
                    ))}
                </Select>
            </div>
            <Button
                variant="text"
                className="float-right mt-4"
                onClick={handleClearSelection}
            >
                clear selection
            </Button>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
        </>
    )
}

export default Dropdown
