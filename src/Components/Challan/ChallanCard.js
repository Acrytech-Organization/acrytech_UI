import { Paper, Typography } from "@mui/material";
import CardActionButtons from "../GenericComponents/DataView/CardActionButtons";
import GenericSkeleton from "../GenericComponents/DataView/GenericSkeleton";
import { COLOR_TEAL, commonFontSize, commonFontWeight, CREATE_IN_CHALLAN, CREATE_OUT_CHALLAN, DISPLAY_CHALLAN, INWORD_CHALLAN, NOT_AVAILABLE, PRIMARY_COLOR, UPDATE_ON_VOUCHER } from "../../Helpers/ConstantProperties";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { GenericErrorComponent, GenericSuccessComponent } from "../GenericComponents/FormComponent/GenericAlertComponent";
import { serviceHelpers } from "../../Helpers/ServiceHelpers";
import { useNavigate } from "react-router-dom";
import ViewMenuItem from "../GenericComponents/DataView/ViewMenuItem";
import DeleteMenuItem from "../GenericComponents/DataView/DeleteMenuItem";
import AddTransport from "../Dashboard/DashboardMenuOptions/AddTransport";
import { checkValue, getLocalDateString, ShowNumber } from "../../Helpers/helpers";
import SaveChallan from "./SaveChallan";
import ReceiptIcon from '@mui/icons-material/Receipt';
import DashboardCardCommonPart from "../Dashboard/DashboardCardCommonPart";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function ChallanCard({ item }) {

    const successMessage = "Successfully Deleted!";

    const deleteChallan = async (khID) => {
        return await serviceHelpers.deleteChallans(khID, item.id);
    };

    const navigate = useNavigate();

    const onDelete = {
        ErrorComponent: ({ error }) => <GenericErrorComponent error={error} />,
        SuccessComponent: ({ data }) => <GenericSuccessComponent data={data} message={successMessage} />,
        navigateTo: item.type === INWORD_CHALLAN ? CREATE_IN_CHALLAN : CREATE_OUT_CHALLAN,
        queryFunction: deleteChallan,
        queryKeyValue: UPDATE_ON_VOUCHER,
    };

    const customerData = item.cData ? { ...item.cData, type: item.type } : item;

    if (item.showSkeleton) return <GenericSkeleton />;

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

                <Grid2 container direction={'row'} alignItems="center" spacing={2}>
                    <DashboardCardCommonPart item={customerData} />

                    <Grid2 xs={12} md={1}>
                        <Typography
                            noWrap
                            color={PRIMARY_COLOR}
                            fontSize={commonFontSize}
                            fontWeight={commonFontWeight}
                        >
                            {item.refranceId}
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

                    <Grid2 xs={12} md={2}>
                        <Typography
                            noWrap
                            fontSize={commonFontSize}
                        >
                            {"Invoice: " + checkValue(item.invoiceID)}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} md={2}>
                        <Typography
                            noWrap
                            fontSize={commonFontSize}
                        >
                            <LocalShippingIcon />{" "}
                            {checkValue(item.vehicalNo)}
                        </Typography>

                    </Grid2>

                    <Grid2 xs={12} md={2}>
                        <Typography
                            noWrap
                            fontSize={commonFontSize}
                        >
                            <ReceiptIcon /> {" "}
                            {
                                item.transportConst
                                    ? ShowNumber(item.transportConst, 2, true)
                                    : NOT_AVAILABLE
                            }
                        </Typography>

                    </Grid2>

                    <Grid2
                        xs={12}
                        md
                        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

                        <CardActionButtons menuList={[
                            <AddTransport item={item} />,
                            <ViewMenuItem
                                onView={() => { navigate(DISPLAY_CHALLAN, { state: item }) }} />,
                            <SaveChallan item={item} />,
                            <DeleteMenuItem onDelete={onDelete} />
                        ]} />
                    </Grid2>
                </Grid2>
            </Paper>
        </Grid2>
    );
}

export default ChallanCard;