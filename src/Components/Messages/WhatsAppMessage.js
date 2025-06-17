import React from 'react';
import { Typography } from '@mui/material';
import { Check, DoneAll, Error } from '@mui/icons-material';
import { DELIVERED, FAILED, READ, SENT } from '../../Helpers/ConstantProperties';
import Grid2 from '@mui/material/Unstable_Grid2';

const WhatsAppMessage = ({ message, status }) => {
    const getText = (message) => {
        if (message.type === "text") return message.text.body;
        if (message.type === "button") return message.button.text
        return "This is not a text message";
    }

    const getDate = (message) => {
        return new Date(message.createdAt).toLocaleDateString();
    }

    const iconSize = "16"

    const getStatusIcon = () => {
        switch (status) {
            case SENT:
                return <Check style={{ fontSize: iconSize, color: 'gray' }} />;
            case DELIVERED:
                return (
                    <>
                        <DoneAll style={{ fontSize: iconSize, color: 'gray' }} />
                    </>
                );
            case READ:
                return (
                    <>
                        <DoneAll style={{ fontSize: iconSize, color: '#4fc3f7' }} />
                    </>
                );
            case FAILED:
                return (
                    <>
                        <Error style={{ fontSize: iconSize, color: '#f44336' }} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Grid2 container spacing={0}>
            <Grid2 xs={12}>
                {getText(message)}
            </Grid2>
            <Grid2 xs={5} sm={8}></Grid2>
            <Grid2 xs={5} sm={3} alignContent={"end"} justifyItems={"flex-end"}>
                <Typography
                    paddingInlineEnd={1}
                    color={"GrayText"}
                    fontFamily={"Arial"}
                    fontSize={12}>
                    {getDate(message)}
                </Typography>
            </Grid2>
            <Grid2 xs={2} sm={1} alignContent={"end"}>
                {getStatusIcon(status)}
            </Grid2>
        </Grid2>
    );
};

export default WhatsAppMessage;
