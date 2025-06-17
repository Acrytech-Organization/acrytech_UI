import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import DashboardCardCommonPart from "./DashboardCardCommonPart";
import { useContext, useState } from "react";
import { RouteContext } from "./InquiryDashboard";
import InquiryCardBody from "./InquiryCardBody";
import GenericDialog from "../GenericComponents/Dialog/GenericDialog";
import React from "react";

export default function InquiryCard({ inquiry, tagColor }) {
    const { statusGroup } = useContext(RouteContext);

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [dialogTitle, setDialogTitle] = useState();

    const handleDialogOpen = (content, action = true, title) => {
        if (content) setDialogContent(content);
        setOpenDialog(action);
        if (title) {
            setDialogTitle(title);
        }
    };

    return (
        <Grid2 xs={12}>
            <Paper
                className='m-1 w-100'
                sx={{
                    padding: '8px',
                    minWidth: 0,
                    borderLeft: `15px solid ${statusGroup.tagColor}`,
                }}
            >
                <Grid2 container rowGap={1} alignItems="center">
                    <DashboardCardCommonPart item={inquiry} />
                    <InquiryCardBody inquiry={inquiry} handleDialogOpen={handleDialogOpen} />
                </Grid2>
            </Paper>
            <GenericDialog
                key={inquiry.id}
                content={dialogContent}
                open={openDialog}
                setOpen={setOpenDialog}
                title={dialogTitle}
            />
        </Grid2>
    );
}