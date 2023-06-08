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
    Dialog,
    DialogFooter,
} from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../../interface'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { getDate } from '../../../utils'
import { deleteForm } from '../../redux/slice/slice'
import { useState } from 'react'
import DialogInfo from './dialogInfo/DialogInfo'

const TABLE_HEAD = ['Title', 'Category', 'Last Modified', 'Actions']
const date = new Date()
let link: string = ''
const FormList: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = (): void => {
        setOpen(!open)
    }
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
                <CardBody className="p-0 mt-4 overflow-scroll px-0 h-[30rem]">
                    <table className=" w-full min-w-max table-auto text-left">
                        <thead>
                            <tr className="sticky top-0">
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
                        <tbody className="">
                            {TABLE_ROWS.map(
                                ({ title, categoryName, id }, index) => {
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
                                                        state={{
                                                            formId: id,
                                                        }}
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
                                                        onClick={() => {
                                                            link = `http://localhost:3000/viewform/${encodeURIComponent(
                                                                id
                                                            )}`
                                                            console.log(link)
                                                            handleOpen()
                                                        }}
                                                    >
                                                        <LinkIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Dialog
                                                    open={open}
                                                    handler={handleOpen}
                                                >
                                                    <DialogInfo
                                                        formLink={link}
                                                    />
                                                    <DialogFooter>
                                                        <Button
                                                            variant="text"
                                                            color="red"
                                                            onClick={handleOpen}
                                                            className="mr-1"
                                                        >
                                                            <span>Cancel</span>
                                                        </Button>
                                                    </DialogFooter>
                                                </Dialog>
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
            </Card>
        </div>
    )
}

export default FormList
