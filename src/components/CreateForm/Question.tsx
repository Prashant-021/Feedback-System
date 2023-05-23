import { Input, Select, Option  } from '@material-tailwind/react'
import React, { useState } from 'react'
import CheckboxesComponent from './formFields/CheckboxesComponent'
import DropdownComponent from './formFields/DropdownComponent'
import MultipleChoiceComponent from './formFields/MultipleChoiceComponent'
import ParagraphComponent from './formFields/ParagraphComponent'
import ShortAnswerComponent from './formFields/ShortAnswerComponent'

type Props = {}

const Question = (props: Props) => {
    const [questionType, setQuestionType] = useState('')
    const handleChange = (event: string) => {
        console.log(event);
        console.log(questionType);
        setQuestionType(event);
    }
    const renderComponent = () => {
        switch (questionType) {
            case 'shortAnswer':
                return <ShortAnswerComponent />;
            case 'paragraph':
                return <ParagraphComponent />;
            case 'multipleChoice':
                return <MultipleChoiceComponent />;
            case 'checkboxes':
                return <CheckboxesComponent />;
            case 'dropdown':
                return <DropdownComponent />;
            default:
                return null;
        }
    };
  return (
    <div className='w-[95%] titleSection rounded-lg shadow-xl  border-l-8 border-transparent focus-within:border-blue-500 bg-white p-11  h-fit'>
                    <div className="flex gap-5">
                        <Input className='placeholder-gray-700 text-[1rem] bg-gray-100 hover:bg-gray-300 ps-4 w-[100%] text-black' variant="static" label="" placeholder="Question" />
                        <Select label='Select Question Type' className=' float-right' value={questionType} onChange={(event) => handleChange(event as string)}>
                            <Option value="shortAnswer">Short Answer</Option>
                            <Option value="paragraph">Paragraph</Option>
                            <Option value="multipleChoice">Multiple Choice</Option>
                            <Option value="checkboxes">Checkboxes</Option>
                            <Option value="dropdown">Dropdown</Option>
                        </Select>
                    </div>
                    <div className='mt-5'>
                        {renderComponent()}
                    </div>
                </div>
  )
}

export default Question