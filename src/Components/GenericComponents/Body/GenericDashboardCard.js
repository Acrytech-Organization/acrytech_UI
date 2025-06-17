import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import GenericDialog from '../Dialog/GenericDialog';
import FollowUpDialogContent from '../../Dashboard/FollowUpDialogContent';
import { commonFontSize } from '../../../Helpers/ConstantProperties';

const GenericDashboardCard = ({ data, columns, openDialog, setOpenDialog, children, DialogTitle }) => {
  return (
    <Paper elevation={1} sx={{ padding: 1, margin: 1 }}>
      <Grid container alignItems="center" textAlign="center">
        {columns.map((column, index) => {
          const { key, gridSizes, render } = column;

          return (
            <Grid
              key={index}
              item
              xs={gridSizes.xs}
              sm={gridSizes.sm}
              md={gridSizes.md}
              sx={column.sx || {}}
            >
              {render ? render(data) : <Typography fontSize={commonFontSize}>{data[key]}</Typography>}
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={1.5} display="flex" alignItems="center" justifyContent="center">
          <Typography component={'span'} fontSize={commonFontSize}>
            {children}
          </Typography>
        </Grid>
        <GenericDialog
          key={data.id}
          open={openDialog}
          setOpen={setOpenDialog}
          title={DialogTitle}
          content={<FollowUpDialogContent item={data} onClose={() => setOpenDialog(false)} />}
        />
      </Grid>
    </Paper>
  );
};

export default GenericDashboardCard;
