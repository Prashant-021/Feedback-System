import { Button, Input, Typography } from '@material-tailwind/react'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { type IFormTemplate, type Ioption } from '../../interface'
import Checkboxes from './FormComponents/Checkboxes'
import Dropdown from './FormComponents/Dropdown'
import MultipleChoice from './FormComponents/MultipleChoice'
import Paragraph from './FormComponents/Paragraph'
import ShortAnswer from './FormComponents/ShortAnswer'
import FormService from '../../FirebaseFiles/handle/requestFunctions'
import FormResponseService from '../../FirebaseFiles/handle/responseFunctions'
import Loader from '../Loader/Loader'
import { errorNotify, successNotify } from '../../utils'
import RatingBar from './FormComponents/RatingBar'

const Viewform: React.FC = () => {
    const location = useLocation()
    const formId = location.pathname.split('/')
    const [isLoading, setIsLoading] = useState(true)
    const [form, setForm] = useState<IFormTemplate | null>()
    const [submitted, setSubmitted] = useState<boolean>(false)
    useEffect(() => {
        FormService.getForm(formId[formId.length - 1])
            .then((formDoc) => {
                if (formDoc !== null) {
                    const formData = formDoc
                    setForm(formData as IFormTemplate)
                }
            })
            .catch((error) => {
                errorNotify(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    const inputValueRef = useRef<Record<string, string>>({
        id: nanoid(),
    })
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault()
        FormResponseService.addResponse({
            ...inputValueRef.current,
            ...form,
        })
            .then(() => {
                successNotify('Form submitted successfully')
                // setForm(null)
                setSubmitted(true)
            })
            .catch((err) => {
                errorNotify(err)
            })
    }

    const updateOption = (value: string | string[], id: string): void => {
        const que = form?.questions.find((question) => question.id === id)
        if (que != null) {
            que.answerValue = value
        }
    }
    const renderQuestionType = (
        questionTitle: string,
        questionType: string,
        questionOptions: Ioption[] | undefined,
        isRequired: boolean,
        id: string
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
                        id={id}
                    />
                )
            case 'paragraph':
                return (
                    <Paragraph
                        questionTitle={questionTitle}
                        onChange={updateOption}
                        isRequired={isRequired}
                        key={uniqueid}
                        id={id}
                    />
                )
            case 'multipleChoice':
                return (
                    <MultipleChoice
                        questionTitle={questionTitle}
                        onChange={updateOption}
                        isRequired={isRequired}
                        key={uniqueid}
                        id={id}
                        optionlist={questionOptions as Ioption[]}
                    />
                )
            case 'checkboxes':
                return (
                    <Checkboxes
                        questionTitle={questionTitle}
                        onChange={updateOption}
                        isRequired={isRequired}
                        key={uniqueid}
                        id={id}
                        optionlist={questionOptions as Ioption[]}
                    />
                )
            case 'dropdown':
                return (
                    <Dropdown
                        questionTitle={questionTitle}
                        onChange={updateOption}
                        isRequired={isRequired}
                        optionlist={questionOptions as Ioption[]}
                        key={uniqueid}
                        id={id}
                    />
                )
            case 'rating':
                return (
                    <RatingBar
                        questionTitle={questionTitle}
                        onChange={updateOption}
                        isRequired={isRequired}
                        key={uniqueid}
                        id={id}
                    />
                )
            default:
                return null
        }
    }
    const clearValues = (): void => {
        inputValueRef.current = {}
        if (form?.questions != null) {
            for (const question of form?.questions) {
                question.answerValue = ''
            }
        }
    }
    if (isLoading) {
        return <Loader />
    }
    if (submitted) {
        return (
            <div className="flex items-center flex-col w-full my-20 sm:me-16 gap-4">
                <div className="formHeader rounded-lg shadow-xl bg-white py-12 border-blue-600 border-t-8  px-6 md:p-11 h-fit w-[90%] md:w-8/12">
                    <Typography variant="h3" color="blue-gray" className="mb-2">
                        {form?.title ?? ''}
                    </Typography>
                    <Typography valiant="h4">
                        {form?.description ?? ''}
                    </Typography>
                    <Typography valiant="h4">
                        Category: {form?.categoryName ?? ''}
                    </Typography>
                </div>
                <div className="emailSection rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8 w-[90%] md:w-8/12  px-6 md:p-11 h-fit">
                    <h3>Form Submitted as</h3>
                    <Input
                        type="email"
                        variant="static"
                        className="bg-gray-100 outline-0"
                        placeholder="Enter Email"
                        value={inputValueRef.current.Email}
                        onChange={(event) => {
                            inputValueRef.current = {
                                Email: event.target.value,
                            }
                        }}
                        disabled
                    />
                </div>
            </div>
        )
    }
    return (
        <div className="flex items-center flex-col w-full my-20 sm:me-16 gap-4">
            <div className="formHeader rounded-lg shadow-xl bg-white py-12 border-blue-600 border-t-8  px-6 md:p-11 h-fit w-[90%] md:w-8/12">
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    {form?.title ?? ''}
                </Typography>
                <Typography valiant="h4">{form?.description ?? ''}</Typography>
                <Typography valiant="h4">
                    Category: {form?.categoryName ?? ''}
                </Typography>
            </div>
            <div className="w-[90%] md:w-8/12 mt-7">
                <form
                    onSubmit={handleSubmit}
                    onReset={clearValues}
                    className="formQuestions gap-4 grid "
                >
                    <div className="emailSection rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8  px-6 md:p-11 h-fit">
                        <Input
                            type="email"
                            variant="static"
                            className="bg-gray-100 outline-0"
                            placeholder="Enter Email"
                            label="Submit Form as"
                            onChange={(event) => {
                                inputValueRef.current = {
                                    Email: event.target.value,
                                }
                            }}
                        />
                    </div>
                    {form?.questions.map((question) => (
                        <div
                            key={nanoid()}
                            className="rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8 px-6 md:p-11 h-fit w-full"
                        >
                            <div>
                                {renderQuestionType(
                                    question.questionTitle,
                                    question.type,
                                    question.options,
                                    question.required,
                                    question.id
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="submitBtn flex justify-between">
                        <Button type="submit">Submit</Button>
                        <Button variant="text" className="p-2" type="reset">
                            Clear Form
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Viewform
