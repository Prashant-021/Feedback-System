import { Input, Radio } from '@material-tailwind/react'
import React, { useState } from 'react'
import { type Ioption } from '../../../interface'

const MultipleChoiceComponent: React.FC = () => {
    const [createdOption, setCreatedOption] = useState<Ioption[]>([])
    const addOption = (): void => {
        const newOption: Ioption = {
            id: Date.now(),
            optionValue: '',
        }
        setCreatedOption([...createdOption, newOption])
        console.log(createdOption)
    }
    return (
        <div>
            <div className="option flex w-[80%] flex-col items-start">
                <div className="flex">
                    <Radio id="html" name="type" disabled />
                    <Input
                        label=""
                        variant="static"
                        placeholder="Option 1"
                    ></Input>
                </div>
                {createdOption.map((component, index) => (
                    <div key={component.id} className="flex">
                        <Radio id="html" name="type" disabled />
                        <Input
                            label=""
                            variant="static"
                            placeholder={`Option ${index + 2}`}
                        />
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
