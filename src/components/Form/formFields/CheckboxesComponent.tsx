import { Checkbox, Input } from '@material-tailwind/react'
import React, { useState } from 'react'
import {  option } from '../../../interface';

type Props = {}

const CheckboxesComponent = (props: Props) => {
  const [createdOption, setCreatedOption] = useState<option[]>([]);
  const addOption = () => {
    const newOption: option = {
      id: Date.now(),
      optionValue: '',
    };
    setCreatedOption([...createdOption, newOption]);
    console.log(createdOption);

  }
  return (
    <div>
      <div className="option flex w-[80%] flex-col items-start">
        <div className='flex '>
          <Checkbox id="html" name="type" disabled />
          <Input label='' variant='static' placeholder='Option 1'></Input>
        </div>
        {createdOption.map((component, index) =>
          <div key={component.id} className='flex'>
            <Checkbox id="html" name="type" disabled />
            <Input label='' variant='static' placeholder={`Option ${index + 2}`} />
          </div>
        )
        }
        <button className='w-18 ms-10 mt-4 text-blue-500' onClick={addOption}>Add options</button>

      </div>
    </div>
  )
}

export default CheckboxesComponent