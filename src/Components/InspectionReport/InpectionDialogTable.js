import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { VIEW_INSPECTION, regularFontSize, commonFontWeight } from '../../Helpers/ConstantProperties';
import Grid2 from '@mui/material/Unstable_Grid2';

const InpectionDialogTable = ({ item, source, displayIcon }) => {
  const navigate = useNavigate();

  const products = item?.products;

  const handleRedirect = (product, index) => {
    navigate(VIEW_INSPECTION, { state: { item, product, index, source: source } });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid2 container spacing={2}>
        {products?.map((productObj, index) => (
          <Grid2 xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
                border: '1px solid lightgray',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Typography sx={{ fontSize: regularFontSize, fontWeight: commonFontWeight }}>
                {productObj.product.name}
              </Typography>

              <Box sx={{ display: 'flex' }}>
                <IconButton onClick={() => handleRedirect(productObj, index)} aria-label="Create Inspection">
                  <displayIcon.icon color={displayIcon.color} fontSize='small' />
                </IconButton>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default InpectionDialogTable;
