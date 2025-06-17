import React from 'react'
import { CircularProgress, Box } from '@mui/material'

const GenericSpinner = () => {
    return (
        <Box className="cicularSpinner">
            <CircularProgress size={40} />
        </Box>
    )
}

export default GenericSpinner