import {
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from '@material-tailwind/react'
import React, { useRef } from 'react'
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
    onChange,
    id,
}) => {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

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

    const handleClearSelection = (): void => {
        setSelectedOptions([])
        if (inputRef.current != null) {
            inputRef.current.value = ''
        }
    }

    React.useEffect(() => {
        onChange(selectedOptions, id)
    }, [selectedOptions, onChange, id])

    return (
        <div>
            <Typography>{questionTitle}</Typography>
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
            {/* {selectedOptions.length > 0 && ( */}
            <Button
                variant="text"
                className="float-right mt-4"
                onClick={handleClearSelection}
            >
                Clear selection
            </Button>
            {/* )}   */}
            {/* <input
                ref={inputRef}
                type="text"
                value={selectedOptions.join(', ')}
                readOnly
                className="border border-gray-300 rounded-md px-3 py-2 mt-2"
            /> */}
        </div>
    )
}

export default Checkboxes
