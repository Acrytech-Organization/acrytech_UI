import React, { useState } from 'react';
import { commonFontSize, FAIL, PASS, REJECT } from '../../Helpers/ConstantProperties';
import { Box, Button, TextField, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const InquiryQCAction = ({ onChange, product }) => {
    const [selectedAction, setSelectedAction] = useState("");

    if (selectedAction === PASS) {
        return (
            <Box textAlign={"center"}>
                <CheckCircleOutlineIcon color='success' />
            </Box>
        )
    }

    if (selectedAction === FAIL || selectedAction === REJECT) {
        return (
            <Box
                display="flex"
                gap={1}
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <CloseIcon color='error' />
                <TextField
                    className="bg-light"
                    size="small"
                    fullWidth
                    placeholder="Remark"
                    inputProps={{
                        maxLength: 1000,
                        className: "form-control",
                        id: "floatingInputUnits",
                    }}
                    value={product.rejectionReason}
                    onChange={(event) => product.rejectionReason = event.target.value}
                />
                <Button
                    onClick={() => onChange(selectedAction)}>
                    Submit
                </Button>
            </Box>
        )
    }

    if (selectedAction === "") {
        return (
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Box
                    onClick={() => {
                        setSelectedAction(PASS);
                        onChange(PASS);
                    }}
                >
                    <Typography fontSize={commonFontSize} color={"green"}>{PASS}</Typography>
                </Box>

                <Box
                    onClick={() => {
                        setSelectedAction(FAIL);
                    }}
                >
                    <Typography fontSize={commonFontSize} color={"yellowgreen"}>{FAIL}</Typography>
                </Box>

                <Box
                    onClick={() => {
                        setSelectedAction(REJECT);
                    }}
                >
                    <Typography fontSize={commonFontSize} color={"red"}>{REJECT}</Typography>
                </Box>
            </Box>
        )
    }
};

export default InquiryQCAction;