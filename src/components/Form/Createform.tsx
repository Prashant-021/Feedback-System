import React, { useEffect, useRef, useState } from 'react'
import { Button, Spinner } from '@material-tailwind/react'
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
    type ComponentData,
    type IFormTemplate,
    type IQuestion,
} from '../../interface'
import FormHeader from './formFields/FormHeader'
import { nanoid } from '@reduxjs/toolkit'

const Createform: React.FC = () => {
    const location = useLocation()
    const path = location.pathname.split('/')
    const formId = path[path.length - 1]

    const [isLoading, setIsLoading] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)
    const [formTemplate, setFormTemplate] = useState<IFormTemplate>({
        id: formId,
        title: '',
        description: '',
        categoryName: '',
        questions: [
            {
                questionTitle: '',
                type: '',
                required: false,
                options: [],
            },
        ],
    })
    const [createdComponents, setCreatedComponents] = useState<ComponentData[]>(
        formTemplate != null
            ? formTemplate.questions.map((question) => ({
                  id: nanoid(),
                  contentValue: question,
              }))
            : []
    )
    useEffect((): void => {
        FormService.getForm(formId)
            .then((formDoc) => {
                console.log(formDoc)
                if (formDoc !== null) {
                    const categoryData = formDoc.data()
                    setFormTemplate((prevFormTemplate) => ({
                        ...prevFormTemplate,
                        id: formDoc.id,
                        title: categoryData?.title,
                        description: categoryData?.description,
                        categoryName: categoryData?.categoryName,
                        questions: categoryData?.questions,
                    }))
                } else {
                    console.log('Form not found')
                }
            })
            .catch((error) => {
                console.error('Error fetching Form:', error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    const handleHeaderValueChange = (value: IFormHeader): void => {
        setFormTemplate((prevFormTemplate) => ({
            ...prevFormTemplate,
            title: value.title,
            description: value.description,
            categoryName: value.categoryName,
        }))
    }

    useEffect(() => {
        if (formTemplate != null) {
            setCreatedComponents(
                formTemplate.questions.map((question) => ({
                    id: nanoid(),
                    contentValue: question,
                }))
            )
            setFormTemplate(formTemplate)
        }
    }, [formTemplate, formId])

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    )

    const handleClick = (): void => {
        const newComponent: ComponentData = {
            id: nanoid(),
            contentValue: {
                questionTitle: '',
                type: '',
                required: false,
                options: [],
            },
        }
        setCreatedComponents((prevComponents) => [
            ...prevComponents,
            newComponent,
        ])

        timeoutRef.current = setTimeout(
            () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
            10
        )
    }

    const handleDelete = (index: number): void => {
        const updatedComponents = [...createdComponents]
        updatedComponents.splice(index, 1)
        setCreatedComponents(updatedComponents)
    }
    const getQuestions = (): IQuestion[] => {
        return createdComponents.map((component) => {
            return component.contentValue
        })
    }
    const handleQuestionChange = (index: number, value: IQuestion): void => {
        const updatedComponents = [...createdComponents]
        updatedComponents[index].contentValue = {
            questionTitle: value.questionTitle,
            type: value.type,
            options: value.options,
            required: value.required,
        }
        setCreatedComponents(updatedComponents)
    }
    const handleSave = (): void => {
        setFormTemplate((prevFormTemplate) => {
            const updatedTemplate = {
                ...prevFormTemplate,
                questions: getQuestions(),
            }

            FormService.updateform(formId, updatedTemplate)
                .then(() => {
                    console.log('Form updated')
                })
                .catch((err) => {
                    console.log(err)
                })

            return updatedTemplate
        })
    }

    if (isLoading) {
        return (
            <div className="w-screen flex justify-center items-center">
                Loading...
                <Spinner className="h-12 w-12" />
            </div>
        )
    }
    return (
        <div className="w-full min-h-min flex flex-col flex-grow items-center">
            <div className="my-4 w-[90%] md:w-[70%]">
                <Link to={'/forms'}>
                    <Button className="float-left items-center gap-3">
                        <ArrowUturnLeftIcon className="h-5 w-5" />
                    </Button>
                </Link>
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
                {createdComponents.map((component, index) => {
                    return (
                        <div
                            key={component.id}
                            className=" rounded-lg shadow-xl border-l-8 border-transparent focus-within:border-blue-500 bg-white p-2 md:p-11 h-fit"
                        >
                            <Question
                                value={component.contentValue}
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
