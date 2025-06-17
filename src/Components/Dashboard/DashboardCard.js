import React, { useState } from 'react';
import { Paper } from '@mui/material';
import GenericDialog from '../GenericComponents/Dialog/GenericDialog';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import DashboardCardCommonPart from './DashboardCardCommonPart';
import DashboardCardUserActions from './DashboardCardUserActions';
import DashboardCardBody from './DashboardCardBody';

const DashboardCard = ({ item, tagColor, BodyComponent }) => {

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

    if (BodyComponent) {
        return (
            <>
                <BodyComponent tagColor={tagColor} item={item} handleDialogOpen={handleDialogOpen} />
                <GenericDialog
                    key={item.id}
                    content={dialogContent}
                    open={openDialog}
                    setOpen={setOpenDialog}
                    title={dialogTitle}
                />
            </>
        )
    }

    return (
        <Grid2 xs={12}>
            <Paper
                className='m-1 w-100'
                sx={{
                    padding: '8px',
                    minWidth: 0,
                    borderLeft: `15px solid ${tagColor}`,
                }}
            >
                <Grid2 container alignItems="center" spacing={1}>
                    <DashboardCardCommonPart item={item} />
                    <DashboardCardBody
                        item={item}
                        handleDialogOpen={handleDialogOpen}
                    />
                    <DashboardCardUserActions item={item} handleDialogOpen={handleDialogOpen} />
                </Grid2>
            </Paper>
            <GenericDialog
                key={item.id}
                content={dialogContent}
                open={openDialog}
                setOpen={setOpenDialog}
                title={dialogTitle}
            />
        </Grid2>
    );
};

export default DashboardCard;