import React, { useState } from 'react'
import { Typography, Button } from '@material-tailwind/react'
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
    const [isTouched, setIsTouched] = useState(false)

    const handleSelectChange = (value: string | undefined): void => {
        if (value != null) {
            //     setSelectedOption(value)
            //     onChange(value, id)
            // }
            if (value !== '') {
                setSelectedOption(value)
                onChange(value, id)
                setIsTouched(false)
            } else {
                setSelectedOption('')
                onChange('', id)
                setIsTouched(true)
            }
        }
    }

    const handleClearSelection = (): void => {
        setSelectedOption('')
        setIsTouched(true)
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
                <select
                    // variant="static"
                    className="py-4 bg-white border-b-2 border-gray-500 outline-none"
                    value={selectedOption}
                    onChange={(event) => {
                        handleSelectChange(event.target.value)
                    }}
                    required={isRequired}
                >
                    <option value="">None</option>
                    {optionlist.map((option) => (
                        <option key={option.id} value={option.optionValue}>
                            {option.optionValue}
                        </option>
                    ))}
                </select>
                {isTouched && isRequired && inputValue.trim() === '' && (
                    <Typography className="text-red-500">
                        Field is required
                    </Typography>
                )}
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
