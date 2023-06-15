import {
    Checkbox,
    Input,
    ListItem,
    ListItemPrefix,
    Radio,
    Rating,
    Select,
    Option,
    Typography,
    Button,
} from '@material-tailwind/react'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { type Ioption, type IQuestion } from '../../interface'

const IndividualResponse: React.FC = () => {
    const location = useLocation()
    const { category } = location.state
    const Navigate = useNavigate()
    const renderQuestionType = (
        answerType: string | string[],
        questionTitle: string,
        questionType: string,
        questionOptions: Ioption[] | undefined
    ): JSX.Element | null => {
        switch (questionType) {
            case 'shortAnswer':
                return (
                    <div className="w-72">
                        <label htmlFor="">{questionTitle}</label>
                        <Input
                            size="lg"
                            variant="static"
                            className="w-[40%]"
                            value={answerType}
                            disabled
                        />
                    </div>
                )
            case 'paragraph':
                return (
                    <>
                        <label htmlFor="">{questionTitle}</label>
                        <Input
                            size="lg"
                            variant="static"
                            className="w-[80%]"
                            value={answerType}
                            disabled
                        />
                    </>
                )
            case 'multipleChoice':
                return (
                    <>
                        <label htmlFor="">{questionTitle}</label>
                        {questionOptions?.map((option) => {
                            return (
                                <ListItem className="p-0" key={option.id}>
                                    <label
                                        htmlFor="vertical-list-react"
                                        className="px-3 py-2 flex items-center w-full cursor-pointer"
                                    >
                                        <ListItemPrefix className="mr-3">
                                            <Radio
                                                name="vertical-list"
                                                id={`MCQ-vertical-${option.id}`}
                                                ripple={false}
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                    className: 'p-0',
                                                }}
                                                value={option.optionValue}
                                                checked={
                                                    answerType ===
                                                    option.optionValue
                                                }
                                                disabled
                                            />
                                        </ListItemPrefix>
                                        <Typography
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            {option.optionValue}
                                        </Typography>
                                    </label>
                                </ListItem>
                            )
                        })}
                    </>
                )
            case 'checkboxes':
                return (
                    <>
                        <label>{questionTitle}</label>
                        {questionOptions?.map((option) => {
                            return (
                                <ListItem className="p-0" key={option.id}>
                                    <label
                                        htmlFor={option.id}
                                        className="px-3 py-2 flex items-center w-full cursor-pointer"
                                    >
                                        <ListItemPrefix className="mr-3">
                                            <Checkbox
                                                name="vertical-list"
                                                id={option.id}
                                                ripple={false}
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                    className: 'p-0',
                                                }}
                                                value={option.optionValue}
                                                checked={answerType.includes(
                                                    option.optionValue
                                                )}
                                                disabled
                                            />
                                        </ListItemPrefix>
                                        <Typography
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            {option.optionValue}
                                        </Typography>
                                    </label>
                                </ListItem>
                            )
                        })}
                    </>
                )
            case 'dropdown':
                return (
                    <div className="w-72 flex-col flex">
                        <label htmlFor="">{questionTitle}</label>
                        <Select
                            variant="static"
                            value={answerType as string}
                            disabled
                            // onChange={'selected'}
                        >
                            <Option>All</Option>
                        </Select>
                    </div>
                )
            case 'rating':
                return (
                    <div className="flex flex-col gap-4">
                        <label htmlFor="">{questionTitle}</label>
                        <Rating value={Number(answerType)} readonly />
                    </div>
                )
            default:
                return null
        }
    }
    return (
        <div className="flex flex-col w-full items-center">
            <div className="w-[90%] md:w-8/12 my-5">
                <Button
                    className="gap-3 "
                    color="blue"
                    onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        Navigate(`/formresponse/${category?.categoryName}`, {
                            state: {
                                category: category.categoryName,
                            },
                        })
                    }}
                >
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                </Button>
            </div>
            <div className="flex items-center flex-col w-full mb-10 gap-4 h-[77vh] overflow-scroll">
                <div className="formHeader rounded-lg shadow-xl bg-white py-12 border-blue-600 border-t-8  px-6 md:p-11 h-fit w-[90%] md:w-8/12">
                    <Typography variant="h3" color="blue-gray" className="mb-2">
                        {category?.title ?? ''}
                    </Typography>
                    <Typography valiant="h4">
                        {category?.description ?? ''}
                    </Typography>
                    <Typography valiant="h4">
                        Category: {category?.categoryName ?? ''}
                    </Typography>
                </div>
                <div className="w-[90%] md:w-8/12 emailSection rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8  px-6 md:p-11 h-fit">
                    <label>Form Submitted as</label>
                    <Input
                        type="email"
                        variant="static"
                        placeholder="Enter Email"
                        value={category.Email}
                        disabled
                    />
                </div>
                {category?.questions.map((question: IQuestion) => (
                    <div
                        key={nanoid()}
                        className="rounded-lg shadow-xl bg-white py-12 border-transparent hover:border-blue-600 border-t-8  px-6 md:p-11 h-fit w-[90%] md:w-8/12"
                    >
                        <div>
                            {renderQuestionType(
                                question.answerValue,
                                question.questionTitle,
                                question.type,
                                question.options
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default IndividualResponse
