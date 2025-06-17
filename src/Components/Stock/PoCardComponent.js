import { Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { COLOR_TEAL, commonFontSize, VIEW_PO, NOT_AVAILABLE } from '../../Helpers/ConstantProperties';
import { getLocalDateString, ShowNumber } from '../../Helpers/helpers';
import CardActionButtons from '../GenericComponents/DataView/CardActionButtons';
import { useNavigate } from 'react-router-dom';
import DashboardCardCommonPart from '../Dashboard/DashboardCardCommonPart';
import GenericSkeleton from '../GenericComponents/DataView/GenericSkeleton';
import ViewMenuItem from '../GenericComponents/DataView/ViewMenuItem';

const PoCardComponent = ({ item }) => {
    const navigate = useNavigate();

    if (item.showSkeleton) return <GenericSkeleton />;
    return (
        <Grid2  xs={12}>
            <Paper
                sx={{
                    borderLeft: `15px solid ${COLOR_TEAL}`,
                    padding: '0.3rem',
                    minWidth: 0,
                    px: 1
                }}
                elevation={2} >

                <Grid2 container alignItems="center" spacing={2}>
                    <DashboardCardCommonPart item={item} />

                    <Grid2 xs={12} md={1}>
                        <Typography
                            noWrap
                            fontSize={commonFontSize}
                        >
                            {getLocalDateString(item.date)}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} md={3}>
                      

                    </Grid2>

                    <Grid2 xs={12} md={1}>
                        <Typography
                            noWrap
                            textAlign={"right"}
                            paddingRight={2}
                            fontSize={commonFontSize}
                        >
                            {
                                item.roundedTotal
                                    ? ShowNumber(item.roundedTotal, 2, true)
                                    : NOT_AVAILABLE
                            }
                        </Typography>

                    </Grid2>

                    <Grid2
                        xs={12}
                        md
                        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

                        <CardActionButtons
                            menuList={[
                                <ViewMenuItem onView={() => {
                                    navigate(
                                        VIEW_PO,
                                        { state: { voucherID: item.id, inquiryObject: item } })
                                }} />,
                            ]} />
                    </Grid2>

                </Grid2>

            </Paper>

        </Grid2 >
    );
};

export default PoCardComponent;