import React, { useState } from 'react'
import { Input } from '@material-tailwind/react'
import { type option } from '../../../interface'

const DropdownComponent: React.FC = () => {
  const [createdOption, setCreatedOption] = useState<option[]>([])
  const addOption = (): void => {
    const newOption: option = {
      id: Date.now(),
      optionValue: ''
    }
    setCreatedOption([...createdOption, newOption])
    console.log(createdOption)
  }

  return (
    <div>
      <div className="option flex flex-col justify-start w-[60%] items-start">
        <div className="flex">
          <Input label='' variant='static' placeholder='Option 1'></Input>
        </div>
        {createdOption.map((component, index) =>
          <div key={component.id} className='flex'>
            <Input label='' variant='static' placeholder={`Option ${index + 2}`} />
          </div>
        )
        }
        <button className='w-18 mt-4 text-blue-500' onClick={addOption}>Add options</button>

      </div>
    </div>
  )
}

export default DropdownComponent
