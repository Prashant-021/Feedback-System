import React, { useEffect, useState } from 'react'
import { Button, Input } from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { type Ioption } from '../../../interface'

interface Props {
    onOptionChange: (value: Ioption[]) => void
}
const DropdownComponent: React.FC<Props> = ({ onOptionChange }) => {
    const [createdOption, setCreatedOption] = useState<Ioption[]>([])
    const addOption = (): void => {
        const newOption: Ioption = {
            id: Date.now(),
            optionValue: '',
        }
        setCreatedOption([...createdOption, newOption])
    }
    const handleChange = (): void => {
        onOptionChange(createdOption)
    }

    const handleDelete = (index: number): void => {
        const updatedOptions = [...createdOption]
        updatedOptions.splice(index, 1)
        setCreatedOption(updatedOptions)
    }
    useEffect(() => {
        handleChange()
    }, [createdOption])

    const handleOptionValueChange = (index: number, value: string): void => {
        const updatedOptions = [...createdOption]
        updatedOptions[index].optionValue = value
        setCreatedOption(updatedOptions)
    }

    return (
        <div>
            <div className="option flex flex-col justify-start w-[60%] items-start">
                {createdOption.map((component, index) => (
                    <div key={component.id} className="flex">
                        <Input
                            label=""
                            variant="static"
                            placeholder={`Option ${index + 1}`}
                            onBlur={(event) => {
                                handleOptionValueChange(
                                    index,
                                    event.target.value
                                )
                            }}
                        />
                        <Button
                            variant="text"
                            className=" text-red-500 p-2 rounded-md float-right"
                            onClick={() => {
                                handleDelete(index)
                            }}
                        >
                            <XMarkIcon className="text-black h-5 w-5" />
                        </Button>
                    </div>
                ))}
                <button
                    className="w-18 ms-10 mt-4 text-blue-500"
                    onClick={addOption}
                >
                    Add options
                </button>
            </div>
        </div>
    )
}

export default DropdownComponent
