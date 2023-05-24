import { Input } from '@material-tailwind/react'
import React from 'react'

type Props = {}

const ParagraphComponent = (props: Props) => {
  return (
    <div className='w-[70%] border-b-2 border-black'>
      <Input label='' variant='static' placeholder='Paragraph' className='ps-2 border-b-4' disabled></Input>
    </div>
  )
}

export default ParagraphComponent