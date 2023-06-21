import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@material-tailwind/react'
import Question from './Question'
import {
    ArrowUturnLeftIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormService from '../../FirebaseFiles/handle/requestFunctions'
import {
    type IFormHeader,
    type IFormTemplate,
    type IQuestion,
} from '../../interface'
import FormHeader from './formFields/FormHeader'
import { nanoid } from '@reduxjs/toolkit'
import { errorNotify, successNotify } from '../../utils'
import Loader from '../Loader/Loader'
const Createform: React.FC = () => {
    const location = useLocation()
    const { formStatus } = location.state
    const path = location.pathname.split('/')
    const formId = path[path.length - 1]
    const [disable, setDisable] = useState<boolean>(true)
    const Navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const [formTemplate, setFormTemplate] = useState<IFormTemplate>({
        id: formId,
        title: 'Untitled Form',
        description: '',
        categoryName: '',
        questions: [],
        responseCount: 0,
    })
    useEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])
    useEffect(() => {
        if (formStatus === 'edit') {
            setIsLoading(true)
            FormService.getForm(formId)
                .then((formDoc) => {
                    if (formDoc !== null) {
                        setFormTemplate(formDoc as IFormTemplate)
                    }
                })
                .catch(() => {
                    errorNotify('Error')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [formStatus, formId])
    const handleHeaderValueChange = (value: IFormHeader): void => {
        setFormTemplate((prevFormTemplate) => ({
            ...prevFormTemplate,
            title: value.title,
            description: value.description,
            categoryName: value.categoryName,
        }))
    }
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    )

    const handleClick = (): void => {
        const newComponent: IQuestion = {
            id: nanoid(),
            questionTitle: '',
            type: '',
            required: false,
            options: [],
            answerValue: '',
        }
        const updatedQuestionsList = [...formTemplate.questions, newComponent]
        setFormTemplate((prevState) => ({
            ...prevState,
            questions: updatedQuestionsList,
        }))

        timeoutRef.current = setTimeout(
            () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
            10
        )
        setDisable(false)
    }

    const handleDelete = (index: number): void => {
        setFormTemplate((prevState) => {
            const updatedQuestions = [...prevState.questions]
            updatedQuestions.splice(index, 1)
            return { ...prevState, questions: updatedQuestions }
        })
        setDisable(false)
    }
    const handleQuestionChange = (index: number, value: IQuestion): void => {
        setFormTemplate((prevState) => {
            const updatedQuestions = [...prevState.questions]
            updatedQuestions[index] = value
            return { ...prevState, questions: updatedQuestions }
        })
        console.log('Hello')
    }

    const handleSave = (): void => {
        console.log(formTemplate)
        setIsLoading(true)
        if (formStatus === 'add') {
            FormService.addNewForm(formTemplate)
                .then(() => {
                    successNotify('Form Saved successfully')
                })
                .catch(() => {
                    errorNotify('Error while Adding Form')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            FormService.updateForm(formId, formTemplate)
                .then(() => {
                    successNotify('Form Saved Successfully')
                })
                .catch(() => {
                    errorNotify('Error while Saving the form')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full min-h-min flex flex-col flex-grow items-center">
            <div className="my-4 w-[90%] md:w-[70%]">
                <Link to={'/forms'}>
                    <Button className="float-left items-center gap-3">
                        <ArrowUturnLeftIcon className="h-5 w-5" />
                    </Button>
                </Link>
                <Button
                    className="float-right"
                    onClick={handleSave}
                    disabled={disable}
                >
                    Save
                </Button>
            </div>
            <div
                id="questionList"
                className="w-[90%] md:w-[70%] flex lg:flex flex-grow flex-col h-[60vh] overflow-y-scroll  no-scrollbar  gap-4 relative"
            >
                <FormHeader
                    headerInfo={handleHeaderValueChange}
                    savedData={{
                        title: formTemplate.title,
                        description: formTemplate.description,
                        categoryName: formTemplate.categoryName,
                    }}
                />
                {formTemplate.questions.map((component, index) => {
                    return (
                        <div
                            key={component.id}
                            className=" rounded-lg shadow-xl border-l-8 border-transparent focus-within:border-blue-500 bg-white p-2 md:p-11 h-fit"
                        >
                            <Question
                                value={component}
                                onChange={(value) => {
                                    handleQuestionChange(index, value)
                                }}
                            />
                            <div>
                                <Button
                                    variant="text"
                                    className=" text-red-500 p-2 rounded-md float-right"
                                    onClick={() => {
                                        handleDelete(index)
                                    }}
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )
                })}

                <div ref={bottomRef} />
            </div>
            <div className="flex justify-center my-4 rounded-md">
                <Button
                    className=" flex items-center p-3 bg-white text-black"
                    onClick={handleClick}
                >
                    <PlusIcon className="h-5 w-5 " />
                    Add Question
                </Button>
            </div>
        </div>
    )
}

export default Createform
