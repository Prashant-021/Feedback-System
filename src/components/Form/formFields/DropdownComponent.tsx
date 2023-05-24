import React, { useState } from 'react'
import { Input } from '@material-tailwind/react'
import { ComponentData } from '../../../interface'

type Props = {}

const DropdownComponent = (props: Props) => {
  const [createdOption, setCreatedOption] = useState<ComponentData[]>([]);
  const addOption = () => {
    const newOption: ComponentData = {
      id: Date.now(),
      contentValue: '',
    };
    setCreatedOption([...createdOption, newOption]);
    console.log(createdOption);

  }

  return (
    <div>
      <div className="option flex flex-col justify-start w-[60%] items-start">
        <Input label='' variant='static' placeholder='Option 1'></Input>
        {createdOption.map((component,index) => 
          <Input key={component.id}  label='' variant='static' placeholder={`Option ${index + 2}`}/>
        )
        }
        <button className='w-18 mt-2 text-blue-500' onClick={addOption}>Add options</button>

      </div>
    </div>
  )
}

export default DropdownComponent