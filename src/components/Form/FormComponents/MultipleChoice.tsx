/* eslint-disable react/prop-types */
import {
    Radio,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    Button,
} from '@material-tailwind/react'
import { type Ioption } from '../../../interface'
import React from 'react'

interface Props {
    optionlist: Ioption[]
    questionTitle: string
    onChange: (value: string, id: string) => void
    isRequired: boolean
    id: string
}

const MultipleChoice: React.FC<Props> = ({
    questionTitle,
    id,
    onChange,
    optionlist,
    isRequired,
}) => {
    const handleValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        onChange(event.target.value, id)
    }
    return (
        <div>
            <Typography>
                {questionTitle}{' '}
                {isRequired && <span className="text-red-500">*</span>}
            </Typography>
            <List>
                {optionlist.map((option) => (
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
                                    onChange={handleValueChange}
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
                ))}
            </List>
            <Button variant="text" className="float-right mt-4">
                {' '}
                clear selection
            </Button>
        </div>
    )
}

export default MultipleChoice
