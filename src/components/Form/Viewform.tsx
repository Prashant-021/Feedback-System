import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { type Ioption, type RootState } from '../../interface'
import Checkboxes from './FormComponents/Checkboxes'
import Dropdown from './FormComponents/Dropdow.'
import MultipleChoice from './FormComponents/MultipleChoice'
import Paragraph from './FormComponents/Paragraph'
import ShortAnswer from './FormComponents/ShortAnswer'

const Viewform: React.FC = () => {
    const location = useLocation()
    const formId = location.pathname.split('/')
    const Viewforms = useSelector((state: RootState) => state.form.form)
    const form = Viewforms.find((f) => f.id === formId[formId.length - 1])

    const renderQuestionType = (
        questionType: string,
        questionOptions: Ioption[] | undefined
    ): JSX.Element | null => {
        switch (questionType) {
            case 'shortAnswer':
                return <ShortAnswer />
            case 'paragraph':
                return <Paragraph />
            case 'multipleChoice':
                return (
                    <MultipleChoice optionlist={questionOptions as Ioption[]} />
                )
            case 'checkboxes':
                return <Checkboxes optionlist={questionOptions as Ioption[]} />
            case 'dropdown':
                return <Dropdown optionlist={questionOptions as Ioption[]} />
            default:
                return null
        }
    }

    const handleSubmit = (event: any): void => {
        event.preventDefault()
        console.log(event.target.value)
    }
    return (
        <div className="flex items-center flex-col w-full my-20 gap-4">
            <div className="formHeader rounded-lg shadow-xl bg-white py-12 border-blue-600 border-t-8  px-6 md:p-11 h-fit w-[90%] md:w-8/12">
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    {form?.title}
                </Typography>
                <Typography>{form?.description}</Typography>
                <div className="emailSection pt-3 border-gray-300 border-t-2">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        className="bg-gray-100 outline-0"
                        placeholder="Enter Email"
                    />
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="formQuestions gap-4 grid w-[90%] md:w-8/12 mt-7"
            >
                {form?.questions.map((question, index) => (
                    <div
                        key={index}
                        className="rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8  px-6 md:p-11 h-fit w-full"
                    >
                        <div className="flex">
                            <Typography variant="h5">
                                {question.questionTitle}
                            </Typography>
                            {question.required ? (
                                <p className="text-red-400 text-2xl ms-2">*</p>
                            ) : (
                                ''
                            )}
                        </div>
                        <div>
                            {renderQuestionType(
                                question.type,
                                question.options
                            )}
                        </div>
                        <Button variant="text" className="float-right">
                            {' '}
                            clear selection
                        </Button>
                    </div>
                ))}
                <div className="submitBtn w-[90%] md:w-8/12 flex justify-between">
                    <Button type="submit">Submit</Button>
                    <Button variant="text" className="p-2">
                        Clear Form
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Viewform
