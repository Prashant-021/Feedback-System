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
    }
    return (
        <>
            <div className="w-40 mt-3 gap-4 flex flex-col">
                <Typography variant="small" className="text-gray-700">
                    {questionTitle}{' '}
                    {isRequired && <span className="text-red-500">*</span>}
                </Typography>
                <select
                    // variant="static"
                    className=" py-4 bg-white border-b-2 border-gray-300 text-gray-700 outline-none"
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
                {isTouched && isRequired && (
                    <Typography
                        variant="small"
                        color="red"
                        className="absolute"
                    >
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
        </>
    )
}

export default Dropdown
