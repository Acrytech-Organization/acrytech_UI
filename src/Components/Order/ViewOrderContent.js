import React from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { commonFontSize, PRIMARY_COLOR, commonFontWeight } from '../../Helpers/ConstantProperties';
import { addDaysToToday, CATEGORIES } from '../../Helpers/helpers';

const ViewOrderContent = ({ item }) => {
  const statusCategory = CATEGORIES[item.status];
  const lastUpdatedDate = new Date(item.lastUpdated);
  const followUpDate = addDaysToToday(7, lastUpdatedDate);
  const formattedLastUpdated = `${lastUpdatedDate.getDate().toString().padStart(2, '0')}/${(lastUpdatedDate.getMonth() + 1).toString().padStart(2, '0')}/${lastUpdatedDate.getFullYear()}`;
  const formattedFollowUpDate = `${followUpDate.getDate().toString().padStart(2, '0')}/${(followUpDate.getMonth() + 1).toString().padStart(2, '0')}/${followUpDate.getFullYear()}`;

  const infoItems = [
    { label: "Last Update:", content: formattedLastUpdated },
    { label: "Follow-Up date:", content: formattedFollowUpDate },
    { label: "Contact Number:", content: item.contactPhone },
    { label: "Email:", content: item.contactEmail },
    { label: "Stage:", content: statusCategory?.name, contentColor: statusCategory.color },
  ];

  return (
    <Grid2 container spacing={2} >
      {infoItems?.map((info, index) => (
        <Grid2 xs={12} sm={5} md={4} lg={3} key={index}>
          <Typography fontSize={commonFontSize} sx={{ fontWeight: commonFontWeight }}>
            {info.label}
          </Typography>
          <Typography mb={2} fontSize={commonFontSize} color={info.contentColor || PRIMARY_COLOR}>
            {info.content}
          </Typography>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ViewOrderContent;