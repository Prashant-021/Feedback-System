import { Rating, Typography } from '@material-tailwind/react'
import React from 'react'

const RatingComponent: React.FC = () => {
    const [rated, setRated] = React.useState(0)

    return (
        <div className="flex items-center gap-2">
            <Rating
                value={0}
                onChange={(value) => {
                    setRated(value)
                }}
                readonly
            />
            <Typography color="blue-gray" className="font-medium">
                {rated}.0 Rated
            </Typography>
        </div>
    )
}

export default RatingComponent
