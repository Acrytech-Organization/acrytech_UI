import React from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { commonFontSize, PRIMARY_COLOR, commonFontWeight } from '../../Helpers/ConstantProperties';
import { CATEGORIES, checkValue } from '../../Helpers/helpers';
import { CopyClipboardButton } from '../GenericComponents/Buttons/CopyClipboardButton';

const GenerateRequirementContent = ({ item }) => {
  const statusCategory = CATEGORIES[item.status];

  const infoItems = [
    { label: "Contact Number:", content: checkValue(item?.contactPhone) },
    { label: "Email:", content: checkValue(item?.contactEmail) },
    { label: "Stage:", content: checkValue(statusCategory?.name), contentColor: statusCategory.color },
  ];

  var col = 4;

  if (item.designUrl) {
    infoItems.push(
      {
        label: 'inquiryDesign', content: <Grid2>
          <CopyClipboardButton data={item.designUrl} />
        </Grid2>
      }
    )
    col = 3
  }

  return (
    <Grid2 container>
      {infoItems?.map((info, index) => (
        <Grid2 xs={12} md={col} key={index}>
          <Typography fontSize={commonFontSize} sx={{ fontWeight: commonFontWeight }}>
            {info.label}
          </Typography>
          <Typography fontSize={commonFontSize} color={info.contentColor || PRIMARY_COLOR}>
            {info.content}
          </Typography>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GenerateRequirementContent;