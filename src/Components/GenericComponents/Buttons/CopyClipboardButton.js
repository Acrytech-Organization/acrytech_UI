import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Button } from '@mui/material';
import { useState } from 'react';

export const CopyClipboardButton = ({ data, variant = 'text', size = "small" }) => {
    const [copy, setCopy] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(data)
        setCopy(true)
        setTimeout(() => { setCopy(false) }, 1000);
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleCopy}
        >
            {copy ? <FileDownloadDoneIcon /> : <ContentCopyIcon />}
        </Button>
    )
}