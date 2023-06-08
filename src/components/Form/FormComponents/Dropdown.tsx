import React from 'react'
import { Select, Option } from '@material-tailwind/react'
import { type Ioption } from '../../../interface'

interface DropdownProps {
    optionlist: Ioption[]
    onChange: (selectedOption: string, id: string) => void
    id: string
}

const Dropdown: React.FC<DropdownProps> = ({ optionlist, onChange, id }) => {
    const handleSelectChange = (value: string | undefined): void => {
        // const selectedOption = event.target.value
        if (value != null) onChange(value, 'Dropdown-' + id)
    }

    return (
        <div className="w-72 mt-3">
            <Select label="Select Answer" onChange={handleSelectChange}>
                {optionlist.map((option) => (
                    <Option key={option.id} value={option.optionValue}>
                        {option.optionValue}
                    </Option>
                ))}
            </Select>
        </div>
    )
}

export default Dropdown
