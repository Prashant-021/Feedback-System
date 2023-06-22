import { Button, Rating, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

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
    const [rated, setRated] = useState<number>(0)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isTouched, setIsTouched] = useState<boolean>(false)

    const handleClearSelection = (): void => {
        setRated(0)
        setErrorMessage('')
        onChange('', id)
    }

    useEffect(() => {
        setIsTouched(true)
        if (isTouched) {
            if (isRequired && rated === 0) {
                setErrorMessage('Please rate the question.')
            } else {
                setErrorMessage('')
                onChange(String(rated), id)
            }
        }
    }, [rated, isTouched])

    return (
        <>
            <Typography variant="small" className="text-gray-700">
                {questionTitle}{' '}
                {isRequired && <span className="text-red-500">*</span>}
            </Typography>
            <div className="flex items-center gap-2 mt-2">
                <Rating
                    value={rated}
                    onChange={(value) => {
                        setRated(value)
                        setErrorMessage('')
                        setIsTouched(true) // Set isTouched to true when rating changes
                    }}
                />
                <Typography color="blue-gray" className="font-medium">
                    {rated}.0 Rated
                </Typography>
            </div>
            {errorMessage.length > 0 && (
                <Typography variant="small" color="red" className="absolute">
                    {errorMessage}
                </Typography>
            )}
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
