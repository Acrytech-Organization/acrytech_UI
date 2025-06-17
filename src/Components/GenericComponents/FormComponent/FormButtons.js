import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { GREEN_BUTTON, COLOR_RED } from "../../../Helpers/ConstantProperties";
import { useNavigate } from "react-router-dom";
import InquiryCustomButton from "../../Inquiry/InquiryCustomButton";

const FormButtons = ({ onSaveClick, navigateTo, handleCancel }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const navigateOnCancel = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent={isSmallScreen ? 'center' : 'center'}>
                <Grid item xs={isSmallScreen ? 3 : 'auto'}>
                    <InquiryCustomButton
                        type='sumbit'
                        onClick={onSaveClick}
                        Text="Save"
                        backgroundColor={GREEN_BUTTON}
                    />
                </Grid>
                <Grid item xs={isSmallScreen ? 4 : 'auto'}>
                    <InquiryCustomButton
                        onClick={() => handleCancel ? handleCancel(): navigateOnCancel(navigateTo)}
                        Text="Cancel"
                        backgroundColor={COLOR_RED}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormButtons;