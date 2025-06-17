import React, { useState } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { addDaysToToday } from '../../Helpers/helpers';
import { ORDER_CATEGORY, COMPLETED, INACTIVE, ACTIVE, commonFontSize } from '../../Helpers/ConstantProperties';
import GenericDashboardCard from '../GenericComponents/Body/GenericDashboardCard';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import GenericProductList from '../GenericComponents/Body/GenericProductList';
import ProductionDashboardActions from './ProductionActions/ProductionDashboardActions';

const ProductionDashboardCard = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const futureDate = addDaysToToday(15).toLocaleDateString();
  const products = data?.products || [];

  const materials = products.map(product => ({
    processes: product?.processes || [],
    rawMaterials: product?.rmlist || []
  }));

  const hasProcesses = materials.some(item => item.processes.length > 0);
  const hasRawMaterials = materials.some(item => item.rawMaterials.length > 0);

  const currentStatus = hasProcesses && hasRawMaterials
    ? COMPLETED
    : hasProcesses || hasRawMaterials
    ? ACTIVE
    : INACTIVE;

  const orderCategory = ORDER_CATEGORY[currentStatus] || ORDER_CATEGORY[INACTIVE];
  const { name: categoryName, color: categoryColor } = orderCategory;

  const productionData = [
    {
      key: 'orderNo',
      gridSizes: { xs: 12, sm: 6, md: 1 },
      render: (data) => <Typography fontSize={commonFontSize}>{data.orderNo || '12345'}</Typography>
    },
    {
      key: 'poNo',
      gridSizes: { xs: 12, sm: 6, md: 1 },
      render: (data) => <Typography fontSize={commonFontSize}>{data.poNo || 'PO-12345'}</Typography>
    },
    {
      key: 'companyName',
      gridSizes: { xs: 12, sm: 6, md: 1.5 },
      render: (data) => <Typography fontSize={commonFontSize}>{data.customerName || 'New Customer'}</Typography>
    },
    {
      key: 'products',
      gridSizes: { xs: 12, sm: 6, md: 2 },
      render: (data) => <GenericProductList products={products} />
    },
    {
      key: 'futureDate',
      gridSizes: { xs: 12, sm: 6, md: 1.5 },
      render: () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CalendarMonthRoundedIcon className='text-secondary' fontSize="small" sx={{ marginRight: 1 }} />
          <Typography fontSize={commonFontSize}>{futureDate}</Typography>
        </div>
      )
    },
    {
      key: 'processApplied',
      gridSizes: { xs: 12, sm: 6, md: 2.5 },
      render: (data) => (
        <GenericProductList products={materials.flatMap(item => item.processes)} />
      )
    },
    {
      key: 'statusName',
      gridSizes: { xs: 12, sm: 6, md: 1 },
      render: () => <Typography fontSize={commonFontSize} color={categoryColor}>{categoryName}</Typography>
    }
  ];

  return (
    <GenericDashboardCard
      data={data}
      columns={productionData}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      DialogTitle={'Follow up Production'}
    >
      <Grid display={'flex'} item xs={12} sm={6} md={1.5}>
        <IconButton aria-label="call" color="warning" onClick={() => setOpenDialog(true)}>
          <AddCommentRoundedIcon />
        </IconButton>
        <ProductionDashboardActions item={data} processes={materials.flatMap(item => item.processes)} />
      </Grid>
    </GenericDashboardCard>
  );
};

export default ProductionDashboardCard;
