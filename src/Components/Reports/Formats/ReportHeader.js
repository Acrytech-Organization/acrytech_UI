import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useContext } from 'react';
import { FirmContext } from '../../Contexts/FirmContext';
import { Typography, useTheme } from '@mui/material';
import { largeFontSize } from '../../../Helpers/ConstantProperties';

const ReportHeader = ({ total, header, transform }) => {
    const { currentFirm } = useContext(FirmContext);

    const theme = useTheme();

    const firmColor = currentFirm.color.appBarColor;
    const textColor = theme.palette.common.white;

    const transformScale = transform ? "scaleX(-1)" : "";
    const headAlign = transform ? "left" : "right";

    return (
        <Grid2
            container
            alignItems={"center"}
            sx={{ transform: transformScale, background: firmColor, opacity: "70%" }}>

            <Grid2 xs={6} textAlign={"center"}>
                <Typography
                    sx={{ transform: transformScale }}
                    fontSize={largeFontSize}>

                    {total}
                </Typography>
            </Grid2>

            <Grid2 xs={6} textAlign={headAlign}>
                <Typography
                    sx={{ transform: transformScale }}
                    fontSize={largeFontSize}
                    padding={1}
                    color={textColor}>

                    {header}
                </Typography>
            </Grid2>

        </Grid2>
    )
};

export default ReportHeader;