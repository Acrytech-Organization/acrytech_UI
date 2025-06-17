import { Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { COLOR_RED, COLOR_TEAL, COLOR_YELLOW, commonFontSize, commonFontWeight, GENERATE_INVOICE, NOT_AVAILABLE, PRIMARY_COLOR, PROFORMA_INVOICE_ID, TAX_INVOICE } from '../../Helpers/ConstantProperties';
import { checkValue, getLocalDateString, ShowNumber } from '../../Helpers/helpers';
import CardActionButtons from '../GenericComponents/DataView/CardActionButtons';
import { useNavigate } from 'react-router-dom';
import DashboardCardCommonPart from '../Dashboard/DashboardCardCommonPart';
import GenericSkeleton from '../GenericComponents/DataView/GenericSkeleton';
import ViewMenuItem from '../GenericComponents/DataView/ViewMenuItem';
import AddTransport from '../Dashboard/DashboardMenuOptions/AddTransport';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SaveInvoice from './SaveInvoice';
import DeleteInvoiceMenu from './DeleteInvoiceMenu';

const InvoiceCard = ({ item }) => {
    const navigate = useNavigate();

    if (item.showSkeleton) return <GenericSkeleton />;

    if (item.id === PROFORMA_INVOICE_ID) {
        return (
            <Grid2 key={item.id} xs={12}>
                <Paper
                    sx={{
                        borderLeft: `15px solid ${COLOR_YELLOW}`,
                        padding: '0.3rem',
                        minWidth: 0,
                        px: 1
                    }}
                    elevation={2} >

                    <Grid2 container alignItems="center" spacing={2}>
                        <Grid2 xs={12} md={1}>
                            <Typography
                                noWrap
                                color={PRIMARY_COLOR}
                                fontSize={commonFontSize}
                                fontWeight={commonFontWeight}
                            >
                                {item.id}
                            </Typography>

                        </Grid2>

                        <Grid2 xs={12} md>
                        </Grid2>

                        <Grid2
                            xs={12}
                            md
                            sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

                            <CardActionButtons
                                menuList={[<ViewMenuItem onView={() => {
                                    navigate(
                                        GENERATE_INVOICE,
                                        { state: { voucherObject: item, inquiryObject: item.inquiry } })
                                }} />
                                ]} />
                        </Grid2>

                    </Grid2>
                </Paper>
            </Grid2>
        )
    }

    const roundedTotal = item.cData ? item.cData.roundedTotal : item.roundedTotal;
    const customerData = item.cData ? { ...item.cData, type: TAX_INVOICE } : item;

    if (item.deleted) {
        return (
            <Grid2 key={item.id} xs={12}>
                <Paper
                    sx={{
                        borderLeft: `15px solid ${COLOR_RED}`,
                        padding: '0.3rem',
                        minWidth: 0,
                        px: 1
                    }}
                    elevation={2} >

                    <Grid2 container alignItems="center" spacing={2}>
                        <DashboardCardCommonPart item={customerData} />

                        <Grid2 xs={12} md={1}>
                            <Typography
                                noWrap
                                color={PRIMARY_COLOR}
                                fontSize={commonFontSize}
                                fontWeight={commonFontWeight}
                            >
                                {item.refranceId || item.id}
                            </Typography>

                        </Grid2>

                        <Grid2 xs={12} md={1}>
                            <Typography
                                noWrap
                                fontSize={commonFontSize}
                            >
                                {getLocalDateString(item.date)}
                            </Typography>
                        </Grid2>

                        <Grid2 xs={12} md={1}>
                            <Typography
                                noWrap
                                color={"red"}
                                fontSize={commonFontSize}
                            >
                                DELETED
                            </Typography>

                        </Grid2>

                        <Grid2 xs={12} md={4}>
                            <Typography
                                noWrap
                                fontSize={commonFontSize}
                            >
                                Reason: {item.reason}
                            </Typography>

                        </Grid2>

                        <Grid2 xs={12} md={1.5}>
                            <Typography
                                noWrap
                                textAlign={"right"}
                                paddingRight={2}
                                fontSize={commonFontSize}
                            >
                                {
                                    roundedTotal
                                        ? ShowNumber(roundedTotal, 2, true)
                                        : NOT_AVAILABLE
                                }
                            </Typography>

                        </Grid2>

                        <Grid2
                            xs={12}
                            md
                            sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

                            <CardActionButtons
                                menuList={[<ViewMenuItem onView={() => {
                                    navigate(
                                        GENERATE_INVOICE,
                                        { state: { voucherObject: item, inquiryObject: item.inquiry } })
                                }} />
                                ]} />
                        </Grid2>

                    </Grid2>
                </Paper>
            </Grid2>
        )
    }

    return (
        <Grid2 key={item.id} xs={12}>
            <Paper
                sx={{
                    borderLeft: `15px solid ${COLOR_TEAL}`,
                    padding: '0.3rem',
                    minWidth: 0,
                    px: 1
                }}
                elevation={2} >

                <Grid2 container alignItems="center" spacing={2}>
                    <DashboardCardCommonPart item={customerData} />

                    <Grid2 xs={12} md={2}>
                        <Typography
                            noWrap
                            color={PRIMARY_COLOR}
                            fontSize={commonFontSize}
                            fontWeight={commonFontWeight}
                        >
                            {item.id}
                        </Typography>

                    </Grid2>

                    <Grid2 xs={12} md={1}>
                        <Typography
                            noWrap
                            fontSize={commonFontSize}
                        >
                            {getLocalDateString(item.date)}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} md={1.5}>
                        <Typography
                            noWrap
                            fontSize={commonFontSize}
                        >
                            <LocalShippingIcon />{" "}
                            {item.vehicalNo}
                        </Typography>

                    </Grid2>

                    <Grid2 xs={12} md={2}>
                        <Typography
                            noWrap
                            textAlign={"right"}
                            paddingRight={2}
                            fontSize={commonFontSize}
                        >
                            PO : {checkValue(item.cData?.poNumber)}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} md={1.5}>
                        <Typography
                            noWrap
                            textAlign={"right"}
                            paddingRight={2}
                            fontSize={commonFontSize}
                        >
                            {
                                roundedTotal
                                    ? ShowNumber(roundedTotal, 2, true)
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
                                <AddTransport item={item} />,
                                <SaveInvoice item={item} />,
                                <ViewMenuItem onView={() => {
                                    navigate(
                                        GENERATE_INVOICE,
                                        { state: { voucherID: item.id, inquiryObject: item.inquiry } })
                                }} />,
                                <DeleteInvoiceMenu item={item} />
                            ]} />
                    </Grid2>

                </Grid2>

            </Paper>

        </Grid2 >
    );
};

export default InvoiceCard;