import React from 'react';
import { Box, Typography, TextField, Button, InputAdornment   } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { commonFontWeight } from '../../../Helpers/ConstantProperties';

const GenericHeader = ({
    title,
    textFieldLabel,
    buttonText,
    searchstring,
    setSearchString,
    onButtonClick
}) => {
    return (
        <Box >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'start', gap: 2, flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: commonFontWeight}}>
                    {title}
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: { sm: 'space-between' },
                        alignItems: 'center',
                        gap: { xs: 2, sm: 2 },
                    }}
                >
                    <TextField
                        value={searchstring}
                        onChange={(e) => setSearchString(e.target.value)}
                        size='small'
                        className="w-75 fw-normal"
                        variant="outlined"
                        placeholder={textFieldLabel}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                   {
                   onButtonClick && buttonText && (<Button
                        variant='contained'
                        className="fs-6 fw-small text-capitalize d-inline-flex align-items-center"
                        onClick={onButtonClick}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        <span className="ms-2 d-flex">{buttonText}</span>
                    </Button>)}
                </Box>
            </Box>
        </Box>
    );
};

export default GenericHeader;