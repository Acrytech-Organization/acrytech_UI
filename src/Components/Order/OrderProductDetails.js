import React, { useContext, useMemo, useState } from 'react';
import { IconButton, Paper, Typography } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DateContext } from '../Contexts/DateContext';
import { commonFontSize, INACTIVE, ORDER_CATEGORY } from '../../Helpers/ConstantProperties';
import { addDaysToToday } from '../../Helpers/helpers';
import FollowUpDialogContent from '../Dashboard/FollowUpDialogContent';
import InquiryDialog from '../Inquiry/InquiryDialog';
import GenericDialog from '../GenericComponents/Dialog/GenericDialog';
import DashboardActions from '../Dashboard/DashboardActions';

const DetailItem = ({ children, lg, md, sm, xs, sx }) => (
  <Grid2 lg={lg} md={md} sm={sm} xs={xs} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...sx }}>
    <Typography fontSize={commonFontSize}>{children}</Typography>
  </Grid2>
);

const OrderProductDetails = ({ data }) => {
  const { currentDate } = useContext(DateContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);

  const {
    quotationId = '12345',
    poNumber = '12345',
    customerName = 'New Customer',
    products = [],
    status
  } = data;

  const futureDate = useMemo(() => {
    const future = addDaysToToday(15, new Date(currentDate));
    return future.toLocaleDateString();
  }, [currentDate]);

  const orderCategory = useMemo(() => ORDER_CATEGORY[status] || ORDER_CATEGORY[INACTIVE], [status]);
  const { name: categoryName, color: categoryColor } = orderCategory;

  const handleMailDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseInquiryDialog = () => {
    setShowInquiryDialog(false);
  };

  return (
    <Paper elevation={1} sx={{ paddingX: 0, margin: 1 }}>
      <Grid2 container spacing={1} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
        <DetailItem lg={1.5} md={1.5}>{quotationId}</DetailItem>
        <DetailItem lg={1.5} md={1.5}>{poNumber}</DetailItem>
        <DetailItem lg={2} md={2}>{customerName}</DetailItem>
        <Grid2 lg={3} md={3}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <DetailItem key={index}>{product.name}</DetailItem>
            ))
          ) : (
            <DetailItem>No products available</DetailItem>
          )}
        </Grid2>
        <Grid2 lg={1.5} md={1.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CalendarMonthRoundedIcon fontSize='small' className='text-secondary' sx={{ marginRight: 1 }} />
          <DetailItem>{futureDate}</DetailItem>
        </Grid2>
        <DetailItem lg={1.5} md={1.5} sx={{ color: categoryColor }}>{categoryName}</DetailItem>
        <Grid2 lg={1} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton aria-label="call" color="warning" onClick={handleMailDialogOpen}>
            <AddCommentRoundedIcon />
          </IconButton>
          <DashboardActions item={data} />
        </Grid2>
        <GenericDialog
          key={data.id}
          open={openDialog}
          setOpen={setOpenDialog}
          title="Follow Up Order"
          content={
            <FollowUpDialogContent
              item={data}
              onClose={() => setOpenDialog(false)}
            />
          }
        />
        <InquiryDialog item={data} dialog={showInquiryDialog} setDialog={handleCloseInquiryDialog} />
      </Grid2>
    </Paper>
  );
}

export default OrderProductDetails;
