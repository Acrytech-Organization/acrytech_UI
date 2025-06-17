import React from 'react';
import { Button } from "@mui/material";

const InquiryCustomButton = ({ onClick, Text, backgroundColor, type = "button" }) => {
    return (
        <Button
            onClick={onClick}
            type={type}
            variant="contained"
            sx={{ 
                backgroundColor: backgroundColor, 
                width: '100%',
                whiteSpace: 'nowrap',
            }}
        >
            {Text}
        </Button>
    );
};

export default InquiryCustomButton;