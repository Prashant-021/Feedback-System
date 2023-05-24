import React, { useRef, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import Question from './Question';
import { TrashIcon } from "@heroicons/react/24/solid";
import { ComponentData } from '../../interface';

type Props = {};


const Createform = (props: Props) => {

  const bottomRef = useRef<HTMLDivElement>(null);
  const [createdComponents, setCreatedComponents] = useState<ComponentData[]>([]);

  const handleClick = () => {
    const newComponent: ComponentData = {
      id: Date.now(),
      contentValue: '',
    };
    setCreatedComponents([...createdComponents, newComponent]);

    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 10);


  };

  const handleDelete = (index: number) => {
    const updatedComponents = [...createdComponents];
    updatedComponents.splice(index, 1);
    setCreatedComponents(updatedComponents);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedComponents = [...createdComponents];
    updatedComponents[index].contentValue = value;
    setCreatedComponents(updatedComponents);
  };
  return (
    <div className='w-full min-h-min flex flex-col flex-grow items-center'>
      <div id='questionList' className='w-[70%] flex lg:flex mt-12 flex-grow flex-col h-[60vh] overflow-y-scroll overflow-x-visible no-scrollbar  gap-4 relative'>
        <div className='titleSection rounded-lg shadow-xl border-l-8 border-transparent active focus-within:border-blue-500 bg-white p-11 h-fit'>
          <Input className='placeholder-black text-xl text-black' variant="static" label="" placeholder="Category Title" />
          <Input className='placeholder-black text-black ' variant="static" label="" placeholder="Category Description" />
        </div>

        {createdComponents.map((component, index) => {

          return (

            <div key={component.id}>
              <Question
                value={component.contentValue}
                onChange={(value) => handleQuestionChange(index, value)}
              />
              <Button
                className='bg-red-500 text-white p-2 rounded-md'
                onClick={() => handleDelete(index)}
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          )
        })}

        <div ref={bottomRef} />
      </div>
      <div className='flex justify-center mb-2 rounded-md'>
        <Button className=' flex items-center  p-3 bg-white text-black' onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> Add Question
        </Button>
      </div>

    </div>
  );
};

export default Createform;
