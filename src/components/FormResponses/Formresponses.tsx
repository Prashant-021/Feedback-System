import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from '@heroicons/react/24/outline'
import { EyeIcon } from '@heroicons/react/24/solid'
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Tooltip,
    IconButton,
} from '@material-tailwind/react'
import { type IFormTemplate } from '../../interface'
// import { useNavigate } from 'react-router-dom'
import FormResponseService from '../../FirebaseFiles/handle/responseFunctions'
import { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Loader from '../Loader/Loader'

interface IFormResponse extends IFormTemplate {
    Email: string
}

const TABLE_HEAD = ['Title', 'Category', 'Email', 'Actions']
const FormResponses: React.FC = () => {
    // const [open, setOpen] = useState<boolean>(false)
    // const handleOpen = (): void => {
    //     setOpen(!open)
    // }
    // const [refresh, setRefresh] = useState(false)
    const [TABLE_ROWS, setTableRows] = useState<IFormResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        FormResponseService.getAllResponse()
            .then((querySnapshot) => {
                const data: IFormResponse[] = []
                querySnapshot.forEach((doc) => {
                    console.log(doc.data(), doc.id)
                    data.push(doc.data() as IFormResponse)
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
    }, [])

    // const dispatch = useDispatch()
    // const FormTemplate: IFormTemplate = {
    //     id: '',
    //     title: '',
    //     description: '',
    //     categoryName: '',
    //     questions: [
    //         {
    //             questionTitle: '',
    //             type: '',
    //             required: false,
    //             options: [],
    //         },
    //     ],
    // }
    // const Navigate = useNavigate()
    // const createForm = (): void => {
    //     FormResponseService.addNewForm(FormTemplate)
    //         .then((response) => {
    //             console.log('Form Created')
    //             Navigate(`/forms/createform/${response.id}`)
    //             setRefresh((prevState) => !prevState)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             return err
    //         })
    //         .finally(() => {
    //             setIsLoading(false)
    //         })
    // }
    // const handleDelete = (id: string): void => {
    //     FormService.deleteform(id)
    //         .then(() => {
    //             console.log('Form deleted')
    //             setRefresh((prevState) => !prevState)
    //         })
    //         .catch(() => {
    //             console.log('There was error deleting form')
    //         })
    //         .finally(() => {
    //             setIsLoading(false)
    //         })
    // }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="flex-grow w-full flex items-center justify-center">
            <Card className=" w-full sm:w-[60%]">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="flex flex-col items-center justify-end gap-4 mt-3 md:flex-row">
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
                                ({ title, categoryName, id, Email }, index) => {
                                    const isLast =
                                        index === TABLE_ROWS.length - 1
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
                                                    {Email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                {/* <Tooltip content="Edit Form">
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
                                                </Tooltip> */}
                                                <Tooltip content="View Response">
                                                    <IconButton
                                                        variant="text"
                                                        color="blue"
                                                        // onClick={() => {
                                                        //     link = `https://dainty-bienenstitch-3297a3.netlify.app/viewform/${encodeURIComponent(
                                                        //         id
                                                        //     )}`
                                                        //     console.log(link)
                                                        //     handleOpen()
                                                        // }}
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                {/* <Dialog
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
                                                </Dialog> */}
                                                {/* <Tooltip content="Delete">
                                                    <IconButton
                                                        variant="text"
                                                        color="red"
                                                        // onClick={() => {
                                                        //     handleDelete(id)
                                                        // }}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip> */}
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

export default FormResponses
