import { Button, Typography } from '@material-tailwind/react'
import { nanoid } from '@reduxjs/toolkit'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { type Ioption, type RootState } from '../../interface'
import Checkboxes from './FormComponents/Checkboxes'
import Dropdown from './FormComponents/Dropdown'
import MultipleChoice from './FormComponents/MultipleChoice'
import Paragraph from './FormComponents/Paragraph'
import ShortAnswer from './FormComponents/ShortAnswer'

const Viewform: React.FC = () => {
    const location = useLocation()
    const formId = location.pathname.split('/')
    const Viewforms = useSelector((state: RootState) => state.form.form)
    const form = Viewforms.find((f) => f.id === formId[formId.length - 1])
    const inputValueRef = useRef<Record<string, any>>({})

    console.log(form?.questions)
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault()
        console.log(inputValueRef.current)
    }
    const updateOption = (value: string | string[], id: string): void => {
        inputValueRef.current[id] = value
    }
    const renderQuestionType = (
        questionTitle: string,
        questionType: string,
        questionOptions: Ioption[] | undefined,
        isRequired: boolean
    ): JSX.Element | null => {
        const uniqueid: string = nanoid()
        switch (questionType) {
            case 'shortAnswer':
                return (
                    <ShortAnswer
                        questionTitle={questionTitle}
                        onChange={updateOption}
                        isRequired={isRequired}
                        key={uniqueid}
                        id={uniqueid}
                    />
                )
            case 'paragraph':
                return (
                    <Paragraph
                        questionTitle={questionTitle}
                        onChange={updateOption}
                        isRequired={isRequired}
                        key={uniqueid}
                        id={uniqueid}
                    />
                )
            case 'multipleChoice':
                return (
                    <MultipleChoice
                        key={uniqueid}
                        onChange={updateOption}
                        id={uniqueid}
                        optionlist={questionOptions as Ioption[]}
                    />
                )
            case 'checkboxes':
                return (
                    <Checkboxes
                        optionlist={questionOptions as Ioption[]}
                        onChange={updateOption}
                        key={uniqueid}
                        id={uniqueid}
                    />
                )
            case 'dropdown':
                return (
                    <Dropdown
                        optionlist={questionOptions as Ioption[]}
                        id={uniqueid}
                        key={uniqueid}
                        onChange={updateOption}
                    />
                )
            default:
                return null
        }
    }

    const clearValues = (): void => {
        inputValueRef.current = {}
    }

    return (
        <div className="flex items-center flex-col w-full my-20 gap-4">
            <div className="formHeader rounded-lg shadow-xl bg-white py-12 border-blue-600 border-t-8  px-6 md:p-11 h-fit w-[90%] md:w-8/12">
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    Form: {form?.title}
                </Typography>
                <Typography>Form Description: {form?.description}</Typography>
                <div className="emailSection py-3 border-gray-300 border-t-2">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        className="bg-gray-100 outline-0"
                        placeholder="Enter Email"
                    />
                </div>
                <Typography>Category: {form?.categoryName}</Typography>
            </div>
            <form
                onSubmit={handleSubmit}
                className="formQuestions gap-4 grid w-[90%] md:w-8/12 mt-7"
            >
                {form?.questions.map((question) => (
                    <div
                        key={nanoid()}
                        className="rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8  px-6 md:p-11 h-fit w-full"
                    >
                        <div>
                            {renderQuestionType(
                                question.questionTitle,
                                question.type,
                                question.options,
                                question.required
                            )}
                        </div>
                    </div>
                ))}
                <div className="submitBtn flex justify-between">
                    <Button type="submit">Submit</Button>
                    <Button
                        variant="text"
                        className="p-2"
                        type="reset"
                        onClick={clearValues}
                    >
                        Clear Form
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Viewform
