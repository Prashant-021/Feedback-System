import {
    Checkbox,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from '@material-tailwind/react'
import React from 'react'
import { type Ioption } from '../../../interface'

interface CheckboxesProps {
    optionlist: Ioption[]
    onChange: (selectedOptions: string[], id: string) => void
    id: string
}

const Checkboxes: React.FC<CheckboxesProps> = ({
    optionlist,
    onChange,
    id,
}) => {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([])

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { value, checked } = event.target
        if (checked) {
            setSelectedOptions((prevOptions) => [...prevOptions, value])
        } else {
            setSelectedOptions((prevOptions) =>
                prevOptions.filter((option) => option !== value)
            )
        }
    }

    React.useEffect(() => {
        onChange(selectedOptions, id)
    }, [selectedOptions, onChange])

    return (
        <div>
            <List>
                {optionlist.map((option) => (
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
                                    onChange={handleCheckboxChange}
                                    checked={selectedOptions.includes(
                                        option.optionValue
                                    )}
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

export default Checkboxes
