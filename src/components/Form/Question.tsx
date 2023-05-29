import { Input, Select, Option } from '@material-tailwind/react';
import React, { useState } from 'react';
import { IQuestion } from '../../interface';
import CheckboxesComponent from './formFields/CheckboxesComponent';
import DropdownComponent from './formFields/DropdownComponent';
import MultipleChoiceComponent from './formFields/MultipleChoiceComponent';
import ParagraphComponent from './formFields/ParagraphComponent';
import ShortAnswerComponent from './formFields/ShortAnswerComponent';

type Props = {
  onChange: (value: IQuestion) => void;
  value: IQuestion;
};

const Question = ({ onChange, value }: Props) => {
  // console.log(value.questionTitle);

  const [questionType, setQuestionType] = useState(value.type);
  const [questionTitle, setQuestionTitle] = useState(value.questionTitle);

  const handleChange = (event: string) => {
    setQuestionType(event);
    console.log(event);

    onChange({ questionTitle: questionTitle, type: event });
  };

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
    <div className=' '>
      <div className='flex flex-col md:flex-row gap-5'>
        <Input
          className='placeholder-gray-700 text-[1rem] bg-gray-100 hover:bg-gray-300 ps-4 w-[100%] text-black'
          variant='static'
          label=''
          placeholder='Question'
          onChange={(event) => setQuestionTitle(event?.target.value)}
        />
        <Select
          label='Select Question Type'
          className='float-right'
          value={questionType}
          onChange={(event) => handleChange(event as string)}
        >
          <Option value='shortAnswer'>Short Answer</Option>
          <Option value='paragraph'>Paragraph</Option>
          <Option value='multipleChoice'>Multiple Choice</Option>
          <Option value='checkboxes'>Checkboxes</Option>
          <Option value='dropdown'>Dropdown</Option>
        </Select>
      </div>
      <div className='mt-5'>{renderComponent()}</div>
    </div>
  );
};

export default Question;
