import { Input, Radio } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ComponentData } from '../../../interface';

type Props = {}

const MultipleChoiceComponent = (props: Props) => {
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
      <div className="option flex w-[80%] flex-col items-start">
        <div className="flex">
          <Radio id="html" name="type" disabled />
          <Input label='' variant='static' placeholder='Option 1'></Input>
        </div>
        {createdOption.map((component, index) =>
          <div key={component.id} className='flex'>
            <Radio id="html" name="type" disabled />
            <Input label='' variant='static' placeholder={`Option ${index + 2}`} />
          </div>
        )
        }
        <button className='w-18 ms-10 mt-4 text-blue-500' onClick={addOption}>Add options</button>
      </div>
    </div>
  )
}

export default MultipleChoiceComponent