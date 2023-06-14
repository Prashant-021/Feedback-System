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
    const [form, setForm] = useState<IFormTemplate>()
    useEffect(() => {
        FormService.getForm(formId[formId.length - 1])
            .then((formDoc) => {
                if (formDoc !== null) {
                    const formData = formDoc.data()
                    setForm(formData as IFormTemplate)
                } else {
                    console.log('Category not found')
                }
            })
            .catch((error) => {
                console.error('Error fetching category:', error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    const inputValueRef = useRef<Record<string, string>>({
        id: nanoid(),
    })

    console.log(inputValueRef.current)
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault()
        FormResponseService.addResponse({ ...inputValueRef.current, ...form })
            .then(() => {
                successNotify('Form submitted successfully')
            })
            .catch(() => {
                errorNotify('Form Submission Failed')
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
                        key={uniqueid}
                        onChange={updateOption}
                        isRequired={isRequired}
                        id={id}
                        optionlist={questionOptions as Ioption[]}
                    />
                )
            case 'checkboxes':
                return (
                    <Checkboxes
                        questionTitle={questionTitle}
                        optionlist={questionOptions as Ioption[]}
                        onChange={updateOption}
                        isRequired={isRequired}
                        key={uniqueid}
                        id={id}
                    />
                )
            case 'dropdown':
                return (
                    <Dropdown
                        questionTitle={questionTitle}
                        optionlist={questionOptions as Ioption[]}
                        id={id}
                        isRequired={isRequired}
                        key={uniqueid}
                        onChange={updateOption}
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
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="flex items-center flex-col w-full my-20 gap-4">
            <div className="formHeader rounded-lg shadow-xl bg-white py-12 border-blue-600 border-t-8  px-6 md:p-11 h-fit w-[90%] md:w-8/12">
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    {form?.title ?? ''}
                </Typography>
                <Typography valiant="h4">{form?.description ?? ''}</Typography>
                <Typography valiant="h4">
                    Category: {form?.categoryName ?? ''}
                </Typography>
            </div>
            <form
                onSubmit={handleSubmit}
                className="formQuestions gap-4 grid w-[90%] md:w-8/12 mt-7"
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
                        className="rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8  px-6 md:p-11 h-fit w-full"
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
