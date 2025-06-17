import React, { useContext, useState } from 'react';
import { Box, Paper, Typography, Tooltip } from '@mui/material';
import { getDateDifferance, getLocalDateString } from '../../Helpers/helpers';
import InquiryDialog from '../Inquiry/InquiryDialog';
import { DateContext } from '../Contexts/DateContext';
import { commonFontWeight, regularFontSize, smallFontSize } from '../../Helpers/ConstantProperties';

const LeadCardContent = ({ data }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [selected, setSelected] = useState();

    const { currentDate } = useContext(DateContext);

    const handleClick = (lead) => {
        setSelected(lead);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setSelected(null);
        setShowDialog(false);
    };

    return (
        <Box className='w-100'>
            <Paper
                className={`p-2 text-center`}
                sx={{
                    backgroundColor: 'white',
                    minWidth: 0,
                    display: {
                        xs: "none",
                        lg: "block"
                    }
                }}>
                <Typography color={data.metadata.color}>
                    {`${data.metadata.name} (${data.leads?.length || 0})`}
                </Typography>
            </Paper>
            {data.leads?.map((lead, index) => {
                var customerName = lead.customerName ? lead.customerName : "New Customer";

                var daysToFollowUp = getDateDifferance(lead.followUpDate, currentDate);

                var bgClassToAdd = "";

                if (daysToFollowUp > 0) bgClassToAdd = "bg-danger-subtle";
                if (daysToFollowUp === 0) bgClassToAdd = "bg-warning-subtle";

                return (
                    <Paper key={index} className={'my-2 ' + bgClassToAdd} sx={{ padding: '10px', minWidth: 0 }} >
                        <Tooltip
                            title={customerName}
                            arrow
                            color="primary"
                            placement="top-start"
                            variant="outlined"
                        >
                            <Typography
                                noWrap
                                variant="h6"
                                component="div"
                                color="primary.main"
                                className="pb-1"
                                textTransform={"capitalize"}
                                onClick={() => handleClick(lead)}
                                sx={{
                                    fontWeight: commonFontWeight,
                                    fontSize: regularFontSize,
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                {customerName.toLowerCase()}
                            </Typography>
                        </Tooltip>

                        <Typography
                            className='p-2 text-center'
                            sx={{ fontSize: smallFontSize, color: 'text.secondary' }}>
                            Update Date: {getLocalDateString(lead.lastUpdated)}
                        </Typography>

                        <Typography
                            className='p-2 text-center text-break'
                            sx={{ fontSize: smallFontSize, color: 'text.secondary' }}>
                            Source: {lead.sourceOfLead}
                        </Typography>

                        <Typography
                            className='p-2 text-center'
                            sx={{ fontSize: smallFontSize, color: 'text.secondary' }}>
                            Not Updated Since: {getDateDifferance(lead.lastUpdated, currentDate)} days
                        </Typography>

                        <Typography
                            className='p-2 text-center'
                            sx={{ fontSize: smallFontSize, color: 'text.secondary' }}>
                            Follow Up Date: {getLocalDateString(lead.followUpDate)}
                        </Typography>

                    </Paper>
                )
            })}
            {selected && <InquiryDialog item={selected} dialog={showDialog} setDialog={handleCloseDialog} />}
        </Box>
    );
};

export default LeadCardContent;