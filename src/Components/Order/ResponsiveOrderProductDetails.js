import React, { useContext, useMemo, useState } from 'react';
import { IconButton, Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DateContext } from '../Contexts/DateContext';
import { commonFontSize, commonFontWeight, INACTIVE, ORDER_CATEGORY, PRIMARY_COLOR, regularFontSize } from '../../Helpers/ConstantProperties';
import { addDaysToToday } from '../../Helpers/helpers';
import FollowUpDialogContent from '../Dashboard/FollowUpDialogContent';
import InquiryDialog from '../Inquiry/InquiryDialog';
import GenericDialog from '../GenericComponents/Dialog/GenericDialog';
import DashboardActions from '../Dashboard/DashboardActions';

const LabelTypography = ({ label, value, color = 'inherit' }) => (
  <Typography fontSize={commonFontSize} fontWeight={commonFontWeight} sx={{ color }}>
    {label} {value}
  </Typography>
);

const ResponsiveOrderProductDetails = ({ data }) => {
  const { currentDate } = useContext(DateContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);

  const { quotationId = '12345', poNumber = '12345', customerName = 'New Customer', products = [], status } = data;

  const futureDate = useMemo(() => addDaysToToday(15, new Date(currentDate)).toLocaleDateString(), [currentDate]);
  const orderCategory = useMemo(() => ORDER_CATEGORY[status] || ORDER_CATEGORY[INACTIVE], [status]);
  const { name: categoryName, color: categoryColor } = orderCategory;

  const handleMailDialogOpen = () => setOpenDialog(true);
  const handleCloseInquiryDialog = () => setShowInquiryDialog(false);

  return (
    <Paper elevation={1} sx={{ padding: 2, margin: 2 }}>
      <Grid2 container spacing={1} sx={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>

        <Grid2 xs={12}>
          <Typography fontWeight={commonFontWeight} color={PRIMARY_COLOR} fontSize={regularFontSize}>
            {customerName}
          </Typography>
        </Grid2>

        {[
          { label: 'Quotation Id:', value: quotationId },
          { label: 'PO Number:', value: poNumber },
          { value: categoryName, color: categoryColor },
          { label: 'Expected Delivery:', value: futureDate },
        ].map((item, index) => (
          <Grid2 xs={12} sm={12} key={index} display={'flex'} gap={1}>
            <LabelTypography label={item.label} value={item.value} color={item.color} />
          </Grid2>
        ))}

        <Grid2 xs={8} sm={8}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="product-content" id="product-header">
              <Typography fontSize={commonFontSize}>Products</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <Typography key={index} fontSize={commonFontSize}>
                    {product.name}
                  </Typography>
                ))
              ) : (
                <Typography fontSize={commonFontSize}>No products available</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid2>

        <Grid2 xs={4} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
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
          content={<FollowUpDialogContent item={data} onClose={() => setOpenDialog(false)} />}
        />
        <InquiryDialog item={data} dialog={showInquiryDialog} setDialog={handleCloseInquiryDialog} />
      </Grid2>
    </Paper>
  );
};

export default ResponsiveOrderProductDetails;
