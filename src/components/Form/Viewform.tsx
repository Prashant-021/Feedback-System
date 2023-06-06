import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { type RootState } from '../../interface'
import ShortAnswer from './FormComponents/ShortAnswer'

const Viewform: React.FC = () => {
    const location = useLocation()
    const formId = location.pathname.split('/')
    const Viewforms = useSelector((state: RootState) => state.form.form)
    const form = Viewforms.find((f) => f.id === formId[formId.length - 1])
    console.log(form?.questions[1].required)

    const renderQuestionType = (questionType: string): JSX.Element | null => {
        switch (questionType) {
            case 'shortAnswer':
                return <ShortAnswer />
            // case 'paragraph':
            //     return <ParagraphComponent />
            // case 'multipleChoice':
            //     return (
            //         <MultipleChoiceComponent
            //             onOptionChange={(value) => {
            //                 handleOptionChange(value)
            //             }}
            //             optionsValue={value.options ?? []}
            //         />
            //     )
            // case 'checkboxes':
            //     return (
            //         <CheckboxesComponent
            //             onOptionChange={(value) => {
            //                 handleOptionChange(value)
            //             }}
            //             optionsValue={value.options ?? []}
            //         />
            //     )
            // case 'dropdown':
            //     return (
            //         <DropdownComponent
            //             onOptionChange={(value) => {
            //                 handleOptionChange(value)
            //             }}
            //             optionsValue={value.options ?? []}
            //         />
            //     )
            default:
                return null
        }
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
            <div className="formQuestions gap-4 grid w-[90%] md:w-8/12 mt-7">
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
                        <div>{renderQuestionType(question.type)}</div>
                        <Button variant="text" className="float-right">
                            {' '}
                            clear selection
                        </Button>
                    </div>
                ))}
            </div>
            <div className="submitBtn w-[90%] md:w-8/12 flex justify-between">
                <Button>Submit</Button>
                <Button variant="text" className="p-2">
                    Clear Form
                </Button>
            </div>
        </div>
    )
}

export default Viewform
