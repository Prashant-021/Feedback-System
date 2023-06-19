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
    useEffect((): void => {
        setIsTouched(true)
        if (isTouched && isRequired && rated === 0) {
            setErrorMessage('Please rate the question.')
        } else {
            setErrorMessage('')
            onChange(String(rated), id)
        }
    }, [rated])

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
                        setErrorMessage('')
                        onChange(String(value), id)
                    }}
                />
                <Typography color="blue-gray" className="font-medium">
                    {rated}.0 Rated
                </Typography>
            </div>
            {errorMessage.length > 0 && (
                <Typography className="mt-2 text-red-500">
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
