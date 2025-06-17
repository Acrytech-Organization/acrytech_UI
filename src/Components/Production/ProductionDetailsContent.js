import React from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { commonFontSize, PRIMARY_COLOR, commonFontWeight } from '../../Helpers/ConstantProperties';
import { CATEGORIES } from '../../Helpers/helpers';

const ProductionDetailsContent = ({ item }) => {
  const statusCategory = CATEGORIES[item.status];

  const infoItems = [
    { label: "Order ID:", content: item.orderId || 12345 },
    { label: "PO Number:", content: item.PoNumber || "PO-12345"},
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

export default ProductionDetailsContent;