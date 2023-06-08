/* eslint-disable react/prop-types */
import {
    Radio,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from '@material-tailwind/react'
import { type Ioption } from '../../../interface'
import React from 'react'

interface Props {
    optionlist: Ioption[]
    onChange: (value: string, id: string) => void
    id: string
}

const MultipleChoice: React.FC<Props> = ({ id, onChange, optionlist }) => {
    const handleValueChange = (event: { target: { value: any } }): void => {
        onChange(event.target.value, id)
    }
    return (
        <div>
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
        </div>
    )
}

export default MultipleChoice
