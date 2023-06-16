import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from '@heroicons/react/24/outline'
import {
    PencilIcon,
    DocumentPlusIcon,
    LinkIcon,
    TrashIcon,
} from '@heroicons/react/24/solid'
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Tooltip,
    IconButton,
} from '@material-tailwind/react'
import { type IFormTemplate } from '../../../interface'
import { useNavigate } from 'react-router-dom'
import { errorNotify, getDate, successNotify } from '../../../utils'
// import DialogInfo from './dialogInfo/DialogInfo'
import FormService from '../../../FirebaseFiles/handle/requestFunctions'
import { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Loader from '../../Loader/Loader'

const TABLE_HEAD = ['Title', 'Category', 'Last Modified', 'Actions']
const date = new Date()
const FormList: React.FC = () => {
    // const [open, setOpen] = useState<boolean>(false)
    const [refresh, setRefresh] = useState(false)
    const [TABLE_ROWS, setTableRows] = useState<IFormTemplate[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchCategory, setSearchCategory] = useState('')

    useEffect(() => {
        setIsLoading(true)
        FormService.getAllForms()
            .then((querySnapshot) => {
                const data: IFormTemplate[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as IFormTemplate)
                })
                if (JSON.stringify(data) !== JSON.stringify(TABLE_ROWS)) {
                    setTableRows(data)
                }
            })
            .catch((error) => {
                console.error('Error fetching forms:', error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [refresh])

    const FormTemplate: IFormTemplate = {
        id: '',
        title: '',
        description: '',
        categoryName: '',
        questions: [
            {
                id: '',
                questionTitle: '',
                type: '',
                required: false,
                options: [],
                answerValue: '',
            },
        ],
    }
    const Navigate = useNavigate()
    const createForm = (): void => {
        FormService.addNewForm(FormTemplate)
            .then((response) => {
                console.log('Form Created')
                successNotify('Form Created Successfully!!')
                Navigate(`/forms/createform/${response.id}`)
                setRefresh((prevState) => !prevState)
            })
            .catch((err) => {
                console.log(err)
                return err
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const handleDelete = (id: string): void => {
        FormService.deleteform(id)
            .then(() => {
                successNotify('Form Deleted Successfully!!')
                console.log('Form deleted')
                setRefresh((prevState) => !prevState)
            })
            .catch(() => {
                console.log('There was error deleting form')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const generateLink = (id: string): void => {
        const link = `${window.location.href}/viewform/${encodeURIComponent(
            id
        )}`
        navigator.clipboard
            .writeText(link)
            .then(() => {
                successNotify('Form link copied to clipboard')
            })
            .catch(() => {
                errorNotify('Failed to copy form link')
            })
        console.log(link)
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full p-10">
            <div className="bg-white rounded-lg p-5 mb-2">
                <Typography variant="h3" color="blue-gray">
                    Forms list
                </Typography>
            </div>
            <Card className=" w-full">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div className="w-full md:w-72 mt-2">
                            <Input
                                label="Search"
                                icon={
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                }
                                value={searchCategory}
                                onChange={(event) => {
                                    setSearchCategory(event.target.value)
                                }}
                            />
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                variant="outlined"
                                color="blue-gray"
                                size="sm"
                            >
                                view all
                            </Button>
                            <Button
                                className="flex items-center gap-3"
                                color="blue"
                                size="sm"
                                onClick={() => {
                                    createForm()
                                }}
                            >
                                <DocumentPlusIcon
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                />{' '}
                                Add Form
                            </Button>
                        </div>
                        {/* </div>
                    <div className="flex flex-col items-center justify-end gap-4 md:flex-row"> */}
                    </div>
                </CardHeader>
                <CardBody className="p-0 mt-4 overflow-scroll px-0 h-[30rem]">
                    <table className=" w-full min-w-max table-auto text-left">
                        <thead className=" bg-white">
                            <tr className="sticky top-0">
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer sticky top-0  border-blue-400 bg-blue-500 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="flex items-center justify-between gap-2 font-bold leading-none"
                                        >
                                            {head}{' '}
                                            {index !== TABLE_HEAD.length && (
                                                <ChevronUpDownIcon
                                                    strokeWidth={2}
                                                    className="h-4 w-4"
                                                />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="">
                            {TABLE_ROWS.map(
                                ({ title, categoryName, id }, index) => {
                                    const isLast = index === TABLE_ROWS.length
                                    const classes = isLast
                                        ? 'p-4'
                                        : 'p-4 border-b border-blue-gray-50'

                                    return (
                                        <tr key={nanoid()}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {title}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {categoryName}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {getDate(date)}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit Form">
                                                    <IconButton
                                                        variant="text"
                                                        color="blue-gray"
                                                        onClick={() => {
                                                            Navigate(
                                                                `/forms/createform/${id}`
                                                            )
                                                        }}
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Generate Link">
                                                    <IconButton
                                                        variant="text"
                                                        color="blue"
                                                        onClick={() => {
                                                            generateLink(id)
                                                        }}
                                                    >
                                                        <LinkIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Delete">
                                                    <IconButton
                                                        variant="text"
                                                        color="red"
                                                        onClick={() => {
                                                            const response =
                                                                confirm(
                                                                    'Are you sure want to delete ?'
                                                                )
                                                            if (response)
                                                                handleDelete(id)
                                                        }}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    )
}

export default FormList
