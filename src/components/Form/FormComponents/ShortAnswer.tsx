import { Button, Input } from '@material-tailwind/react'
import React from 'react'

interface Props {
    questionTitle: string
    onChange: (value: string, id: string) => void
    isRequired: boolean
    id: string
}

const ShortAnswer: React.FC<Props> = ({
    questionTitle,
    onChange,
    isRequired,
    id,
}) => {
    const handleChange = (event: any): void => {
        onChange(event.target.value, id)
    }

    return (
        <>
            <div className="w-[40%]">
                <Input
                    label={questionTitle}
                    size="lg"
                    variant="static"
                    className="w-[40%]"
                    onChange={handleChange}
                    required={isRequired}
                />
            </div>
            <Button variant="text" className="float-right">
                {' '}
                clear selection
            </Button>
        </>
    )
}

export default ShortAnswer
