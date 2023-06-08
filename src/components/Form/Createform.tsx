import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@material-tailwind/react'
import Question from './Question'
import { TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import FormHeader from './formFields/FormHeader'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addForm } from '../redux/slice/slice'
import {
    type RootState,
    type ComponentData,
    type IFormTemplate,
    type IQuestion,
} from '../../interface'
import { nanoid } from '@reduxjs/toolkit'

const Createform: React.FC = () => {
    const location = useLocation()
    const { formId } = location.state
    const bottomRef = useRef<HTMLDivElement>(null)

    const savedForm = useSelector((state: RootState) =>
        state.form.form.find((form) => form.id === formId)
    )

    const categoryHeaderRef = useRef<{
        title: string
        description: string
        categoryName: string
    }>({
        title: savedForm != null ? savedForm.title : 'Title',
        description: savedForm != null ? savedForm.description : 'Description',
        categoryName: savedForm != null ? savedForm.categoryName : 'Category',
    })
    const [createdComponents, setCreatedComponents] = useState<ComponentData[]>(
        savedForm != null
            ? savedForm.questions.map((question) => ({
                  id: nanoid(),
                  contentValue: question,
              }))
            : []
    )

    useEffect(() => {
        if (savedForm != null) {
            setCreatedComponents(
                savedForm.questions.map((question) => ({
                    id: nanoid(),
                    contentValue: question,
                }))
            )
            setFormTemplate(savedForm)
        }
    }, [savedForm, formId])

    const [formTemplate, setFormTemplate] = useState<IFormTemplate>({
        id: '',
        title: '',
        description: '',
        categoryName: '',
        questions: [
            {
                questionTitle: '',
                type: '',
                required: false,
            },
        ],
    })
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

    const handleHeaderInfo = (formHead: {
        title: string
        description: string
        categoryName: string
    }): void => {
        categoryHeaderRef.current.title = formHead.title
        categoryHeaderRef.current.description = formHead.description
        categoryHeaderRef.current.categoryName = formHead.categoryName
    }
    const getQuestions = (): IQuestion[] => {
        return createdComponents.map((component) => {
            return component.contentValue
        })
    }

    const dispatch = useDispatch()
    const handleSave = (): void => {
        const updatedFormTemplate: IFormTemplate = {
            id: formId,
            title: categoryHeaderRef.current.title,
            description: categoryHeaderRef.current.description,
            categoryName: categoryHeaderRef.current.categoryName,
            questions: getQuestions(),
        }
        setFormTemplate(updatedFormTemplate)
    }
    useEffect(() => {
        if (formTemplate.id !== '') dispatch(addForm(formTemplate))
    }, [formTemplate])
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
                    headerInfo={handleHeaderInfo}
                    savedData={{
                        title: savedForm?.title ?? 'Untitled Form',
                        description:
                            savedForm?.description ?? 'Form description',
                        categoryName: savedForm?.categoryName ?? 'category',
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Add Question
                </Button>
            </div>
        </div>
    )
}

export default Createform
