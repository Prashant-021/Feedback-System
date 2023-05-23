import { Input, Radio } from '@material-tailwind/react'
import React from 'react'

type Props = {}

const MultipleChoiceComponent = (props: Props) => {
  return (
    <div>
      <div className="option flex w-[80%] items-center justify-center">
        <Radio id="html" name="type" disabled />
        <Input label='' variant='static' placeholder='Option 1'></Input>
      </div>
    </div>
  )
}

export default MultipleChoiceComponent