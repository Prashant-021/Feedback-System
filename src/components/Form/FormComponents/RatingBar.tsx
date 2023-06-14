import { Button, Rating, Typography } from '@material-tailwind/react'
import React from 'react'

interface Props {
    questionTitle: string
    onChange: (value: string, id: string) => void
    isRequired: boolean
    id: string
}

const RatingBar: React.FC<Props> = ({
    questionTitle,
    id,
    onChange,
    isRequired,
}) => {
    const [rated, setRated] = React.useState(0)

    const handleClearSelection = (): void => {
        setRated(0)
        onChange('', id)
    }

    return (
        <>
            <Typography>
                {questionTitle}{' '}
                {isRequired && <span className="text-red-500">*</span>}
            </Typography>
            <div className="flex items-center gap-2 mt-2">
                <Rating
                    value={rated}
                    onChange={(value) => {
                        setRated(value)
                        onChange(String(value), id)
                    }}
                />
                <Typography color="blue-gray" className="font-medium">
                    {rated}.0 Rated
                </Typography>
            </div>
            <Button
                variant="text"
                className="float-right"
                onClick={handleClearSelection}
            >
                Clear selection
            </Button>
        </>
    )
}

export default RatingBar
