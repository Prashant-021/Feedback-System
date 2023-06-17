import React, { useEffect, useRef, useState } from 'react'
import { Button, Tooltip } from '@material-tailwind/react'
import Question from './Question'
import {
    ArrowUturnLeftIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/solid'
import { Link, useLocation } from 'react-router-dom'
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

    const [isLoading, setIsLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const [formTemplate, setFormTemplate] = useState<IFormTemplate>({
        id: formId,
        title: 'Untitled Form',
        description: '',
        categoryName: '',
        questions: [
            {
                id: nanoid(),
                questionTitle: '',
                type: '',
                required: false,
                options: [],
                answerValue: '',
            },
        ],
    })
    // const [createdComponents, setCreatedComponents] = useState<ComponentData[]>(
    //     formTemplate != null
    //         ? formTemplate.questions.map((question) => ({
    //               id: nanoid(),
    //               contentValue: question,
    //           }))
    //         : []
    // )
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
    // useEffect(() => {
    //     if (formTemplate != null) {
    //         setCreatedComponents(
    //             formTemplate.questions.map((question) => ({
    //                 id: nanoid(),
    //                 contentValue: question,
    //             }))
    //         )
    //         setFormTemplate(formTemplate)
    //     }
    // }, [formTemplate, formId])

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    )

    const handleClick = (): void => {
        const newComponent: IQuestion = {
            // id: nanoid(),
            // contentValue: {
            id: nanoid(),
            questionTitle: '',
            type: '',
            required: false,
            options: [],
            answerValue: '',
        }
        // setCreatedComponents((prevComponents) => [
        //     ...prevComponents,
        //     newComponent,
        // ])
        const updatedQuestionsList = [...formTemplate.questions, newComponent]
        setFormTemplate((prevState) => ({
            ...prevState,
            questions: updatedQuestionsList,
        }))

        timeoutRef.current = setTimeout(
            () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
            10
        )
    }

    const handleDelete = (index: number): void => {
        setFormTemplate((prevState) => {
            const updatedQuestions = [...prevState.questions]
            updatedQuestions.splice(index, 1)
            return { ...prevState, questions: updatedQuestions }
        })
    }
    // const getQuestions = (): IQuestion[] => {
    //     return createdComponents.map((component) => {
    //         return component.contentValue
    //     })
    // }
    const handleQuestionChange = (index: number, value: IQuestion): void => {
        // const updatedquestion = value
        // setFormTemplate((prevState) => ({
        //     ...prevState,
        //     questions: { ...prevState.questions, updatedquestion },
        // }))
        // updatedComponents[index].contentValue = {
        //     id: value.id,
        //     questionTitle: value.questionTitle,
        //     type: value.type,
        //     options: value.options,
        //     required: value.required,
        //     answerValue: '',
        // }
        // setCreatedComponents(updatedComponents)
        // console.log(getQuestions())
        // setFormTemplate((prevState) => {
        //     const updatedTemplate: IFormTemplate = {
        //         ...prevState,
        //         questions: getQuestions(),
        //     }
        //     return updatedTemplate
        // })
        setFormTemplate((prevState) => {
            const updatedQuestions = [...prevState.questions] // Create a copy of the questions array
            updatedQuestions[index] = value // Update the question at the specified index
            return { ...prevState, questions: updatedQuestions } // Update the formTemplate state with the updated questions array
        })
        // console.log(value)
        // console.log(formTemplate.questions)
    }

    const handleSave = (): void => {
        // FormService.updateform(formId, updatedTemplate)
        //     .then(() => {
        //         successNotify('Form Updated Successfully!!')
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        // return updatedTemplate
        // })
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
                <Tooltip content="Save the form">
                    <Link to={'/forms'}>
                        <Button className="float-left items-center gap-3">
                            <ArrowUturnLeftIcon className="h-5 w-5" />
                        </Button>
                    </Link>
                </Tooltip>
                <Button className="float-right" onClick={handleSave}>
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
