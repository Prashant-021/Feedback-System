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
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../interface'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { getDate } from '../../../utils'
import { deleteForm } from '../../redux/slice/slice'

const TABLE_HEAD = ['Title', 'Category', 'Created on', 'Actions']
const date = new Date()

const FormList: React.FC = () => {
    const TABLE_ROWS = useSelector((state: RootState) => state.form.form)
    const dispatch = useDispatch()
    return (
        <div className="flex-grow w-full flex items-center justify-center">
            <Card className=" w-full sm:w-[60%]">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Forms list
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                See information about all Forms
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                variant="outlined"
                                color="blue-gray"
                                size="sm"
                            >
                                view all
                            </Button>
                            <Link
                                to={'/forms/createform'}
                                state={{ formId: nanoid() }}
                            >
                                <Button
                                    className="flex items-center gap-3"
                                    color="blue"
                                    size="sm"
                                    // onClick={() => <Createform formId={nanoid()} />}
                                >
                                    <DocumentPlusIcon
                                        strokeWidth={2}
                                        className="h-4 w-4"
                                    />{' '}
                                    Add Form
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                }
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{' '}
                                            {index !==
                                                TABLE_HEAD.length - 1 && (
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
                        <tbody>
                            {TABLE_ROWS.map(
                                (
                                    { title, categoryName, description, id },
                                    index
                                ) => {
                                    const isLast =
                                        index === TABLE_ROWS.length - 1
                                    const classes = isLast
                                        ? 'p-4'
                                        : 'p-4 border-b border-blue-gray-50'

                                    return (
                                        <tr key={id}>
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
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {description}
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
                                                    <Link
                                                        to={'/forms/createform'}
                                                        state={{ formId: id }}
                                                    >
                                                        <IconButton
                                                            variant="text"
                                                            color="blue-gray"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip content="Generate Link">
                                                    <IconButton
                                                        variant="text"
                                                        color="blue"
                                                    >
                                                        <LinkIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Delete">
                                                    <IconButton
                                                        variant="text"
                                                        color="red"
                                                        onClick={() =>
                                                            dispatch(
                                                                deleteForm(id)
                                                            )
                                                        }
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
                {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" color="blue-gray" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" color="blue-gray" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter> */}
            </Card>
        </div>
    )
}

export default FormList
