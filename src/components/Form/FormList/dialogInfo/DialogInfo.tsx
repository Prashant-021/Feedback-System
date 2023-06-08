import {
    DialogHeader,
    DialogBody,
    Button,
    Typography,
} from '@material-tailwind/react'
import React from 'react'

interface Props {
    formLink: string
}

const DialogInfo: React.FC<Props> = ({ formLink }) => {
    const copyToClipboard = (): void => {
        navigator.clipboard
            .writeText(formLink)
            .then(() => {
                alert('Form link copied to clipboard')
            })
            .catch(() => {
                alert('Failed to copy form link')
            })
    }
    return (
        <>
            <DialogHeader>Form Link</DialogHeader>
            <DialogBody divider>
                <Typography>{formLink}</Typography>
                <Button onClick={copyToClipboard} className="mt-4">
                    Copy
                </Button>
            </DialogBody>
        </>
    )
}

export default DialogInfo
