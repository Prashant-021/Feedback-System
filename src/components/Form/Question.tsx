import { Input, Select, Option, Switch } from '@material-tailwind/react'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { type Ioption, type IQuestion } from '../../interface'
import CheckboxesComponent from './formFields/CheckboxesComponent'
import DropdownComponent from './formFields/DropdownComponent'
import MultipleChoiceComponent from './formFields/MultipleChoiceComponent'
import ParagraphComponent from './formFields/ParagraphComponent'
import ShortAnswerComponent from './formFields/ShortAnswerComponent'

interface Props {
    onChange: (value: IQuestion) => void
    value: IQuestion
}

const Question: React.FC<Props> = ({ onChange, value }) => {
    const [question, setQuestion] = useState<IQuestion>(value)
    useEffect(() => {
        onChange(question)
    }, [question])

    const handleOptionChange = (value: Ioption[]): void => {
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: value,
        }))
    }

    const renderComponent = (): JSX.Element | null => {
        switch (question.type) {
            case 'shortAnswer':
                return <ShortAnswerComponent />
            case 'paragraph':
                return <ParagraphComponent />
            case 'multipleChoice':
                return (
                    <MultipleChoiceComponent
                        onOptionChange={(value) => {
                            handleOptionChange(value)
                        }}
                        optionsValue={value.options ?? []}
                    />
                )
            case 'checkboxes':
                return (
                    <CheckboxesComponent
                        onOptionChange={(value) => {
                            handleOptionChange(value)
                        }}
                        optionsValue={value.options ?? []}
                    />
                )
            case 'dropdown':
                return (
                    <DropdownComponent
                        onOptionChange={(value) => {
                            handleOptionChange(value)
                        }}
                        optionsValue={value.options ?? []}
                    />
                )
            default:
                return null
        }
    }
    return (
        <div className=" ">
            <div className="flex flex-col md:flex-row gap-5">
                <Input
                    className="placeholder-gray-700 text-[1rem] bg-gray-100 hover:bg-gray-300 ps-4 w-[100%] text-black"
                    variant="static"
                    label=""
                    placeholder="Question"
                    value={question.questionTitle}
                    onChange={(event) => {
                        setQuestion((prevQuestion) => ({
                            ...prevQuestion,
                            questionTitle: event?.target.value,
                        }))
                    }}
                />
                <Select
                    label="Select Question Type"
                    className="float-right"
                    value={question.type}
                    onChange={(event) => {
                        setQuestion((prevQuestion) => ({
                            ...prevQuestion,
                            type: event as string,
                        }))
                    }}
                >
                    <Option value="shortAnswer">Short Answer</Option>
                    <Option value="paragraph">Paragraph</Option>
                    <Option value="multipleChoice">Multiple Choice</Option>
                    <Option value="checkboxes">Checkboxes</Option>
                    <Option value="dropdown">Dropdown</Option>
                </Select>
            </div>
            <div className="mt-5">{renderComponent()}</div>
            <div className="mt-5 ">
                <Switch
                    id={`required${nanoid()}`}
                    label="Required"
                    checked={value.required}
                    onChange={(event) => {
                        setQuestion((prevQuestion) => ({
                            ...prevQuestion,
                            required: event.target.checked,
                        }))
                    }}
                />
            </div>
        </div>
    )
}

export default Question
