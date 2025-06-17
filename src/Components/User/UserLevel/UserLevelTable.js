import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton, Typography } from '@mui/material';
import { smallFontSize, TABLE_HEADER_COLOR } from '../../../Helpers/ConstantProperties';
import DeleteIcon from '@mui/icons-material/Delete';

const UserLevelTable = ({
    data,
    groupFieldName = 'levels',
    clearField
}) => {
    const List = data[groupFieldName] || [];

    if (List.length === 0) return null;

    return (
        <Grid2
            container
            width={'100%'}
            direction="column"
            sx={{ borderRadius: 4, border: '1px solid #ccc' }}
        >
            <Grid2 container sx={{ backgroundColor: TABLE_HEADER_COLOR, borderRadius: '4px 4px 0 0' }} p={1}>
                <Grid2 xs={6}>
                    <Typography textAlign={'center'} color='white' fontSize={smallFontSize}>
                        <strong>Levels</strong>
                    </Typography>
                </Grid2>
                <Grid2 xs={6}>
                    <Typography textAlign={'center'} color='white' fontSize={smallFontSize}>
                        <strong>Actions</strong>
                    </Typography>
                </Grid2>
            </Grid2>

            <Grid2 container p={1}>
                {List.map((level, index) => (
                    <React.Fragment key={index}>
                        <Grid2 xs={6}>
                            <Typography
                                component="div"
                                fontSize={smallFontSize}
                                className="text-break"
                                textAlign={'center'}
                            >
                                {level.name}
                            </Typography>
                        </Grid2>
                        <Grid2 xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <IconButton onClick={() => clearField(groupFieldName, index)} >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Grid2>
                    </React.Fragment>
                ))}
            </Grid2>
        </Grid2>

    );
}

export default UserLevelTable;
