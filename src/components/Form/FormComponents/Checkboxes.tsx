import {
    Button,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { type Ioption } from '../../../interface'

interface CheckboxesProps {
    questionTitle: string
    isRequired: boolean
    optionlist: Ioption[]
    onChange: (selectedOptions: string[], id: string) => void
    id: string
}

const Checkboxes: React.FC<CheckboxesProps> = ({
    questionTitle,
    optionlist,
    isRequired,
    onChange,
    id,
}) => {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([])

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { id, checked } = event.currentTarget
        if (checked) {
            setSelectedOptions((prevOptions) => [...prevOptions, id])
        } else {
            setSelectedOptions((prevOptions) =>
                prevOptions.filter((optionId) => optionId !== id)
            )
        }
    }

    const handleClearSelection = (): void => {
        setSelectedOptions([])
    }

    useEffect(() => {
        onChange(selectedOptions, id)
    }, [selectedOptions, onChange, id])

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
                            htmlFor={option.id}
                            className="px-3 py-2 flex items-center w-full cursor-pointer"
                        >
                            <ListItemPrefix className="mr-3">
                                <input
                                    type="checkbox"
                                    id={option.id}
                                    onChange={handleCheckboxChange}
                                    checked={selectedOptions.includes(
                                        option.id
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
            <Button
                variant="text"
                className="float-right mt-4"
                onClick={handleClearSelection}
            >
                Clear selection
            </Button>
        </div>
    )
}

export default Checkboxes
