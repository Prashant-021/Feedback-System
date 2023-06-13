import React from 'react'
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
    const handleSelectChange = (value: string | undefined): void => {
        if (value != null) onChange(value, id)
    }

    return (
        <>
            <div className="w-72 mt-3 gap-4 flex flex-col">
                <Typography>
                    {questionTitle}{' '}
                    {isRequired && <span className="text-red-500">*</span>}
                </Typography>
                <Select variant="static" onChange={handleSelectChange}>
                    {optionlist.map((option) => (
                        <Option key={option.id} value={option.optionValue}>
                            {option.optionValue}
                        </Option>
                    ))}
                </Select>
            </div>
            <Button variant="text" className="float-right mt-4">
                {' '}
                clear selection
            </Button>
        </>
    )
}

export default Dropdown
