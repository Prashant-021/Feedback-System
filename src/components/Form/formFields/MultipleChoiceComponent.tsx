import { Button, Input, Radio } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { nanoid } from '@reduxjs/toolkit'
import { type Ioption } from '../../../interface'
interface Props {
    onOptionChange: (value: Ioption[]) => void
    optionsValue: Ioption[]
}
const MultipleChoiceComponent: React.FC<Props> = ({
    onOptionChange,
    optionsValue,
}) => {
    const [createdOption, setCreatedOption] = useState<Ioption[]>(
        optionsValue.map((option) => ({ ...option }))
    )
    const addOption = (): void => {
        const newOption: Ioption = {
            id: nanoid(),
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
            <div className="option flex w-[80%] flex-col items-start">
                {createdOption.map((component, index) => (
                    <div key={component.id} className="flex">
                        <Radio id="html" name="type" disabled />
                        <Input
                            label=""
                            variant="static"
                            placeholder={`Option ${index + 1}`}
                            defaultValue={component.optionValue}
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

export default MultipleChoiceComponent
